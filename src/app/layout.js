"use client";
import React, { useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Hedear/Header";
import { AuthProvider } from "@/context/AuthProvider";
import { QueryClientProvider, QueryClient } from "react-query";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="mainContainer">
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
              {children}
            </AuthProvider>
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
