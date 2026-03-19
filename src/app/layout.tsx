import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTopButton from "@/components/BackToTopButton";
import ScrollToTopOnLoad from "@/components/ScrollToTopOnLoad";

export const metadata: Metadata = {
  title: "Rizal in Dapitan (1997) - A Film Review",
  description: "A film review of the 1997 movie Rizal in Dapitan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ScrollToTopOnLoad />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}
