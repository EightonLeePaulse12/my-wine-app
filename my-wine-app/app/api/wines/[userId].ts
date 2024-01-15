import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const userId = parseInt(req.query.userId as string, 10);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.wineLogs) {
      return res.status(200).json([]);
    }

    const wines = user.wineLogs.map((log) => log.wine);

    return res.status(200).json(wines);
  } catch (e) {
    console.error("Error fetching wines:", e);
    return res.status(500).json({ error: "Internal Server Error", details: e });
  }
}
