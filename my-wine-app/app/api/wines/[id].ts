import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
    console.log("REQ.QUERY = ", req.query)
    const id = req.query.id as string;
    console.log("LOOK AT ME, LOOK AT ME: ", id);

    if (!id) {
      return NextResponse.json({
        message: "iD is required",
        status: 400,
      });
    }

    const idAsNumb = parseInt(id, 10);

    const user = await prisma.user.findUnique({
      where: {
        id: idAsNumb,
      },
      include: {
        wineLogs: {
          include: {
            wine: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "user not found",
        status: 404,
      });
    }

    const wines = user.wineLogs.map((wineLog) => wineLog.wine);

    return NextResponse.json({
      wines,
      status: 200,
      message: "Wines retrieved successfully",
    });
  } catch (e) {
    console.log("e: ", e);
    return NextResponse.json({
      error: e && "Internal server error",
      message: "Something went wrong",
      e,
    });
  }
};
