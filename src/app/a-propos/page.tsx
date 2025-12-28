export const metadata = {
  title: "A propos",
  description: "A propos de cette demonstration PrestaShop Headless",
}

export default function AProposPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            A propos
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Decouvrez comment cette demo illustre la puissance d&apos;une architecture PrestaShop Headless.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Intro */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-xl text-gray-600 leading-relaxed">
            Cette demonstration illustre les capacites d&apos;une architecture PrestaShop Headless
            couplee a un frontend Next.js moderne. Le backend PrestaShop gere les produits,
            les categories et les stocks, tandis que le frontend React offre une experience
            utilisateur fluide et performante.
          </p>
        </div>

        {/* Architecture */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Architecture technique</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-3xl">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Backend PrestaShop</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>
                  PrestaShop 8
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>
                  API Webservice REST
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>
                  Gestion produits & stocks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>
                  Categories & attributs
                </li>
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl">
              <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Frontend Next.js</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                  Next.js 15 (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                  React Server Components
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                  TypeScript
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advantages */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Avantages cles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">&#9889;</div>
              <h3 className="font-bold text-gray-900 mb-2">Performance</h3>
              <p className="text-gray-600 text-sm">
                Rendu statique et ISR pour des temps de chargement ultra-rapides.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">&#127912;</div>
              <h3 className="font-bold text-gray-900 mb-2">Flexibilite</h3>
              <p className="text-gray-600 text-sm">
                Design 100% personnalisable, sans les contraintes des themes PrestaShop.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">&#128274;</div>
              <h3 className="font-bold text-gray-900 mb-2">Securite</h3>
              <p className="text-gray-600 text-sm">
                Backend PrestaShop non expose publiquement, API securisee.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Realise par Bluewave</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Bluewave est une agence digitale specialisee en developpement web, e-commerce et solutions sur-mesure.
          </p>
          <a
            href="https://bluewave.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-violet-500/25 transition-all hover:scale-105"
          >
            Decouvrir Bluewave
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
