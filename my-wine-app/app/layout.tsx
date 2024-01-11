import type { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "My Wines App",
  description: "Managing wine with quality",
};

const Title = () => {
  const router = useRouter();
  const { pathname } = router;

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
    <html lang="en">
      <body className="yes">{children}</body>
    </html>
  );
}

export { Title };
