import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

// API ROUTE FOR LOGGING THE USER IN

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    if(!email || !password){
      return NextResponse.json({
        message:"Email and password are required",
        user: null
      },
      {
        status:400
      })
    }
    // CHECKING TO SEE IF THE USER IS IN THE DATABASE
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("existing user: ", existingUser);

    // Sending a 404 NOT FOUND if the user does not exist
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
          user: null,
        },
        {
          status: 404,
        }
      );
    }
    // Comparing the user's entered password with the encrypted one
    const validatePass = await compare(password, existingUser.password);
    // If passwords don't match, I send a 401
    if (!validatePass) {
      return NextResponse.json(
        {
          message: "Password is invalid",
          user: null,
        },
        {
          status: 401,
        }
      );
    }
    // Create a token to store inside the cookie on the frontend to check if the user is still logged in -- COOKIE EXPIRES IN 1H --
    const token = sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.SECRET_KEY || "Secret key timed out ig",
      {
        expiresIn: "1h",
      }
    );

    console.log(token);
    // Sending user's data for data management system as well as a message and of course, the token
    return NextResponse.json(
      {
        user: existingUser,
        message: "Logged in successfully",
        token,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Something went wrong",
    });
  }
};
