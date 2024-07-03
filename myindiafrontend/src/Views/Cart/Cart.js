import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Card, CardContent, Typography, Button, Checkbox, FormControlLabel, Select, MenuItem, Box } from '@mui/material';
import CartItemCard from './CartItemCard';
import { useNavigate } from 'react-router-dom';
const Cart = (props) => {
  const [cartProducts,setcartProducts] = useState([]) 
  const {getAllCartProducts,cartItems} = props ;

  const [cartAmount, setCartAmount] = useState(0);
  const navigate = useNavigate();

 useEffect (() =>{
  const getData = async() =>{
    try {
      await getAllCartProducts();
    } catch (error) {
      alert('somee')
    }
  }

  getData();
 },[]);

 useEffect (() =>{
 setcartProducts(cartItems);
 },[cartItems])


  useEffect(() => {
    const total = cartProducts.reduce((sum, product) => sum + product.productPrize, 0);
    setCartAmount(total);
  }, [cartProducts]);

const handleCheckOut = () =>{
  alert('order placed successfully');
  navigate('/Dashboard');
}



  return (<>
    <div className='masterCartContainer'>
      <div style={{ width: "70%" }}>
        {cartProducts.map(product => {
          return <div style={{ padding: "5px 10px" }}>
            <CartItemCard productDetails={product} />
          </div>
        }
        )}
      </div>
      <div style={{ margin: "0 20px" }}>
        <Card sx={{ maxWidth: 345, margin: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              <Box component="span" sx={{ color: 'green' }}>✔️</Box> Your order is eligible for <Box component="span" sx={{ fontWeight: 'bold' }}>FREE Delivery</Box>.
              
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Subtotal ({cartProducts.length} items): <Box component="span" sx={{ fontWeight: 'bold' }}>₹{cartAmount}.00</Box>
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              label="This order contains a gift"
              sx={{ marginTop: 1 }}
            />
            <Button variant="contained" color="warning" fullWidth sx={{ marginTop: 2 }} onClick = {()=>{handleCheckOut()}}>
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </>)

}

export default Cart;