import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { JSONResponse, ErrorResponse } from '../views/views';
import {
  userRegister,
  userLogin,
  handleUpload,
  handleGetAllProducts,
  getProductsByFilter,
  getProductById,
  savePaymentDetails,
  saveOrderDetails,
  updatePaymentStatus,
  handleItemsToCart,
  handleGetCartItems
} from '../transactions/trasactions';
import {Product} from '../services/stripe.services'
import { checkoutSession, manageStripeHook } from '../services/stripe.services';

const handleRegister = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 4);
    req.body.password = hash;
    await userRegister(req);
    JSONResponse(res, 201, { msg: "user registered successfully" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: (error as any).message || '' });
  }
};

const handleLogin = async (req: Request, res: Response) => {
  try {
    const result = await userLogin(req);
    if (result.status) {
      JSONResponse(res, 200, { result, msg: "user login successful" });
    } else {
      ErrorResponse(res, 400, { msg: result.msg || ''});
    }
  } catch (error) {
    ErrorResponse(res, 500, { msg: "something went wrong" || '' });
  }
};

const handleProductUpload = async (req: Request, res: Response) => {
  try {
    const data = await handleUpload(req);
    JSONResponse(res, 201, { data, msg: "product uploaded successfully" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: "something went wrong" || ''});
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const pageOffset = parseInt(req.query.pageOffset as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const data = await handleGetAllProducts(pageOffset, pageSize);
    JSONResponse(res, 200, { data, msg: "fetched Successfully" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: (error as any).message || ''});
  }
};

const handleProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await getProductById(id);
    JSONResponse(res, 200, { data, msg: "product fetched successfully" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: (error as any).message || '' });
  }
};

const getProductsUsingFilter = async (req: Request, res: Response) => {
  try {
    const pageOffset = parseInt(req.query.pageOffset as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const data = await getProductsByFilter(req, pageOffset, pageSize);
    JSONResponse(res, 200, { data, msg: "fetched successfully" });
  } catch (error) {
    ErrorResponse(res, 500, { msg: (error as any).message || '' });
  }
};
interface CheckoutRequest extends Request {
  body: {
    products: Array<{
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
    }>;
    user: any; // Adjust the type based on your user schema
    billingAddress: string;
  };
}

const handleCheckout = async (req: CheckoutRequest, res: Response) => {
  const { products, user, billingAddress } = req.body;
  console.log(products, user, billingAddress,'123456');
  try {
    // Calculate the total amount for all products
    const totalAmount = products.reduce((total, product) => total + product.unitPrice * product.quantity, 0);

    // Create a payment session with Stripe
    const paymentSession = await checkoutSession({
      products,
      user,
      billingAddress,
    });

    // Save order details to MongoDB
    const orderDetails = await saveOrderDetails({
      products,
      amount: totalAmount,
      user,
      billingAddress,
      paymentIntentId: paymentSession.id,
    });

    if (!orderDetails._id) {
      throw new Error("Failed to create order details");
    }

    // Save payment details to MongoDB
    const paymentDetails = await savePaymentDetails({
      orderId: orderDetails._id.toString(),
      paymentIntentId: paymentSession.id,
      paymentStatus: 'pending', // Assuming initial status is 'pending'
      amount: totalAmount,
      currency: paymentSession.currency || 'usd',
    });

    // Send JSON response with session ID and URL
    JSONResponse(res, 201, {
      sessionId: paymentSession.id,
      url: paymentSession.url,
    });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    ErrorResponse(res, 500, { msg: `Error creating checkout session: ${errorMessage}` });
  }
};



// const handleStripeHooks = async (req: Request, res: Response) => {
//   try {
//     const sig = req.headers['stripe-signature'] as string;
//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
//     const event = await manageStripeHook(req.body, sig, endpointSecret);

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       const paymentIntentId = session.id;
//       await updatePaymentStatus(paymentIntentId);
//       // Assuming updateOrderStatus exists somewhere
//       // const updateOrder = await updateOrderStatus(paymentIntentId);
//     }

//     JSONResponse(res, 201, { msg: 'payment updated successfully' });
//   } catch (error) {
//     ErrorResponse(res, 500, { msg: (error as any).message });
//   }
// };

const addUserCart = async (req: Request, res: Response) => {
  try {
      const userId = req.body.user._id;
      const productId = req.params.id;
      const quantity = req.body.quantity;

      const result = await handleItemsToCart(userId, productId, quantity);

      if (result.success) {
          JSONResponse(res, 201, { msg: 'Product added to cart successfully' });
      } else {
          ErrorResponse(res, 400, { msg: result.message });
      }
  } catch (error) {
      ErrorResponse(res, 500, { msg: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
}

const getCartItems = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user._id;
    const cartItems = await handleGetCartItems(userId);
    JSONResponse(res, 200, { cartItems, msg: 'Cart items fetched successfully' });
  } catch (error) {
    ErrorResponse(res, 500, { msg: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
}
export {
  handleRegister,
  handleLogin,
  handleProductUpload,
  getAllProducts,
  handleProductById,
  getProductsUsingFilter,
  addUserCart,
  getCartItems,
  handleCheckout,
  //handleStripeHooks,
};
