import React from 'react';
import './CartItemCard.css';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';

import productsImage from '../../../assets/productimg.avif'
const CartItemCard = (props) => {
  const { productDetails } = props;
  const {
    _id,
    product,
    productCategory,
    productDescription,
    productSupplier,
    productQuantity,
    productPrize,
  } = productDetails;
  return (<>
    <Card sx={{ display: 'flex', margin: 2, textAlign: "left" }}>
      <CardMedia
        component="img"
        sx={{ width: 151, margin: "10px 30px" }}
        image={productsImage}
        alt={product}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Typography component="div" variant="h5">
                {product}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Only {productQuantity} are left
              </Typography>

              <Typography variant="body2" color="text.secondary" component="div">
                Category: {productCategory}
              </Typography>

              <Typography variant="body2" color="text.secondary" component="div">
                About: {productDescription}
              </Typography>
            </div>
            <div>
              <Typography variant="h4" color="text.secondary" component="div">
                ₹{productPrize}.00
              </Typography>
            </div>
          </div>

        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
          <Button variant="outlined" size="small">Delete</Button>
        </Box>
      </Box>
    </Card>
  </>)

};

export default CartItemCard;