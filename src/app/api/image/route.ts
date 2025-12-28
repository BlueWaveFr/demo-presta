import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.PRESTASHOP_API_KEY || ''
const PUBLIC_URL = process.env.NEXT_PUBLIC_PRESTASHOP_URL || 'https://presta-api.bluewave.fr'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const imageId = searchParams.get('imageId')

  if (!productId || !imageId) {
    return new NextResponse('Missing productId or imageId', { status: 400 })
  }

  const imageUrl = `${PUBLIC_URL}/api/images/products/${productId}/${imageId}`
  const auth = Buffer.from(`${API_KEY}:`).toString('base64')

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      return new NextResponse('Image not found', { status: 404 })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    })
  } catch (error) {
    console.error('Error fetching image:', error)
    return new NextResponse('Error fetching image', { status: 500 })
  }
}
