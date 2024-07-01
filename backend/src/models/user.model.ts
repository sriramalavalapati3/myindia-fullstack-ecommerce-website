import mongoose, { Schema, Document } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    address?: string;
    userType?: string;
    mobile?: number;
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
    }
});


export { userSchema, IUser };
