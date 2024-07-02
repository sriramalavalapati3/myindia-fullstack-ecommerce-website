import { Request } from 'express';
import { IUser,ICartItem } from '../models/user.model'; // Replace with your actual user model interface
import { IProduct } from '../models/product.model'; // Replace with your actual product model interface
import { IOrder } from '../models/order.model'; // Replace with your actual order model interface
import { IPayment } from '../models/payment.model'; // Replace with your actual payment model interface
import mongoose from 'mongoose';
const { User, products, orders, payment } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

interface UserRegisterRequest extends Request {
  body: {
    name: string;
    mobile: number;
    email: string;
    password: string;
    address?: string;
    userType?: string;
  };
}

const userRegister = async (req: UserRegisterRequest): Promise<IUser> => {
  try {
    const { name, mobile, email, password, address, userType } = req.body;
    const userdata = new User({
      name,
      mobile,
      email,
      password,
      address,
      userType,
    });
    await userdata.save();
    return userdata;
  } catch (error) {
    throw error;
  }
};

interface UserLoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface UserLoginResponse {
  status: boolean;
  user?: IUser;
  token?: string;
  msg?: string;
}

const userLogin = async (req: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = await jwt.sign(
          { _id: user._id, userType: user.userType },
          process.env.secretTokenKey as string,
          { expiresIn: "1h" }
        );
        return { status: true, user, token };
      } else {
        return { status: false, msg: "please enter valid credentials" };
      }
    } else {
      return { status: false, msg: "please register" };
    }
  } catch (error) {
    throw error;
  }
};

interface HandleUploadRequest extends Request {
  body: {
    product: string;
    productCategory?: string;
    productDescription?: string;
    productQuantity?: number;
    productPrize?: number;
    productSupplier?: string;
  };
}

const handleUpload = async (req: HandleUploadRequest): Promise<IProduct> => {
  try {
    const {
      product,
      productCategory,
      productDescription,
      productQuantity,
      productPrize,
      productSupplier,
    } = req.body;
    const productData = new products({
      product,
      productCategory,
      productDescription,
      productQuantity,
      productPrize,
      productSupplier,
    });

    await productData.save();
    return productData;
  } catch (error) {
    throw error;
  }
};

const handleGetAllProducts = async (
  pageOffset: number,
  pageSize: number
): Promise<{ productsData: IProduct[]; pageOffset: number }> => {
  try {
    const skip = pageOffset * pageSize;

    const productsData = await products
      .find()
      .skip(skip)
      .limit(pageSize)
      .exec();

    return { productsData, pageOffset };
  } catch (error) {
    throw error;
  }
};

const getProductById = async (user: string): Promise<IProduct[]> => {
  try {
    const product = await products.find({ _id: user });
    return product;
  } catch (error) {
    throw error;
  }
};

interface GetProductsByFilterRequest extends Request {
  query: {
    sortBy?: string;
    category?: string;
  };
}

const getProductsByFilter = async (
  req: GetProductsByFilterRequest,
  pageOffset: number,
  pageSize: number
): Promise<{ FilteredProduct: IProduct[]; pageOffset: number }> => {
  try {
    const { sortBy, category } = req.query;
    let sortOption = {};
    if (sortBy === "lowToHigh") {
      sortOption = { productPrize: 1 }; // Sort by price ascending
    } else if (sortBy === "highToLow") {
      sortOption = { productPrize: -1 }; // Sort by price descending
    } else {
      sortOption = { createdAt: -1 }; // Default sorting if sortBy param is missing
    }

    const filter: any = {};
    if (category) {
      filter.productCategory = category; // Filter by category if provided
    }

    const FilteredProduct = await products
      .find(filter)
      .sort(sortOption)
      .skip(pageOffset * pageSize)
      .limit(pageSize)
      .exec();

    return { FilteredProduct, pageOffset };
  } catch (error) {
    throw error;
  }
};

const savePaymentDetails = async ({
  orderId,
  paymentIntentId,
  paymentStatus,
  amount,
  currency,
}: {
  orderId: string;
  paymentIntentId: string;
  paymentStatus: string;
  amount: number;
  currency: string;
}): Promise<IPayment> => {
  try {
    const newPayment = new payment({
      orderId,
      paymentIntentId,
      paymentStatus,
      amount,
      currency,
    });

    await newPayment.save();
    return newPayment;
  } catch (error) {
    throw error;
  }
};

const saveOrderDetails = async ({
  product,
  amount,
  user,
  productId,
  billingAddress,
  productQuantity,
  paymentIntentId,
}: {
  product: string;
  amount: number;
  user: string;
  productId: string;
  billingAddress: string;
  productQuantity: number;
  paymentIntentId: string;
}): Promise<IOrder> => {
  try {
    const orderDetails = new orders({
      product,
      amount,
      user,
      productId,
      billingAddress,
      productQuantity,
      paymentIntentId,
    });

    await orderDetails.save();

    return orderDetails;
  } catch (error) {
    throw error;
  }
};

const updatePaymentStatus = async (
  paymentIntentId: string
): Promise<IPayment | null> => {
  try {
    const updatedPayment = await payment.findOneAndUpdate(
      { paymentIntentId },
      { paymentStatus: 'succeeded' },
      { new: true }
    );
    return updatedPayment;
  } catch (error) {
    throw error;
  }
};

const updateOrderStatus = async (
  paymentIntentId: string
): Promise<IOrder | null> => {
  try {
    const updatedOrder = await orders.findOneAndUpdate(
      { paymentIntentId },
      { paymentStatus: 'succeeded' },
      { new: true }
    );
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

const handleItemsToCart = async(userId: string, productId: string, quantity: number) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
      const user = await User.findById(userId).session(session);
      const product = await products.findById(productId).session(session);

      if (!user || !product) {
          throw new Error('User or product not found');
      }

      const cartItem = user.cart?.find( (item:ICartItem) => item.productId.equals(product._id));

      if (cartItem) {
        
          cartItem.quantity += quantity;
      } else {
  
          user.cart?.push({ productId: product._id, quantity });
      }

      
      await user.save({ session });

    
      await session.commitTransaction();
      session.endSession();

      return { success: true, message: 'Item added to cart successfully' };
  } catch (error) {
    
      await session.abortTransaction();
      session.endSession();

      return { success: false, message: (error as any).message };
  }
}

const handleGetCartItems = async (userId: string) => {
  try {
    // Find the user by their ID and populate the cart items with product details
    const user = await User.findById(userId).populate('cart.productId').exec();

    if (!user) {
      throw new Error('User not found');
    }

    // Extract the cart items from the user document
    const cartItems = user.cart?.map( (item:ICartItem) => ({
      product: item.productId,
      quantity: item.quantity
    }));

    return cartItems;
  } catch (error) {
    throw new Error(`Error fetching cart items: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
  }
}



export {
  userRegister,
  userLogin,
  handleUpload,
  handleGetAllProducts,
  getProductById,
  getProductsByFilter,
  savePaymentDetails,
  saveOrderDetails,
  updatePaymentStatus,
  updateOrderStatus,
  handleItemsToCart,
  handleGetCartItems
};
