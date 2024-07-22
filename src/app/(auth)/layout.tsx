import { albertSans,barlow } from "@/assets/fonts/Fonts";
import "../globals.css"


// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} ${barlow.variable}`}>{children}</body>
    </html>
  )
}