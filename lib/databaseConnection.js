import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = {
    connection: null,
    promise: null,
  };
}

export const connectDatabase = async () => {
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "hattah",
      bufferCommands: false,
    });
  }
  cached.connection = await cached.promise;
  return cached.connection;
};
