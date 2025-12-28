import Link from "next/link"
import { notFound } from "next/navigation"
import { getCategory, getCategories, getProductsByCategory } from "@/lib/prestashop"
import ProductCard from "@/components/ProductCard"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    id: String(category.id),
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const category = await getCategory(parseInt(id))

  if (!category) {
    return { title: "Categorie non trouvee" }
  }

  return {
    title: category.name,
    description: category.description || `Produits de la categorie ${category.name}`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params
  const [category, products] = await Promise.all([
    getCategory(parseInt(id)),
    getProductsByCategory(parseInt(id)),
  ])

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Toutes les categories
          </Link>
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-4">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-white/80 max-w-2xl">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Aucun produit</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Cette categorie ne contient pas encore de produits.
            </p>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Voir tous les produits
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
