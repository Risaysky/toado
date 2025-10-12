import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const roboto = Roboto({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray-900`}>
        <Header />
        <main className="text-gray-200">{children}</main>
      </body>
    </html>
  );
}
