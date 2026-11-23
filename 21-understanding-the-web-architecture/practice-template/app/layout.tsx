import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "../components/layout/Navbar";

export const metadata: Metadata = {
  title: "React & Next.js Mini-Practice",
  description: "Starter application for a beginner product catalog exercise",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        
        <Navbar />
        {children}
        </body>
    </html>
  );
}
