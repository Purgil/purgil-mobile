import { useCallback, useEffect, useState } from 'react'
import {
  CameraRoll,
  cameraRollEventEmitter,
} from '@react-native-camera-roll/camera-roll'
import { AppState, EmitterSubscription, Platform } from 'react-native'

interface GalleryOptions {
  pageSize: number
  mimeTypeFilter?: Array<string>
}

type ImageDTO = {
  uri: string
  width: number
  height: number
  filename: string
  fileSize: number
}

interface GalleryLogic {
  photos?: ImageDTO[]
  loadNextPagePictures: () => void
  isLoading: boolean
  isLoadingNextPage: boolean
  isReloading: boolean
  hasNextPage: boolean
}

const isAndroid = Platform.OS === 'android'
const supportedMimeTypesByTheBackEnd = [
  'image/jpeg',
  'image/png',
  'image/heif',
  'image/heic',
  'image/heif-sequence',
  'image/heic-sequence',
]

export const useGallery = ({
  pageSize = 30,
  mimeTypeFilter = supportedMimeTypesByTheBackEnd,
}: GalleryOptions): GalleryLogic => {
  const [isLoading, setIsLoading] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [nextCursor, setNextCursor] = useState<string>()
  const [photos, setPhotos] = useState<ImageDTO[]>()

  const loadNextPagePictures = useCallback(async () => {
    try {
      nextCursor ? setIsLoadingNextPage(true) : setIsLoading(true)
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: pageSize,
        after: nextCursor,
        assetType: 'Photos',
        mimeTypes: mimeTypeFilter,
        ...(isAndroid && { include: ['fileSize', 'filename'] }),
      })
      console.log('edges', edges)
      // const photos = convertCameraRollPicturesToImageDtoType(edges)
      const photos: ImageDTO[] = []
      setPhotos(prev => [...(prev ?? []), ...photos])

      setNextCursor(page_info.end_cursor)
      setHasNextPage(page_info.has_next_page)
    } catch (error) {
      console.error('useGallery getPhotos error:', error)
    } finally {
      setIsLoading(false)
      setIsLoadingNextPage(false)
    }
  }, [mimeTypeFilter, nextCursor, pageSize])

  const getUnloadedPictures = useCallback(async () => {
    try {
      setIsReloading(true)
      const { edges, page_info } = await CameraRoll.getPhotos({
        first: !photos || photos.length < pageSize ? pageSize : photos.length,
        assetType: 'Photos',
        mimeTypes: mimeTypeFilter,
        // Include fileSize only for android since it's causing performance issues on IOS.
        ...(isAndroid && { include: ['fileSize', 'filename'] }),
      })
      const newPhotos: ImageDTO[] = []
      // const newPhotos = convertCameraRollPicturesToImageDtoType(edges)
      console.log('edges2', edges)
      setPhotos(newPhotos)

      setNextCursor(page_info.end_cursor)
      setHasNextPage(page_info.has_next_page)
    } catch (error) {
      console.error('useGallery getNewPhotos error:', error)
    } finally {
      setIsReloading(false)
    }
  }, [mimeTypeFilter, pageSize, photos])

  useEffect(() => {
    if (!photos) {
      loadNextPagePictures()
    }
  }, [loadNextPagePictures, photos])

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState === 'active') {
          getUnloadedPictures()
        }
      },
    )

    return () => {
      subscription.remove()
    }
  }, [getUnloadedPictures])

  useEffect(() => {
    let subscription: EmitterSubscription
    // if (isAboveIOS14) {
    if (true) {
      subscription = cameraRollEventEmitter.addListener(
        'onLibrarySelectionChange',
        _event => {
          getUnloadedPictures()
        },
      )
    }

    return () => {
      if (subscription) {
        // if (isAboveIOS14 && subscription) {
        subscription.remove()
      }
    }
  }, [getUnloadedPictures])

  return {
    photos,
    loadNextPagePictures,
    isLoading,
    isLoadingNextPage,
    isReloading,
    hasNextPage,
  }
}
