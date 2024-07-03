import {
  ACTION_STATE,
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SIGNUP_PENDING,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  GET_ALL_PRODUCTS_PENDING,
  GET_ALL_PRODUCTS_FULFILLED,
  GET_ALL_PRODUCTS_REJECTED,
  ADD_CART_PRODUCTS_REJECTED,
  ADD_CART_PRODUCTS_FULFILLED,
  ADD_CART_PRODUCTS_PENDING,
  GET_ALL_CART_PRODUCTS_PENDING,
  GET_ALL_CART_PRODUCTS_FULFILLED,
  GET_ALL_CART_PRODUCTS_REJECTED,
} from './actionTypes';

const initialState = {
  dummyState: 'TESTING REDUX IN APP',
  activeUserDetails: {},
  allProductsData: [],
  isUserSignedIn:'',
  cartItems : [],
  isCartItemsFetching : false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_STATE: {
      const state = action.payload;
      alert(action.payload);
      return {
        ...state,
        dummyState: state ? 'SUCCESSFULL REDUX TESTING DONE' : 'CHANGED_AGAIN',
      }
    };
    case SIGNUP_PENDING:{
      return{
        ...state,
        isUserSignedIn : false
      }
    };
    case SIGNUP_FULFILLED:{
        return{
          ...state,
          isUserSignedIn : true
        }
       
    };
    case SIGNUP_REJECTED:{
        return{
          ...state,
          isUserSignedIn : false
        }
    }
    case LOGIN_PENDING:{
      return{
        ...state,
        isUserLogin:false
      }
    };
    case LOGIN_FULFILLED: {
      const data = action.payload.result.user;
      const token = action.payload.result.token;
      
      localStorage.setItem('token', token);
      return {
        ...state,
        isUserLogin:true,
        activeUserDetails: {
          ...data
        }
      }
    };
    case LOGIN_REJECTED: {
      return{
        ...state,
        isUserLogin:false
      }
    }

    case GET_ALL_PRODUCTS_PENDING:{
      return{
        ...state,
        isUserLogin:false
      }
    };
    case GET_ALL_PRODUCTS_FULFILLED: {
      const data = action.payload.data.productsData;
      
      return {
        ...state,
        isUserLogin:true,
        allProductsData: data,
      }
    };
    case GET_ALL_PRODUCTS_REJECTED: {
      return{
        ...state,
        isUserLogin:false
      }
    }
    case ADD_CART_PRODUCTS_PENDING:{
      return {
        ...state,
        isAddingToCart: true,
      };
    }
    
    case ADD_CART_PRODUCTS_FULFILLED:{
      // Show alert and redirect
      window.alert("Product added successfully");
      window.location.href = "/";

      return {
        ...state,
        isAddingToCart: false,
      };
    }
    
    case ADD_CART_PRODUCTS_REJECTED:{
      // Show alert on failure
      window.alert("Failed to add product to cart");

      return {
        ...state,
        isAddingToCart: false,
        error: action.error, // Assuming action.error contains the error information
      };
    }
    case GET_ALL_CART_PRODUCTS_PENDING: {
      return {
        ...state,
        isCartItemsFetching: false
      };
    };

    case GET_ALL_CART_PRODUCTS_FULFILLED: {
      const data = action.payload.cartItems || []
      return {
        ...state,
        isCartItemsFetching: true,
        cartItems: data ,
      };
    }
    case GET_ALL_CART_PRODUCTS_REJECTED: {
      window.alert("Failed to get cart items");
      window.location.href = "/";
      return {
        ...state,
        isCartItemsFetching: false
      };
    }
    default: return state;
  }
};

export default reducer;