import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// FETCH A SINGLE USER ROUTE

export const GET = async (req: NextRequest) => {
  try {
    /* GETTING LAST VALUES AFTER = SIGN IN URL */
    const link = req.url
    const iD = link.substring(link.lastIndexOf("=") + 1)
    // const iD = req.url.query?.id as string;

    const idAsNumb = parseInt(iD, 10);

    const user = await prisma.user.findUnique({
      where: {
        id: idAsNumb,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "user not found",
        status: 404,
      });
    }

    return NextResponse.json({
      user,
      status: 200,
      message: "User retrieved successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      error: e || "Internal server error",
      message: "Something went wrong",
    });
  }
};
