'use client'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "./components/sidebar"
import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })



function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          AscendX
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-blue-600">
              Organization
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboardRoute =
    pathname.startsWith("/dashboard") ||
    pathname === "/products" ||
    pathname === "/notifications" ||
    pathname === "/sales" ||
    pathname === "/forecast"

  return (
    <html lang="en">
      <body className={inter.className}>
        {isDashboardRoute ? (
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
          </div>
        ) : (
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        )}
      </body>
    </html>
  )
}

