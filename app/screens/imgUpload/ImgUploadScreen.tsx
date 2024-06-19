import { Button, Image, Pressable, Text, View } from '~/components/styled'
import { useCameraRoll } from '@react-native-camera-roll/camera-roll'
import { Dimensions, FlatList } from 'react-native'
import usePermission from '~/hooks/usePermission.ts'
import { PermissionType } from '~/enums/shared.enum.ts'
import { CommonActions } from '@react-navigation/native'
import { RootScreenProps } from '~/router/types.ts'
import { Appbar, Dialog, useTheme } from 'react-native-paper'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Image as ImageT } from '~/core/dto/shared/shared.dto'
import { PhotoIdentifier } from '@react-native-camera-roll/camera-roll/src/CameraRoll.ts'

const windowWidth = Dimensions.get('window').width
const PAGE_SIZE_UNIT = 200

export default function ImgUploadScreen({
  navigation,
  route: {
    params: { maxCount, targetScreen },
  },
}: RootScreenProps<'ImgUpload'>) {
  /** state */
  const [selectedImgs, setSelectedImgs] = useState<ImageT[]>([])
  const [alertDialogVisible, setAlertDialogVisible] = useState(false)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_UNIT)

  /** hook */
  const [photos, getPhotos] = useCameraRoll()

  const { permissions } = usePermission({
    permissionTypes: [PermissionType.GALLERY],
    onPermissionDenied: navigation.goBack,
  })

  /** function */
  const handlePressImg = useCallback(
    (item: PhotoIdentifier) => {
      setSelectedImgs(state => {
        if (state.some(img => img.uri === item.node.image.uri))
          return state.filter(img => img.uri !== item.node.image.uri)
        else if (state.length === maxCount) {
          setAlertDialogVisible(true)
          return state
        } else
          return [
            ...state,
            {
              uri: item.node.image.uri,
              fileSize: item.node.image.fileSize as number,
              width: item.node.image.width as number,
              height: item.node.image.height as number,
              extension: item.node.image.extension as string,
            },
          ]
      })
    },
    [maxCount],
  )

  const handleSubmit = () => {
    if (targetScreen) {
      navigation.navigate(targetScreen, { selectedImgs })
      return
    }
    const routes = navigation.getState().routes as any
    let targetRouteParams = routes[routes.length - 2].params

    if (targetRouteParams) {
      targetRouteParams.selectedImgs = [
        ...(targetRouteParams.selectedImgs || []),
        ...selectedImgs,
      ]
    } else {
      targetRouteParams = {
        selectedImgs,
      }
    }

    routes[routes.length - 2] = {
      ...routes[routes.length - 2],
      params: targetRouteParams,
    }

    navigation.dispatch(CommonActions.reset({ index: 1, routes }))
    navigation.goBack()
  }

  const handleGetPhotos = useCallback(async () => {
    getPhotos({
      first: pageSize,
      assetType: 'Photos',
      include: ['filename', 'fileSize', 'imageSize', 'fileExtension'],
    })
  }, [pageSize])

  /** effect */
  useEffect(() => {
    if (permissions[PermissionType.GALLERY]) handleGetPhotos()
  }, [permissions, pageSize])

  /** render */
  const renderImage = useCallback(
    (item: PhotoIdentifier) => {
      const index = selectedImgs.findIndex(
        selectedImg => selectedImg.uri === item.node.image.uri,
      )
      return (
        <ImgItem
          picked={index > -1}
          number={index + 1}
          item={item}
          handlePressImg={handlePressImg}
        />
      )
    },
    [selectedImgs],
  )

  return (
    <>
      <View flex={1}>
        <Appbar.Header>
          <Appbar.Action icon='close' onPress={navigation.goBack} />
          <Appbar.Content title='사진 선택' />
          <Button icon='check' onPress={handleSubmit}>
            선택완료
          </Button>
        </Appbar.Header>
        {photos && (
          <FlatList
            data={photos.edges}
            numColumns={4}
            keyExtractor={item => item.node.id}
            renderItem={({ item }) => renderImage(item)}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              setPageSize(pageSize + PAGE_SIZE_UNIT)
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <Dialog
        visible={alertDialogVisible}
        onDismiss={() => setAlertDialogVisible(false)}>
        <Dialog.Content>
          <Text>최대 {maxCount}장까지 선택 가능합니다.</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setAlertDialogVisible(false)}>확인</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}

const ImgItem = memo(
  ({
    picked,
    number,
    item,
    handlePressImg,
  }: {
    picked: boolean
    number: number
    item: PhotoIdentifier
    handlePressImg: (item: PhotoIdentifier) => void
  }) => {
    // console.log('ChildComponent rendered')
    const { colors } = useTheme()
    return (
      <Pressable
        onPress={() => handlePressImg(item)}
        flex={1 / 4}
        height={windowWidth / 4}
        p='1px'>
        <Image
          source={{ uri: item.node.image.uri }}
          width='100%'
          height='100%'
        />
        <View
          border={2}
          borderColor='white'
          width={25}
          height={25}
          bg={picked ? colors.primaryContainer : colors.background}
          borderRadius={100}
          position='absolute'
          right={1}
          bottom={1}
          justifyContent='center'
          alignItems='center'>
          {picked && (
            <Text
              color={colors.onPrimaryContainer}
              fontSize={12}
              fontWeight='bold'>
              {number}
            </Text>
          )}
        </View>
      </Pressable>
    )
  },
)
