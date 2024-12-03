
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./components/Menu";
import { GoogleAnalytics, sendGAEvent } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Desert memories - Webgl Slider",
  description: "A webgl fun carousel with some effects and cool views changing. Made by Alexis Sejourne, pictures from Rémy Dumas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9M81SQQQHZ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9M81SQQQHZ');
            `,
          }}>
        </script>
      </head>
      <body>
        {children}
        <Menu />
        <GoogleAnalytics gaId="G-9M81SQQQHZ" />

      </body>
    </html>
  );
}
