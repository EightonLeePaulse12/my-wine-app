import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "My Wines App",
  description: "Managing wine with quality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <body className="yes">
        <Navbar />
        {children}
      </body>
      <Footer />
    </div>
  );
}
