/** @format */

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'MONGODB_URI not found. Ensure it is defined in the .env file'
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    } else if (!cached.promise) {
        const options = {
            bufferCommands: false,
        };
        cached.promise = mongoose
            .connect(MONGODB_URI, options)
            .then((mongoose) => {
                console.log('Connected to MongoDB');
                return mongoose;
            });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
};

export default dbConnect;
