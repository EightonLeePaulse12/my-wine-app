import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  console.log(req);
  try {
    const iD = req.query.id as string;

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
