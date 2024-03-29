import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE WINE ENTRIES

export const PATCH = async (req: Request) => {
  try {
    const { id, name, year, type, varietal, rating, consumed } =
      await req.json();

    if (!id) {
      return NextResponse.json({
        message: "Wine ID is required",
        status: 400,
      });
    }

    const updWine = await prisma.wine.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        name,
        year,
        type,
        varietal,
        rating,
        consumed,
      },
    });
    if (!updWine) { 
      return NextResponse.json({
        message: "Wine not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Successfully updated wine",
      status: 200,
      wine: updWine,
    });
  } catch (e) {
    return NextResponse.json({
      message: "An error occured",
      status: 500,
      error: e || "Internal server error",
    });
  }
};
