"use client";
import useSidebar from "@/hooks/useSidebar";
import React, { createContext, useContext } from "react";

type SidebarContextType = {
  toggleSidebar: () => void;
  toggle: boolean;
};

const SidebarContext = createContext<SidebarContextType | null>(null);
const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toggleSidebar, toggle } = useSidebar();
  console.log("inside sidebar context", toggleSidebar, toggle);
  return (
    <SidebarContext.Provider value={{ toggleSidebar, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);

export default SidebarContextProvider;
