import mongoose, { Schema, Document } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IOrder extends Document {
    Product?: string;
    amount?: number;
    productQuantity?: number;
    user: string;
    ProductId?: string;
    billingAddress: string;
    paymentIntentId?: string;
    paymentStatus: 'pending' | 'paid' | 'failed';
}

// Create a Schema corresponding to the document interface.
const orderSchema: Schema = new Schema({
    Product: {
        type: String
    },
    amount: {
        type: Number
    },
    productQuantity: {
        type: Number
    },
    user: {
        type: String,
        required: true
    },
    ProductId: {
        type: String
    },
    billingAddress: {
        type: String,
        required: true
    },
    paymentIntentId: {
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    }
});



export { orderSchema, IOrder };
