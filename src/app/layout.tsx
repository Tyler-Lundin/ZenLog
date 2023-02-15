"use client";
import "../styles/globals.css";
import { Roboto } from "@next/font/google";
import { ThemeProvider } from "../hooks/useTheme";

// font

const robotoFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
});


export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoFont.className}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
