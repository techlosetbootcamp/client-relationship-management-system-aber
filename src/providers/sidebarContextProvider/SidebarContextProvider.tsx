"use client";
import useSidebar from "@/hooks/useSidebar";
import { SidebarContextType } from "@/types/Types";
import React, { createContext, useContext } from "react";



const SidebarContext = createContext<SidebarContextType | null>(null);
const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toggleSidebar, toggle } = useSidebar();

  return (
    <SidebarContext.Provider value={{ toggleSidebar, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);

export default SidebarContextProvider;
