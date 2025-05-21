'use client'
import { useAtomValue } from 'jotai'
import { galleryStateAtom } from '@/app/store/project/gallery'

import GalleryModalContent from './GalleryModalContent'

// interface GalleryItem {
//   type: 'image' | 'video'
//   src: string
//   alt: string
// }

export default function MediaGalleryModal() {
const state = useAtomValue(galleryStateAtom)
  return (
   state.opened && (
      <GalleryModalContent />
      )
  )
}