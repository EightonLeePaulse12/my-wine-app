import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, year, type, varietal, rating } = body;

    if (!name && !year && !type && !varietal && rating === undefined) {
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

// model Wine {
//     id       Int       @id @default(autoincrement())
//     name     String
//     year     Int
//     type     WineType
//     varietal Varietal
//     rating   Float?
//     consumed Boolean @default(false)
//     wineLogs WineLog[]
//   }
