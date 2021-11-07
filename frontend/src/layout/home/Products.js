import { getProducts, getCartItemsByUserId } from "../../api";
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
    backgroundColor: "#457B9D",

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
  return (
    <div>
      <Typography h6>
        More Info <IconButton {...other}></IconButton>
      </Typography>
    </div>
  );
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
  cart,
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

  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <>
      <div className={classes.body}>
        {!selectProductCategory ? (
          <div className={classes.card}>
            {productsToDisplay.map((product) => {
              return (
                <>
                  <Card sx={{ width: 425, m: 2, p: 1 }}>
                    <CardHeader
                      title={product.name}
                      subheader={product.price}
                    />
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
                        <Typography paragraph>
                          <Typography variant="h6">
                            SKU: {product.sku}
                          </Typography>
                          <Typography variant="h6">
                            "{product.description}"
                          </Typography>
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </>
              );
            })}
          </div>
        ) : (
          <>
            <div className={classes.card}>
              {newProducts.map((product) => {
                return (
                  <>
                    <Card sx={{ width: 450, m: 2, p: 1 }}>
                      <CardHeader
                        title={product.name}
                        subheader={product.price}
                      />
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
                        <CreateCartItem
                          product={product}
                          setCart={setCart}
                          cart={cart}
                        />
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
                          <Typography paragraph>
                            <Typography variant="h6">${product.sku}</Typography>
                            <Typography variant="h6">
                              {product.description}
                            </Typography>
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
