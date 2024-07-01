import mongoose, { Model } from 'mongoose';
import { userSchema, IUser } from './user.model';
import { productSchema, IProduct } from './product.model';
import { orderSchema, IOrder } from './order.model';
import { paymentSchema, IPayment } from './payment.model';

// Define types/interfaces for each model
interface IUserModel extends Model<IUser> {}
interface IProductModel extends Model<IProduct> {}
interface IOrderModel extends Model<IOrder> {}
interface IPaymentModel extends Model<IPayment> {}

// Create models based on schemas
const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);
const products: IProductModel = mongoose.model<IProduct, IProductModel>('Product', productSchema);
const orders: IOrderModel = mongoose.model<IOrder, IOrderModel>('Order', orderSchema);
const payment: IPaymentModel = mongoose.model<IPayment, IPaymentModel>('Payment', paymentSchema);

export { User, products, orders, payment };
