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

import { CreateCartItem } from "../../components";

const useStyles = makeStyles((theme) => ({

  // body : { 
  //   backgroundColor: "#457B9D"
  // },

  body: {
    backgroundColor: "#cfd8dc",
    // flexGrow: 7,
    // display: 'inline-block',
    // display: 'table',
    // top: '0',
    
    // height: '100%',
    // width: '100%',
    columns: '2 auto',
  },
  root: {
    // display:'inline-block',
    // paddingTop: '10%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'inline-block',
    width: '500px',
    // width: 'max-content',
    // height: 'relative',
    marginTop: '20px',
    marginLeft: '30%',
    marginBottom: '20px',
    // marginRight: '30%',
    backgroundColor: "#eeeeee",
    '&:hover':{
      background: "#90a4ae",
      position: "relative",
      top: "-10px",
      left: "-20px",
      width: "700px",
      height: "auto",
      display: "block",
    },

    
    // marginBottom: '20px',
    
  },
  image: {
    width: '128px',
    height: '128px',
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "128px",
    maxHeight: "128px",
  },

  // body: { 
  // backgroundColor: "#457B9D",
  // // columns: '2 auto',
  // width: '100%',
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   margin: "1rem",
  //   maxWidth: 500,
  //   backgroundColor: "#A8DADC",
  //   display:'inline-block', 
  // },
  // image: {
  //   width: 128,
  //   height: 128,
  // },
  // img: {
  //   margin: "auto",
  //   display: "block",
  //   maxWidth: "100%",
  //   maxHeight: "100%",
  // },
  // center: {
    
  //   // width: '100%',
  //   // justifyContent: 'center'
  // },
  // root: {
  //   // display: 'inline-block'
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  //   display: 'inline',
  //   columns: '2 auto'
    
  // }
}));

export function Products({
  searchTerm,
  productCategory,
  selectProductCategory,
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

  if (selectProductCategory) {
    newProducts = products.filter((product) => {
      return product.category_id == productCategory;
    });
  }

  const productMatches = (product, text) =>
    product.name.toLowerCase().includes(text.toLowerCase());

  const filteredProducts = products.filter((product) =>
    productMatches(product, searchTerm)
  );
  const productsToDisplay = searchTerm.length > 0 ? filteredProducts : products;

  const image = `http://placeimg.com/128/128/tech/1`;

  return (
    <>
    
      <div className={classes.body}>
          {!selectProductCategory ? (
            <>
              {productsToDisplay.map((product) => {
                return (
                  <>
                      <div className={classes.root} key={product.id}>
                        <Paper className={classes.paper}>
                          <Grid container spacing={2}>
                            <Grid item>
                              <Grid item>
                              <ButtonBase className={classes.image}>
                                  <img className={classes.img}
                                    // key={product.name}
                                    // className={classes.img}
                                    alt="complex"
                                    src={`https://graceshoppermess.s3.amazonaws.com/${product.id}.png`}
                                    // src={image}
                                  />
                                </ButtonBase>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm container>
                              <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Grid item xs>
                                  <Typography gutterBottom variant="subtitle1">
                                    {product.name}
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    {product.description}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    SKU: {product.sku}
                                  </Typography>
                                </Grid>
                                <CreateCartItem product={product} />
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
                      </div>
                      

                    </>
                  );
                })}

              </>
            ) : (
              <>
                {newProducts.map((product) => {
                  return (
                    <>

                      <div className={classes.root} key={product.id}>
                        <Paper className={classes.paper}>
                          <Grid container spacing={2}>
                            <Grid item>
                              <ButtonBase className={classes.image}>
                                <img
                                  // key={product.name}
                                  // className={classes.img}
                                  alt="complex"
                                  src={image}
                                />
                              </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                              <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Grid item xs>
                                  <Typography gutterBottom variant="subtitle1">
                                    {product.name}
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    {product.description}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    SKU: {product.sku}
                                  </Typography>
                                </Grid>
                                <CreateCartItem product={product} />
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
                      </div>
                    </>
                  );
                })}
              </>
            )}
          
        </div>
      
    </>
  );
}