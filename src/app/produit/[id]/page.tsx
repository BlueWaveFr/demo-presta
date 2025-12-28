import { notFound } from "next/navigation"
import Link from "next/link"
import { getProduct, getProducts, getImageUrl } from "@/lib/prestashop"
import AddToCartButton from "@/components/AddToCartButton"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map((product) => ({
      id: product.id.toString(),
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const product = await getProduct(parseInt(id))

  if (!product) {
    return { title: "Produit non trouve" }
  }

  return {
    title: product.name,
    description: product.description_short?.replace(/<[^>]*>/g, "").slice(0, 160),
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProduct(parseInt(id))

  if (!product) {
    notFound()
  }

  const price = parseFloat(product.price) || 0
  const imageUrl = product.id_default_image
    ? getImageUrl(product.id, product.id_default_image)
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-violet-600 transition-colors">
              Accueil
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/catalogue" className="text-gray-500 hover:text-violet-600 transition-colors">
              Catalogue
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="sticky top-32">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 shadow-2xl shadow-violet-500/10">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-violet-200 to-fuchsia-200 rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-violet-600 text-3xl font-bold">PS</span>
                      </div>
                      <span className="text-gray-400">Image non disponible</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-fuchsia-600/20 to-pink-600/20 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            {/* Reference badge */}
            {product.reference && (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm mb-4">
                Ref: {product.reference}
              </span>
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {price.toFixed(2)} EUR
              </span>
            </div>

            {/* Short description */}
            {product.description_short && (
              <div
                className="text-gray-600 mb-8 leading-relaxed prose prose-gray"
                dangerouslySetInnerHTML={{ __html: product.description_short }}
              />
            )}

            {/* Add to cart */}
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: price,
                image: imageUrl,
              }}
            />

            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-2xl text-center">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">En stock</span>
              </div>
              <div className="p-4 bg-white rounded-2xl text-center">
                <div className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Livraison rapide</span>
              </div>
              <div className="p-4 bg-white rounded-2xl text-center">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Paiement securise</span>
              </div>
            </div>

            {/* Full description */}
            {product.description && (
              <div className="mt-12 pt-12 border-t">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Tech info */}
            <div className="mt-12 p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl">
              <h3 className="font-semibold text-gray-900 mb-2">
                Produit charge depuis PrestaShop
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Ce produit est stocke dans PrestaShop et affiche via l&apos;API Webservice.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600">PrestaShop</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600">REST API</span>
                <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600">Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
