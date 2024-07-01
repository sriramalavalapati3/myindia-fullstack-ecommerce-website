import mongoose, { Schema, Document } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IPayment extends Document {
    orderId: mongoose.Types.ObjectId;
    paymentIntentId: string;
    paymentStatus: 'succeeded' | 'pending' | 'failed';
    amount: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}

// Create a Schema corresponding to the document interface.
const paymentSchema: Schema = new Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    paymentIntentId: {
        type: String,
        required: true,
        unique: true
    },
    paymentStatus: {
        type: String,
        enum: ['succeeded', 'pending', 'failed'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
}, { timestamps: true });




export { paymentSchema, IPayment };
