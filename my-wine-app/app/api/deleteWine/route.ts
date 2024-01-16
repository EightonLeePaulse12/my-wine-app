import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    console.log(id)

    if (!id) {
      return NextResponse.json({
        message: "Wine ID required",
        status: 404,
      });
    }

    const delWine = await prisma.wine.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!delWine) {
      return NextResponse.json({
        message: "Wine not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Successfully deleted the wine",
      status: 200,
      wine: delWine,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "An error occured",
      status: 500,
      error: e || "Internal server error",
    });
  }
};
