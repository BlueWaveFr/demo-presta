import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartSlider from "@/components/CartSlider"
import { CartProvider } from "@/components/CartProvider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Demo E-commerce PrestaShop Headless - Bluewave",
    template: "%s | Demo PrestaShop Headless",
  },
  description: "Demonstration d'un site e-commerce PrestaShop Headless avec Next.js - Bluewave",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 min-h-screen`}>
        <CartProvider>
          <Header />
          <main className="pt-24">
            {children}
          </main>
          <Footer />
          <CartSlider />
        </CartProvider>
      </body>
    </html>
  )
}
