// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "AI PDF Reader",
  description: "An AI-powered PDF reader application",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body className="flex h-screen overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-y-auto relative">
            <div className="fixed top-4 left-4 z-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
              <SidebarTrigger />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
