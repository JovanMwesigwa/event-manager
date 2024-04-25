import ReactQueryProvider from "@/context/react-query-provider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import EventQueryProvider from "@/context/event-query-provider";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TimeFlow",
  description:
    "Tool to follow and manage every activity happening in every event.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ReactQueryProvider>
            <EventQueryProvider>{children}</EventQueryProvider>
            <Toaster />
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
