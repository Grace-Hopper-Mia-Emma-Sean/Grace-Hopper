import { getProducts } from "../../api";
import React, { useState, useEffect } from "react";

import {
  Grid,
  makeStyles,
  Paper,
  ButtonBase,
  Typography,
  EditIcon,
  Button,
  DeleteForeverIcon,
  Box,
  Stack,
} from "../../MUI";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { CreateCartItem } from "../../components";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: "#cfd8dc",

    // flexGrow: 1,
  },
  card: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem",
  },
  individualCard: {},
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "45%",
    maxHeight: "45%",
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Products({
  searchTerm,
  productCategory,
  selectProductCategory,
  setCart,
}) {
  const classes = useStyles();
  let newProducts = [];
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState([]);

  useEffect(async () => {
    await getProducts(localStorage.getItem("token"))
      .then(() => {
        console.log(localStorage.getItem("product"));
        setProducts(JSON.parse(localStorage.getItem("product")));
        setAdmin(JSON.parse(localStorage.getItem("admin")));
      })
      .catch((error) => console.log(error))
      .finally(localStorage.removeItem("product"));
  }, []);

  if (selectProductCategory)
    newProducts = products.filter((product) => {
      return product.category_id == productCategory;
    });

  const productMatches = (product, text) =>
    product.name.toLowerCase().includes(text.toLowerCase());

  const filteredProducts = products.filter((product) =>
    productMatches(product, searchTerm)
  );

  const productsToDisplay = searchTerm.length > 0 ? filteredProducts : products;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className={classes.body}>
        {!selectProductCategory ? (
          <div className={classes.card}>
            {productsToDisplay.map((product) => {
              return (
                <>
                  <Card sx={{ width: 425, m: 2, p: 1 }}>
                    <CardHeader title={product.name} subheader={product.sku} />
                    <CardMedia
                      component="img"
                      className={classes.img}
                      width="128px"
                      height="128px"
                      src={`https://graceshoppermess.s3.amazonaws.com/${product.id}.png`}
                      alt={product.name}
                      flex="1"
                    />
                    <CardActions disableSpacing>
                      <CreateCartItem product={product} setCart={setCart} />
                      <Typography variant="h6">${product.price}</Typography>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>{product.description}</Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </>
              );
            })}
          </div>
        ) : (
          <>
            {newProducts.map((product) => {
              return (
                <>
                  {/* <div className={classes.root} key={product.id}> */}
                  <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase className={classes.image}>
                          <img
                            className={classes.img}
                            // key={product.name}
                            // className={classes.img}
                            alt="complex"
                            src={`https://graceshoppermess.s3.amazonaws.com/${product.id}.png`}
                            // src={image}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {product.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              SKU: {product.sku}
                            </Typography>
                          </Grid>
                          <CreateCartItem product={product} setCart={setCart} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">
                            ${product.price}
                          </Typography>
                        </Grid>
                        {admin === true ? (
                          <Box>
                            <Grid item>
                              <Button>
                                <EditIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button>
                                <DeleteForeverIcon />
                              </Button>
                            </Grid>
                          </Box>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Paper>
                  {/* </div> */}
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
