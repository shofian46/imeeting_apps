import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iMeeting",
  description: "Video calling App",
  icons: {
    icon: "/icons/PLN.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/PLN.png",
        },
        variables: { colorText: '#fff', colorPrimary: '#0E78F9', colorBackground: '#1c1f2e', colorInputBackground: '#252a41', colorInputText: '#fff' }
      }}>
        <body className={`${inter.className} bg-gray-200`}>{children}
        </body>
      </ClerkProvider>
    </html>
  );
}
