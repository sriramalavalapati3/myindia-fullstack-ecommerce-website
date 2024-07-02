import mongoose, { Schema, Document } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IOrder extends Document {
    products: Array<{
        productId: string;
        quantity: number;
    }>;
    amount?: number;
    user: string;
    billingAddress: string;
    paymentIntentId?: string;
    paymentStatus: 'pending' | 'paid' | 'failed';
}

// Create a Schema corresponding to the document interface.
const orderSchema: Schema = new Schema({
    products: [{
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true }
    }],
    amount: {
        type: Number,
    },
    user: {
        type: String,
        required: true,
    },
    billingAddress: {
        type: String,
        required: true,
    },
    paymentIntentId: {
        type: String,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
});

export { orderSchema, IOrder };
