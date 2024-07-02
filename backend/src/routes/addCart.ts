import express,{Router} from 'express';
import {auth,authorize} from '../middleware/auth';
import {addUserCart, getCartItems} from '../controllers/controller'


const cartRoute :Router = express.Router();

cartRoute.post('/addCart/:id' , auth, authorize(['customer']) ,addUserCart  );
cartRoute.get('/getCartItems',auth,authorize(['customer']),getCartItems);

export{
    cartRoute
}