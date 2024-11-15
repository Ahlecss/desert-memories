
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Desert memories - Webgl Slider",
  description: "A webgl fun carousel with some effects and cool views changing. Made by Alexis Sejourne, pictures from Rémy Dumas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Menu />
      </body>
    </html>
  );
}
