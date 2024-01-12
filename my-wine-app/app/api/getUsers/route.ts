import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const allUsers = await prisma.user.findMany();
    return NextResponse.json({
      users: allUsers,
      status: 200,
      message: "All users retrieved successfully"
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message:"An error occured",
      status: 402,
      e
    })
  }
};
