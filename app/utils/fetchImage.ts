'use client'

export async function fetchImagesClient() {
  const searchParams = new URLSearchParams(window.location.search)
  const encodedImages = searchParams.get('images')
  if (!encodedImages) {
    return []
  }
  const images = JSON.parse(decodeURIComponent(encodedImages))
  return Promise.all(images.map((image: string) => fetch(image).then((res) => res.text())))
}

export async function fetchImagesServer(searchParams: string) {
  const encodedImages = new URLSearchParams(searchParams).get('images')
  if (!encodedImages) {
    return []
  }
  const images = JSON.parse(decodeURIComponent(encodedImages))
  return images
}