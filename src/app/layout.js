"use client";
import React, { useState } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Hedear/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="mainContainer">
          <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
          {children}
        </main>
      </body>
    </html>
  );
}
