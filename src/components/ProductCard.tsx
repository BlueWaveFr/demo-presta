'use client'

import Link from "next/link"
import { useCart } from "./CartProvider"
import { getImageUrl, Product } from "@/lib/prestashop"

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart()
  const price = parseFloat(product.price) || 0
  const imageUrl = product.id_default_image
    ? getImageUrl(product.id, product.id_default_image)
    : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      image: imageUrl,
    })
  }

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <Link href={`/produit/${product.id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <span className="text-violet-600 text-xl font-bold">PS</span>
              </div>
              <span className="text-gray-400 text-sm">Image</span>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Quick add button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 py-3 bg-white/95 backdrop-blur-sm rounded-xl font-medium text-gray-900 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-white shadow-lg"
        >
          Ajouter au panier
        </button>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/produit/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            {price.toFixed(2)} EUR
          </span>

          <button
            onClick={handleAddToCart}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gradient-to-r hover:from-violet-600 hover:to-fuchsia-600 hover:text-white text-gray-600 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Decorative gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-violet-200 transition-colors pointer-events-none"></div>
    </div>
  )
}
