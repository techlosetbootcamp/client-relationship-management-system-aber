// "use client"
import { albertSans, barlow } from "@/assets/fonts/Fonts";
import "../globals.css";
import DesktopSidebar from "@/components/desktopSidebar/DesktopSidebar";
import DesktopFooter from "@/components/desktopFooter/DesktopFooter";
import Image from "next/image";
import img from "@/assets/images/bg.png";
import CalendarContextProvider from "@/providers/calendarContextProvider/CalendarContextProvider";
import { Suspense } from "react";
import Loader from "@/components/loader/Loader";
import MobileSidebar from "@/components/mobileSidebar/MobileSidebar";
import TopBar from "@/components/topBar/TopBar";
import SidebarContextProvider from "@/providers/sidebarContextProvider/SidebarContextProvider";
import MobileFooter from "@/components/mobileFooter/MobileFooter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-[#F8F9FA] h-auto box-border">
      <div className="absolute bottom-2 w-full left-0">
        <Image src={img} alt="bg" className="w-[1218px] h-[1190px]" priority />
      </div>
      <div className="flex sticky box-border flex-col  w-full">
        <SidebarContextProvider>
          <TopBar />
          <MobileSidebar />
        </SidebarContextProvider>
        <div
          className={
            "gap-[29px]  sm:px-[43px]  md:px-[20px] lg:px-[39px] xl:px-[72px] flex lg:flex-row xs:flex-col"
          }
        >
          <DesktopSidebar />
          <CalendarContextProvider>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </CalendarContextProvider>
        </div>

        <div>
          <DesktopFooter />
          <MobileFooter />
        </div>
      </div>
    </div>
  );
}
