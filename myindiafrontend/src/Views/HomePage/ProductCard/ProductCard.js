import React from 'react';
import './ProductCard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ProductPage from '../../ProductPage';
import { useNavigate } from 'react-router-dom';
import productsImage from '../../../assets/productimg.avif'
const ProductCard = (props) => {
  const { productDetails } = props;
  console.log(productDetails,'1234');
  const {
    _id,
    product,
    productCategory,
    productDescription,
    productQuantity,
    productPrize,
    productSupplier,
    productImg
  } = productDetails;
  const navigate = useNavigate();
  return (<>
    <div style={{ margin: "20px 0px" }}>
      <Card sx={{ width: 345 }} onClick={() => navigate(`/product/${_id}`, { state: { productDetails } })}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={productsImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom sx={{ textAlign: 'left' }} variant="h5" component="div">
              {product}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'left' }} color="text.secondary">
              Price: {productPrize}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'left' }} color="text.secondary">
              Only {productQuantity} left
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'left' }} color="text.secondary">
              Category: {productCategory}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'left' }} color="text.secondary">
              {productDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  </>);
};

export default ProductCard;