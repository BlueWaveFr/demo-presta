'use client'

import { useCart } from './CartProvider'

interface AddToCartButtonProps {
  product: {
    id: number
    name: string
    price: number
    image: string | null
  }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleClick = () => {
    addToCart(product)
  }

  return (
    <button
      onClick={handleClick}
      className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      Ajouter au panier
    </button>
  )
}
