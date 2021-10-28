import { getProducts } from "../../api"
import React, {useState, useEffect} from "react"

import {
    Grid, makeStyles, Paper, ButtonBase, Typography
} from "../MUI"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow:7,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    columns: {
        columns: '2 auto'
    }
}));

export function Products({searchTerm}){

    const classes = useStyles();
    const [products, setProducts] = useState([])

        useEffect(()=>{
            const fetchProducts = async () => {
                    const resp = await getProducts()
                    setProducts(resp.data)
                    console.log(products)
            }
            fetchProducts();
        }, [])

        function productMatches(product, text) {
            if (product.name.toLowerCase().includes(text.toLowerCase())) {
                return true
            }
        }

        const filteredProducts = products.filter(product => productMatches(product, searchTerm));
        const productsToDisplay = searchTerm.length > 0 ? filteredProducts : products;
        
    return (
        <>
            <span>The Products</span>
            <div className={classes.columns}>
                {productsToDisplay.map( product => {
                    return (<>
                        <div className={classes.root} key={product.id}>
                            <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                <ButtonBase className={classes.image} key={product.name}>
                                    {/* <img className={classes.img} alt="complex" src="https://material-ui.com/static/images/grid/complex.jpg" /> */}
                                </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
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
                                    <Grid item>
                                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                        Add to Cart!
                                    </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">${product.price}</Typography>
                                </Grid>
                                </Grid>
                            </Grid>
                            </Paper>
                        </div>
                    </>)
                })}
            </div>            
        </>
    )
}