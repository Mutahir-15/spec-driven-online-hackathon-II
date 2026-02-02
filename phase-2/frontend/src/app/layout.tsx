import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReminderService } from "@/components/features/reminder-service";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Item CRUD App",
  description: "A simple item CRUD application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReminderService />
        <div className="min-h-screen bg-zinc-50 font-sans">
          <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                       <span className="text-white font-bold text-lg">I</span>
                    </div>
                    <span className="text-xl font-bold text-zinc-900 tracking-tight">Item App</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}