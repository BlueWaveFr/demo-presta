import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-white overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">PS</span>
              </div>
              <div>
                <span className="font-bold text-xl">Demo PrestaShop</span>
                <span className="block text-sm text-gray-400">Headless Commerce</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Demonstration d&apos;architecture PrestaShop Headless avec Next.js.
              Performance, flexibilite et experience utilisateur moderne.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-gray-400 hover:text-white transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-400 hover:text-white transition-colors">
                  A propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-300">Next.js 15</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-300">PrestaShop</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-300">REST API</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-300">Tailwind</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-300">Coolify</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            Demo realisee par{" "}
            <a
              href="https://bluewave.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Bluewave
            </a>
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>API PrestaShop connectee</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
