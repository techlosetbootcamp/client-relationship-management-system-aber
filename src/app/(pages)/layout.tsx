// "use client"
import { albertSans, barlow } from "@/assets/fonts/Fonts";
import "../globals.css";
import DesktopSidebar from "@/components/desktopSidebar/DesktopSidebar";
import DesktopFooter from "@/components/desktopFooter/DesktopFooter";
import Image from "next/image";
import img from "@/assets/images/bg.png";
import CalendarContextProvider from "@/providers/calendarContextProvider/CalendarContextProvider";



// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // // style={{border: "5px solid orange"}}
    // <html lang="en">
    //   <body className={`${albertSans.variable} ${barlow.variable}`}>
        <div className="relative bg-[#F8F9FA] h-auto box-border">
          <div className="absolute bottom-2 w-full left-0">
            <Image
              src={img}
              alt="bg"
              className="w-[1218px] h-[1190px]"
              priority
            />
          </div>
          <div className="flex sticky box-border flex-col gap-[60px] w-full">
            <div className="border-2 border-secondaryGreen gap-[29px]  sm:px-[43px]  md:px-[20px] lg:px-[39px] xl:px-[72px] flex">
              <DesktopSidebar />
              <CalendarContextProvider>{children}</CalendarContextProvider>
            </div>

            <div>
              <DesktopFooter />
            </div>
          </div>
        </div>
    //   </body>
    // </html>
  );
}