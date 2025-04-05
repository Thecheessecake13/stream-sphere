import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/reelspro";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("Using cached database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log("Connecting to local MongoDB...");
    console.log("MongoDB URI:", MONGODB_URI);

    try {
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((mongoose) => {
          console.log("Successfully connected to MongoDB.");
          return mongoose.connection;
        });
    } catch (error) {
      console.error("Initial connection error:", error);
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connection state:", cached.conn.readyState);
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error("Failed to establish database connection:", e);
    throw e;
  }
}
