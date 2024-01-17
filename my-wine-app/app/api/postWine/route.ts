import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// CREATE NEW WINE, THIS WILL UPDATE AND HAVE A CONNECTION TO THE USER'S FOREIGN KEY

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    let { id, name, year, type, varietal, rating } = body;
    year = Number(year)
    rating = parseFloat(rating)
    if (!id && !name && !year && !type && !varietal && rating === null) {
      return NextResponse.json({
        message: "Not all entries were retrieved",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    const createdWine = await prisma.wine.create({
      data: {
        name,
        year,
        type,
        varietal,
        rating,
        wineLogs: {
          create: {
            user: Number(id),
            consumed: false,
            user: { connect: { id: user.id } },
          },
        },
      },
    });

    return NextResponse.json({
      message: "Successfully added the wine to the database",
      status: 201,
      wine: createdWine,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "An erorr occured",
      status: 500,
      error: e || "Internal server error",
    });
  }
};
