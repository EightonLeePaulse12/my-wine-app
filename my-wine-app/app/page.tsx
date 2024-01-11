import React from "react";
import prisma from "@/lib/prisma";

const page = async () => {
  const users = await prisma.wine.findMany();
  const userss = JSON.stringify(users)
  // useEffect(()=>{
  //   console.log(JSON.stringify(userss))
  // }, [])
  return (
    <>
      <h6 className=" font-bold text-red-500">{JSON.stringify(userss)}</h6>
    </>
  );
};

export default page;
