const API_URL = process.env.PRESTASHOP_API_URL || 'https://presta-api.bluewave.fr/api'
const API_KEY = process.env.PRESTASHOP_API_KEY || ''
const PUBLIC_URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL || 'https://presta-api.bluewave.fr'

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const auth = Buffer.from(`${API_KEY}:`).toString('base64')

  const res = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Output-Format': 'JSON',
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error(`PrestaShop API Error: ${res.status} ${res.statusText}`)
    throw new Error('Failed to fetch from PrestaShop API')
  }

  return res.json()
}

// Types
export interface Product {
  id: number
  name: string
  description: string
  description_short: string
  price: string
  reference: string
  id_category_default: string
  id_default_image: string
  active: string
}

export interface Category {
  id: number
  name: string
  description: string
  id_parent: string
  active: string
  level_depth: string
}

export interface ProductImage {
  id: number
  id_product: string
}

// Get image URL
export function getImageUrl(productId: number, imageId: number | string): string {
  return `${PUBLIC_URL}/api/images/products/${productId}/${imageId}?ws_key=${API_KEY}`
}

// Queries
export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fetchAPI<{ products: { product: Product[] } | { product: Product } }>('products?display=full&filter[active]=[1]')

    if (!data.products) return []

    // Handle single product vs array
    const products = Array.isArray(data.products.product)
      ? data.products.product
      : [data.products.product]

    return products.map(p => ({
      ...p,
      name: typeof p.name === 'object' ? (p.name as Record<string, string>)[1] || Object.values(p.name as object)[0] : p.name,
      description: typeof p.description === 'object' ? (p.description as Record<string, string>)[1] || Object.values(p.description as object)[0] : p.description,
      description_short: typeof p.description_short === 'object' ? (p.description_short as Record<string, string>)[1] || Object.values(p.description_short as object)[0] : p.description_short,
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(id: number): Promise<Product | null> {
  try {
    const data = await fetchAPI<{ product: Product }>(`products/${id}?display=full`)

    if (!data.product) return null

    const p = data.product
    return {
      ...p,
      name: typeof p.name === 'object' ? (p.name as Record<string, string>)[1] || Object.values(p.name as object)[0] : p.name,
      description: typeof p.description === 'object' ? (p.description as Record<string, string>)[1] || Object.values(p.description as object)[0] : p.description,
      description_short: typeof p.description_short === 'object' ? (p.description_short as Record<string, string>)[1] || Object.values(p.description_short as object)[0] : p.description_short,
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchAPI<{ categories: { category: Category[] } | { category: Category } }>('categories?display=full&filter[active]=[1]')

    if (!data.categories) return []

    const categories = Array.isArray(data.categories.category)
      ? data.categories.category
      : [data.categories.category]

    // Filter out root categories (level_depth 0 and 1)
    return categories
      .filter(c => parseInt(c.level_depth) > 1)
      .map(c => ({
        ...c,
        name: typeof c.name === 'object' ? (c.name as Record<string, string>)[1] || Object.values(c.name as object)[0] : c.name,
        description: typeof c.description === 'object' ? (c.description as Record<string, string>)[1] || Object.values(c.description as object)[0] : c.description,
      }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
