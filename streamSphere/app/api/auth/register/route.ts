import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    console.log("Starting registration process...");
    const { email, password } = await request.json();

    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    console.log("Connecting to database...");
    try {
      await connectToDatabase();
      console.log("Database connected successfully");
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { error: "Database connection failed", details: dbError instanceof Error ? dbError.message : "Unknown error" },
        { status: 500 }
      );
    }

    // Check if user already exists
    console.log("Checking for existing user...");
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("User already exists");
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 400 }
        );
      }
    } catch (findError) {
      console.error("Error checking existing user:", findError);
      return NextResponse.json(
        { error: "Error checking existing user", details: findError instanceof Error ? findError.message : "Unknown error" },
        { status: 500 }
      );
    }

    console.log("Creating new user...");
    try {
      await User.create({
        email,
        password,
      });
      console.log("User created successfully");
    } catch (createError) {
      console.error("Error creating user:", createError);
      return NextResponse.json(
        { error: "Error creating user", details: createError instanceof Error ? createError.message : "Unknown error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        error: "Failed to register user",
        details: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
