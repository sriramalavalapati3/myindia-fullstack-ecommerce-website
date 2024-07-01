import mongoose, { Schema, Document } from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IProduct extends Document {
    product: string;
    productCategory?: string;
    productDescription?: string;
    productQuantity?: number;
    productPrize?: number;
    productSupplier?: string;
}

// Create a Schema corresponding to the document interface.
const productSchema: Schema = new Schema({
    product: {
        type: String,
        required: true
    },
    productCategory: {
        type: String
    },
    productDescription: {
        type: String
    },
    productQuantity: {
        type: Number
    },
    productPrize: {
        type: Number
    },
    productSupplier: {
        type: String
    }
});



export { productSchema, IProduct };
