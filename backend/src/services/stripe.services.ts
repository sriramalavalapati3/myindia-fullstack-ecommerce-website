import { config } from "dotenv";
import Stripe from "stripe";
import mongoose from "mongoose";
config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

interface Product {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
}

interface CheckoutSessionParams {
  products: Product[];
  user: { _id: string };
  billingAddress: string;
}

const checkoutSession = async ({
  products,
  user,
  billingAddress,
}: CheckoutSessionParams): Promise<Stripe.Checkout.Session> => {
  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.productName,
        },
        unit_amount: product.unitPrice * 100, // Stripe requires amount in cents
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:5050/paymentSuccess`,
      cancel_url: `http://localhost:5050/paymentCancel`,
      metadata: {
        user: user._id,
        billingAddress: billingAddress,
        products: JSON.stringify(products.map(({ productId, quantity }) => ({ productId, quantity }))), // Store product IDs and quantities in metadata
      },
    });
    return session;
  } catch (error) {
    throw error;
  }
};

const manageStripeHook = async (rawBody: Buffer, sig: string, endpointSecret: string): Promise<Stripe.Event> => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      endpointSecret
    );

    return event;
  } catch (err) {
    throw err;
  }
};

export { checkoutSession, manageStripeHook, Product };
