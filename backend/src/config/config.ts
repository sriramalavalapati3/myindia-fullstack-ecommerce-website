import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoLink = process.env.mongoLink as string;

if (!mongoLink) {
    throw new Error('MONGO_URI environment variable not set');
}

const connection = mongoose.connect(mongoLink);

connection.then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.error(err);
});

export { connection };
