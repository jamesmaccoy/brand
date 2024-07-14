import { Hind_Vadodara } from 'next/font/google'
 

 
import "./globals.css";

const hind_vadodara = Hind_Vadodara({
  weight: '400',
  subsets: ['latin'],
})
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={hind_vadodara.className}>{children}</body>
    </html>
  );
}
