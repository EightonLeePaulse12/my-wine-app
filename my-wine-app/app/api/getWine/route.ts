import { Wine } from "./../../../interfaces/interfaces";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET A SINGLE WINE'S DATA

export const GET = async (req: NextRequest) => {
  const url = req.url as string;
  const id = Number(url.substring(url.lastIndexOf("=") + 1));
  if (!id) {
    return NextResponse.json({
      status: 404,
      message: "User is required, check if user is logged in",
    });
  }

  try {
    const wines = await prisma.wine.findUnique({
      where: { id: id },
    });

    return NextResponse.json({
      status: 200,
      wine: wines,
      message: "Wine retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
      error,
    });
  }
};
