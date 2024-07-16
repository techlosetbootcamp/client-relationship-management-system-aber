import type { Metadata } from "next";
// import { Albert_Sans, Barlow } from "next/font/google";
import "./globals.css";
import MobileSidebar from "@/components/mobileSidebar/MobileSidebar";
import DesktopSidebar from "@/components/desktopSidebar/DesktopSidebar";
import img from "../assets/images/bg.png";
import Image from "next/image";
import DesktopFooter from "@/components/desktopFooter/DesktopFooter";
import { albertSans,barlow } from "@/assets/fonts/Fonts";

// const inter = Inter({ subsets: ["latin"] });
// const albertSans = Albert_Sans({
//   subsets: ["latin"],
//   variable :"--font-albert-sans",
//   weight: ["400", "500", "600", "700", "800"],
// });
// const barlow = Barlow({
//   subsets: ["latin"],
//   variable:"--font-barlow",
//   weight: ["400", "500", "600", "700", "800"],
// });

export const metadata: Metadata = {
  title: "Client Relationship Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{border: "5px solid orange"}}>
      <body
        className={`${albertSans.variable} ${barlow.variable} relative  h-auto  bg-[#F8F9FA] box-border`}
      >
        <div className="absolute bottom-2 w-full left-0">
          <Image src={img} alt="bg" className="w-[1218px] h-[1190px]" />
          {/* <Image src={img} alt="bg" className="w-[1218px] h-[1190px] " /> */}
        </div>

        <div className="flex sticky box-border flex-col gap-[60px] w-full">
          {/* <MobileSidebar/> */}
          {/* Make common card wrapper for all the components */}
          <div className=" gap-[29px] sm:pr-[45px] sm:pl-[43px]  md:px-[20px] lg:px-[39px] xl:px-[72px] flex">

          <DesktopSidebar />
          {children}
          </div>
          <div>
        <DesktopFooter />

          </div>
        </div>

      </body>
    </html>
  );
}
