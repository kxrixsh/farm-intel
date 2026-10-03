import type { Metadata } from "next";
import "./globals.css";
import FarmChatbot from "./components/FarmChatbot";

export const metadata: Metadata = {
  title: "FARM INTEL — Agricultural Decision Intelligence",
  description: "Know where to sell. Know what to grow. Know what you can claim.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050b08] text-[#f4f7f3] antialiased selection:bg-[#66ee7f]/20 selection:text-[#66ee7f]">
        {children}
        <FarmChatbot />
      </body>
    </html>
  );
}