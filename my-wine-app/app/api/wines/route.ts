import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  const id = Number(req.url?.substring(req.url?.lastIndexOf("=") + 1)); 
  console.log(id)
  if (!id) {
    return NextResponse.json({
      status: 404,
      message: "User is required, check if user is logged in",
    });
  }

  try {
    const wines = await prisma.wineLog.findMany({
      where: { userId: id },
      include:{
        wine: true
      }
    });

    return NextResponse.json({
      status: 200,
      wine: wines,
      message:"Wine retrieved successfully"
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