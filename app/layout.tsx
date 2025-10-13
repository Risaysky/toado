"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "./components/ReactQueryClientProvider";
import Header from "./components/Header";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${roboto.className} bg-gray-900`}>
          <Header />
          <main className="text-gray-200">{children}</main>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
