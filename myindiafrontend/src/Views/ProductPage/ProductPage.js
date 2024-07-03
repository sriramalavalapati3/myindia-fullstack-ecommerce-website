import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductPage.css';
import { Button } from '@mui/material';
import productsImage from '../../assets/productimg.avif';

const ProductPage = (props) => {
  const location = useLocation();
  const { addProductToCart } = props;
  const { productDetails } = location.state;
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      await addProductToCart(productDetails._id);
      navigate('/Dashboard');
    } catch (err) {
      console.error('Failed to add product to cart:', err);
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className='masterDetailsContainer'>
      <div className='imageSection'>
        <img src={productsImage} alt="" />
      </div>
      <div className='detailsSection'>
        <h1>{productDetails.product}</h1>
        <p>Category: {productDetails.productCategory}</p>
        <p>Description: {productDetails.productDescription}</p>
        <p>Quantity: {productDetails.productQuantity}</p>
        <p>Price: {productDetails.productPrize}</p>
        {/* <p>Supplier: {productDetails.productSupplier}</p> */}
        <Button variant='contained' onClick={handleAddToCart}>
          Add To Cart
        </Button>
      </div>
      <div>
        Other Products list
      </div>
    </div>
  );
};

export default ProductPage;
