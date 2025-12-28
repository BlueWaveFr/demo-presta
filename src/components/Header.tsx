'use client'

import Link from "next/link"
import { useCart } from "./CartProvider"
import { useState } from "react"

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/5 border border-white/20">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                    <span className="text-white font-bold">PS</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-gray-900">Demo PrestaShop</span>
                  <span className="block text-xs text-gray-500">Headless Commerce</span>
                </div>
              </Link>

              {/* Navigation Desktop */}
              <div className="hidden md:flex items-center gap-1">
                <Link href="/" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                  Accueil
                </Link>
                <Link href="/catalogue" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                  Catalogue
                </Link>
                <Link href="/categories" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                  Categories
                </Link>
                <Link href="/a-propos" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                  A propos
                </Link>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-violet-600 text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col gap-2">
                  <Link href="/" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                    Accueil
                  </Link>
                  <Link href="/catalogue" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                    Catalogue
                  </Link>
                  <Link href="/categories" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                    Categories
                  </Link>
                  <Link href="/a-propos" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                    A propos
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
