import { Albert_Sans, Barlow } from "next/font/google";

export const albertSans = Albert_Sans({
    subsets: ["latin"],
    variable :"--font-albert-sans",
    weight: ["400", "500", "600", "700", "800"],
  });
export const barlow = Barlow({
    subsets: ["latin"],
    variable:"--font-barlow",
    weight: ["400", "500", "600", "700", "800"],
  });