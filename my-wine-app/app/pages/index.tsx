import React from "react";
import prisma from "@/lib/prisma";

interface PageProps {
  users: Object[]
}

const Page = ({ users }: PageProps) => {
  return (
    <>
      <h6 className="font-bold text-red-500">{JSON.stringify(users)}</h6>
    </>
  );
};

export async function getServerSideProps() {
  const users = await prisma.wine.findMany();
  return {
    props: {
      users,
    },
  };
}

export default Page;
