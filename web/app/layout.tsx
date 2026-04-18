import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Archivo_Black, Kaushan_Script } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-athletic",
  display: "swap",
});

const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Outpouring Missions International — Transforming Lives. Igniting Futures.",
  description:
    "Faith-driven education, leadership development, and global missions. Empowering, equipping, and expanding the reach of leaders across nations since 2008.",
  metadataBase: new URL("https://outpouringmissions.org"),
  openGraph: {
    title: "Outpouring Missions International",
    description: "Transforming Lives. Igniting Futures.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${archivoBlack.variable} ${kaushan.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
