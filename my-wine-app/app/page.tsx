import React from "react";
import prisma from "@/lib/prisma";

const page = async () => {
  const users = await prisma.user.findMany();
  const userss = JSON.stringify(users)
  // useEffect(()=>{
  //   console.log(JSON.stringify(userss))
  // }, [])
  return (
    <>
      <h1 className=" font-bold text-red-500">{JSON.stringify(userss)}</h1>
    </>
  );
};

export default page;
