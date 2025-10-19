import BottomBar from "../components/BottomBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children} <BottomBar />
    </>
  );
}
