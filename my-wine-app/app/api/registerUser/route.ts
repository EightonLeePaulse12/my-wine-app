import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

// PASSWORD HASHING AND CREATE QUERY TO REGISTER A USER INTO THE DATABASE, THIS PUSHES THEM TO THE LOGIN PAGE FOR THEM TO LOG IN AFTER REGISTRATION

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { username, email, password } = body;
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
