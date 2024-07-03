import {
  ACTION_STATE,
  VALIDATE_TOKEN_PENDING,
  VALIDATE_TOKEN_FULFILLED,
  VALIDATE_TOKEN_REJECTED,
  SIGNUP_PENDING,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  GET_ALL_PRODUCTS_PENDING,
GET_ALL_PRODUCTS_FULFILLED,
GET_ALL_PRODUCTS_REJECTED,
ADD_CART_PRODUCTS_PENDING,
ADD_CART_PRODUCTS_FULFILLED,
ADD_CART_PRODUCTS_REJECTED,
GET_ALL_CART_PRODUCTS_PENDING,
GET_ALL_CART_PRODUCTS_FULFILLED,
GET_ALL_CART_PRODUCTS_REJECTED,
} from './actionTypes';

import { useNavigate } from 'react-router-dom';
import Axios from '../Views/Services/Services';
import { display } from '@mui/system';


export const submitUser = (name, email, password, navigate) =>{
  

  return (dispatch) => {
    dispatch({type: SIGNUP_PENDING })
    Axios.post('/register', {
      name,
      email,
      password,
    })
      .then((res) => {
        dispatch({type:SIGNUP_FULFILLED, payload:res}) 
        navigate('/signIn')
        // Make sure to return the relevant data from the Promise
      })
      .catch((error) => {
        dispatch({type:SIGNUP_REJECTED ,payload: error})
        console.error(error);
        throw error; // Throw the error so that redux-promise-middleware can handle it
      })
  };
};

export const loginUser = (email, password, navigate) => {
  const data = {
    email,
    password,
  }
  localStorage.clear();
  return (dispatch) => {
    dispatch({ type: LOGIN_PENDING });

    Axios.post('/login', data)
      .then((res) => {
        
        dispatch({ type: LOGIN_FULFILLED, payload: res.data });
        navigate('/Dashboard');
        dispatch(getAllProducts());
      })
      .catch((err) => {
        dispatch({ type: LOGIN_REJECTED, payload: err });
      });
  };
};

export const getAllProducts = () => {
  
  return (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_PENDING });

    Axios.get('/products')
      .then((res) => {
        dispatch({ type: GET_ALL_PRODUCTS_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ALL_PRODUCTS_REJECTED, payload: err });
      });
  };
};

export const addProductToCart = (id) =>{
  return(dispatch) =>{
    dispatch({type:ADD_CART_PRODUCTS_PENDING});
    const token = localStorage.getItem('token');
    Axios.post(`/addCart/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the request headers
      }
    }).then((res) =>{
       dispatch({type:ADD_CART_PRODUCTS_FULFILLED ,payload:res});
    }).catch((err)=>{
       dispatch({type:ADD_CART_PRODUCTS_REJECTED , payload:err});
    })
  }
}

export const getAllCartProducts = () => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_CART_PRODUCTS_PENDING });

    const token = localStorage.getItem('token');
    
    Axios.get('/getCartItems', {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the request headers
      }})
    .then((res) => {
      dispatch({ type: GET_ALL_CART_PRODUCTS_FULFILLED, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_ALL_CART_PRODUCTS_REJECTED, payload: err });
    });
  }
}