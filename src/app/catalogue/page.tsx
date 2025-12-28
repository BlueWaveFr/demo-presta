import { getProducts } from "@/lib/prestashop"
import ProductCard from "@/components/ProductCard"

export const metadata = {
  title: "Catalogue",
  description: "Tous nos produits - Demo PrestaShop Headless",
}

export default async function CataloguePage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-4">
            {products.length} produits
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Catalogue
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Parcourez tous nos produits. Catalogue gere dans PrestaShop, rendu via Next.js.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
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
              Le catalogue est vide. Ajoutez des produits dans PrestaShop pour les voir apparaitre ici.
            </p>
            <a
              href="https://presta-api.bluewave.fr/admin-bw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
            >
              Acceder a PrestaShop
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
