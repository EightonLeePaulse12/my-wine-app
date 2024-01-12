import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import * as z from "zod";

const validate = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
  })
  

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { username, email, password } = validate.parse(body);
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      return NextResponse.json(
        {
          message: "User with this email already exists",
          user: null,
        },
        { status: 409 }
      );
    }

    const existingName = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingName) {
      return NextResponse.json(
        {
          message: "User with this username already exists",
          user: null,
        },
        {
          status: 409,
        }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        user: newUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Something went wrong",
    });
  }
};
