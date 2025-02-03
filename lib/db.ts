import mongoose from "mongoose";

const dbString = process.env.MONGODB_STRING!;

if(!dbString){
    throw new Error("Please provide MongoDB string in env file.");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export async function connectToDataBase(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        };
        cached.promise = mongoose
        .connect(dbString, opts)
        .then(()=>mongoose.connection)
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error
    }

    return cached.conn;
}
