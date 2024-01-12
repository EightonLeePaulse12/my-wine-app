import type { Metadata } from "next";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import useMetadata from 'next/head'

export const metadata: Metadata = {
  title: "My Wines App",
  description: "Managing wine with quality",
};

const Title = () => {
  const router = useRouter();
  const { pathname } = router;
  const metadata = useMetadata()

  const page = pathname.split("/").pop() || "";

  metadata.title = `${page} - My Wines App`;

  return null;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <body className="yes">{children}</body>
      <Footer />
    </>
  );
}

export { Title };
