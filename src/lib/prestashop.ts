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

// Helper to extract multilingual value (French = id 1)
type MultiLangValue = string | Array<{ id: string; value: string }> | Record<string, string>

function getLocalizedValue(field: MultiLangValue): string {
  if (!field) return ''
  if (typeof field === 'string') return field

  // Array format: [{id: "1", value: "..."}, {id: "2", value: "..."}]
  if (Array.isArray(field)) {
    const french = field.find(f => f.id === '1')
    return french?.value || field[0]?.value || ''
  }

  // Object format: {"1": "...", "2": "..."}
  if (typeof field === 'object') {
    return (field as Record<string, string>)['1'] || Object.values(field)[0] || ''
  }

  return ''
}

// Helper to strip HTML tags from text
export function stripHtml(html: string): string {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
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

// Get image URL
export function getImageUrl(productId: number, imageId: number | string): string {
  return `${PUBLIC_URL}/api/images/products/${productId}/${imageId}?ws_key=${API_KEY}`
}

// Raw types from API
interface RawProduct {
  id: number
  name: MultiLangValue
  description: MultiLangValue
  description_short: MultiLangValue
  price: string
  reference: string
  id_category_default: string
  id_default_image: string
  active: string
}

interface RawCategory {
  id: number
  name: MultiLangValue
  description: MultiLangValue
  id_parent: string
  active: string
  level_depth: string
}

// Queries
export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fetchAPI<{ products: RawProduct[] }>('products?display=full&filter[active]=[1]&output_format=JSON')

    if (!data.products || !Array.isArray(data.products)) return []

    return data.products.map(p => ({
      id: p.id,
      name: getLocalizedValue(p.name),
      description: getLocalizedValue(p.description),
      description_short: getLocalizedValue(p.description_short),
      price: p.price,
      reference: p.reference || '',
      id_category_default: p.id_category_default,
      id_default_image: p.id_default_image,
      active: p.active,
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProduct(id: number): Promise<Product | null> {
  try {
    const data = await fetchAPI<{ product: RawProduct }>(`products/${id}?display=full&output_format=JSON`)

    if (!data.product) return null

    const p = data.product
    return {
      id: p.id,
      name: getLocalizedValue(p.name),
      description: getLocalizedValue(p.description),
      description_short: getLocalizedValue(p.description_short),
      price: p.price,
      reference: p.reference || '',
      id_category_default: p.id_category_default,
      id_default_image: p.id_default_image,
      active: p.active,
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchAPI<{ categories: RawCategory[] }>('categories?display=full&filter[active]=[1]&output_format=JSON')

    if (!data.categories || !Array.isArray(data.categories)) return []

    // Filter out root categories (level_depth 0 and 1)
    return data.categories
      .filter(c => c.level_depth && parseInt(c.level_depth) > 1)
      .map(c => ({
        id: c.id,
        name: getLocalizedValue(c.name),
        description: stripHtml(getLocalizedValue(c.description)),
        id_parent: c.id_parent,
        active: c.active,
        level_depth: c.level_depth,
      }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategory(id: number): Promise<Category | null> {
  try {
    const data = await fetchAPI<{ category: RawCategory }>(`categories/${id}?display=full&output_format=JSON`)

    if (!data.category) return null

    const c = data.category
    return {
      id: c.id,
      name: getLocalizedValue(c.name),
      description: stripHtml(getLocalizedValue(c.description)),
      id_parent: c.id_parent,
      active: c.active,
      level_depth: c.level_depth,
    }
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const data = await fetchAPI<{ products: RawProduct[] }>(`products?display=full&filter[active]=[1]&filter[id_category_default]=[${categoryId}]&output_format=JSON`)

    if (!data.products || !Array.isArray(data.products)) return []

    return data.products.map(p => ({
      id: p.id,
      name: getLocalizedValue(p.name),
      description: getLocalizedValue(p.description),
      description_short: getLocalizedValue(p.description_short),
      price: p.price,
      reference: p.reference || '',
      id_category_default: p.id_category_default,
      id_default_image: p.id_default_image,
      active: p.active,
    }))
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}
