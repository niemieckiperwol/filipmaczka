import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Hanken_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Filip Maczka",
    template: "%s, Filip Maczka",
  },
  description: "Filip Maczka, photographer. Agency tests, private shoots, campaigns and lookbooks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={grotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
