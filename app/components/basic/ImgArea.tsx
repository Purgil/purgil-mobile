import { Text, View } from '../styled'
import { useTheme } from 'react-native-paper'
import React from 'react'

type Props = {
  height?: number
}

function ImgArea({ height = 300 }: Props) {
  const { colors } = useTheme()
  return (
    <View
      height={height}
      justifyContent='center'
      bg={colors.secondaryContainer}
      borderRadius={7}
      mb={10}>
      <Text textAlign='center'>이미지 영역</Text>
    </View>
  )
}

export default React.memo(ImgArea)
