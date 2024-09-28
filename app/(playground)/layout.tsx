import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Provider from "../Provider";
import Sidebar from "@/components/Sidebar";
import Rightbar from "@/components/Rightbar";
import { Toaster } from "sonner";
import { SocketProvider } from "../socket-context";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Refnet",
  description: "Showcase you work ⚡️.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Add routes where you don't want to display nav/footer
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SocketProvider>
          <Provider session={session}>
            <div className="flex h-screen px-7 mt-7 ">
              <Toaster richColors />
              <Sidebar />
              {children}
              <Rightbar />
            </div>
          </Provider>
        </SocketProvider>
      </body>
    </html>
  );
}
