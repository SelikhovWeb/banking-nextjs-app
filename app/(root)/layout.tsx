import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //mock user
  const loggedIn = {
    firstName: "John",
    lastName: "Doe",
  };

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="flexx size-full flex-col">
        <div className="root-layout">
          <Image src={"/icons/logo.svg"} alt="logo" width={32} height={32} />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
