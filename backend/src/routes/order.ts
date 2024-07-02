import express, { Router, Request, Response } from 'express';
import { handleCheckout,  } from '../controllers/controller';
import { auth, authorize } from '../middleware/auth';

// Create an Express Router
const paymentRoute: Router = express.Router();

// Middleware to parse raw JSON body for Stripe webhook
paymentRoute.use(express.raw({ type: 'application/json' }));

// Define route handlers with type annotations
paymentRoute.post('/orderCheckout', auth, authorize(['seller', 'customer', 'admin']), handleCheckout);

//paymentRoute.post('/paymentStatus', handleStripeHooks);

export { paymentRoute };
