import { useTheme } from 'react-native-paper'
import React from 'react'
import { Text, View } from '~/components/styled'

type Props = {
  height?: number
}

function ImgArea({ height = 300 }: Props) {
  const { colors } = useTheme()
  return (
    <View
      height={height}
      width='100%'
      justifyContent='center'
      bg={colors.inverseSurface}
      mb={10}>
      <Text textAlign='center' color={colors.inverseOnSurface}>
        이미지 영역
      </Text>
    </View>
  )
}

export default React.memo(ImgArea)
