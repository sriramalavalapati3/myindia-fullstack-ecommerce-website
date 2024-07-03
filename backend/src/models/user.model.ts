import mongoose, { Schema, Document } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface ICartItem {
    productId:  mongoose.Types.ObjectId;
}
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    address?: string;
    userType?: string;
    mobile?: number;
    cart?: ICartItem[];
}

// Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    userType: {
        type: String
    },
    mobile: {
        type: Number
    },
    cart: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product', // Assuming you have a Product model
                    required: true
                },
            }
          ]
    
});


export { userSchema, IUser ,ICartItem};
