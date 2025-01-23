import type { Metadata } from "next";
import "./ui/globals.css";
import { roboto } from "./ui/fonts";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
  title: "Job swap",
  description: "Job swap aplication",
  icons: {
    icon: "images/svgs/favicon/Logo.svg",
    // apple: "/apple-touch-icon.png", //  Apple
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${roboto.className} 
          antialiased 
          bg-base-white
          flex flex-col items-center h-full
          
      
        `}
      >
        <ClientProvider>
          <main className="flex flex-col items-center w-full py-4 px-4 phone:py-8  h-screen ">
            {children}
          </main>
          <div id="modal-root" />
        </ClientProvider>
      </body>
    </html>
  );
}
