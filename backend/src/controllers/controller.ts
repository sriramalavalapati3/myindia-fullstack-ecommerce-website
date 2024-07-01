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
} from '../transactions/trasactions';
//import { checkoutSession, manageStripeHook } from '../transactions/stripeServices';

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

// const handleCheckout = async (req: Request, res: Response) => {
//   const { product, amount, user, productId, billingAddress, productQuantity } = req.body;

//   try {
//     const paymentSession = await checkoutSession({
//       product,
//       amount,
//       user,
//       productId,
//       billingAddress,
//       productQuantity,
//     });

//     // Save order details to MongoDB
//     const orderdetails = await saveOrderDetails({
//       product,
//       amount,
//       user,
//       productId,
//       billingAddress,
//       productQuantity,
//       paymentIntentId: paymentSession.id,
//     });

//     const paymentdetails = await savePaymentDetails({
//       orderId: orderdetails._id,
//       paymentIntentId: paymentSession.id,
//       paymentStatus: orderdetails.paymentStatus,
//       amount,
//       currency: paymentSession.currency,
//     });

//     JSONResponse(res, 201, {
//       sessionId: paymentSession.id,
//       url: paymentSession.url,
//     });
//   } catch (err) {
//     console.error("Error creating checkout session:", err);
//     ErrorResponse(res, 500, { msg: `Error creating checkout session ${err}` });
//   }
// };

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

export {
  handleRegister,
  handleLogin,
  handleProductUpload,
  getAllProducts,
  handleProductById,
  getProductsUsingFilter,
//   handleCheckout,
//   handleStripeHooks,
};