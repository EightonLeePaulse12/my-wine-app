import { Wine } from "./../../../interfaces/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  const url = req.url as string;
  const id = Number(url.substring(url.lastIndexOf("=") + 1));
    console.log(id)
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
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
      error,
    });
  }
};
