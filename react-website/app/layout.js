import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { metadata } from "./metadata";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-white text-[#0D0D0D]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
