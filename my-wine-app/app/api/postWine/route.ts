import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// CREATE NEW WINE, THIS WILL UPDATE AND HAVE A CONNECTION TO THE USER'S FOREIGN KEY

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { id, name, year, type, varietal, rating } = body;

    if (!id && !name && !year && !type && !varietal && rating === null) {
      return NextResponse.json({
        message: "Not all entries were retrieved",
        status: 400,
      });
    }

    const createdWine = await prisma.wine.create({
      data: {
        name,
        year,
        type,
        varietal,
        rating,
        wineLogs:{
          create:{
            userId: parseInt(id, 10),
            consumed: false
          }
        }
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

