import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import * as z from "zod";
import { sign } from "jsonwebtoken";

const validate = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password } = validate.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("existing user: ", existingUser)

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

    const validatePass = await compare(password, existingUser.password);

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

    const token = sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.SECRET_KEY || "Secret key timed out ig",
      {
        expiresIn: "1h",
      }
    );

    console.log(token)
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
