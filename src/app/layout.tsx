import { albertSans, barlow } from "@/assets/fonts/Fonts";
import "./globals.css";
import { Metadata } from "next";
import AuthProvider from "@/providers/authProvider/AuthProvider";
import ReduxProvider from "@/providers/reduxProvider.tsx/ReduxProvider";

import ToastProvider from "@/providers/toastProvider/ToastProvider";

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
    <html lang="en">
      <body className={`${albertSans.variable}  ${barlow.variable}`}>
        <AuthProvider>
          <ToastProvider />

          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
