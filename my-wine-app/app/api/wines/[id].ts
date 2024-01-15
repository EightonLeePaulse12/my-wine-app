import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
    console.log("REQ.QUERY = ", req.query)
    const { id } = req.query;
    console.log("LOOK AT ME, LOOK AT ME: ", id);

    if (!id) {
      return NextResponse.json({
        message: "iD is required",
        status: 400,
      });
    }

    const idAsNumb = parseInt(id as string, 10);
    console.log(typeof idAsNumb)
    if(isNaN(idAsNumb)){
      return NextResponse.json({
        message:"Invalid ID",
        status:400
      })
    }

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

    console.log("Prisma query result: ", user)

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
    console.log(req)
    return NextResponse.json({
      error: e && "Internal server error",
      message: "Something went wrong",
      e,
    });
  }
};
