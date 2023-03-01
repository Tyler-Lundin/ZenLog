import "../styles/globals.css";
import { Roboto } from "@next/font/google";
import { ThemeProvider } from "../hooks/useTheme";

// font

const robotoFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: {
    default: "Zen Log",
    template: "%s | Zen Log",
  },
  description:
    "Zen Log is a minimalist journaling app that helps you focus on what matters.",
};

export default function RootLayout({
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
