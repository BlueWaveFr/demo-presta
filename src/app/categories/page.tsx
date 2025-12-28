import Link from "next/link"
import { getCategories } from "@/lib/prestashop"

export const metadata = {
  title: "Categories",
  description: "Toutes les categories de produits - Demo PrestaShop Headless",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white mb-4">
            {categories.length} categories
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Categories
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Parcourez nos produits par categorie pour trouver ce que vous cherchez.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {categories.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group relative p-8 bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Number badge */}
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-fuchsia-100 group-hover:from-white/20 group-hover:to-white/10 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:from-white group-hover:to-white bg-clip-text text-transparent transition-all">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-white transition-colors mb-3">
                    {category.name}
                  </h2>

                  {category.description && (
                    <p className="text-gray-500 group-hover:text-white/80 transition-colors line-clamp-3 mb-6">
                      {category.description}
                    </p>
                  )}

                  <div className="flex items-center text-violet-600 group-hover:text-white font-semibold transition-colors">
                    <span>Explorer la categorie</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Decorative circle */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-violet-200/50 to-fuchsia-200/50 group-hover:from-white/10 group-hover:to-white/5 rounded-full transition-colors"></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Aucune categorie</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Ajoutez des categories dans PrestaShop pour les voir apparaitre ici.
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
