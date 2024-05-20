import RNCarousel, { TCarouselProps } from 'react-native-reanimated-carousel'
import React, { useCallback, useState } from 'react'
import { Icon, useTheme } from 'react-native-paper'
import { View } from '~/components/styled'

type Props = {} & TCarouselProps

function Carousel({ loop = false, data = [], ...props }: Props) {
  const { colors } = useTheme()
  const [index, setIndex] = useState(0)

  const handleIndexChange = useCallback((idx: number) => {
    setIndex(idx)
  }, [])

  const dotRenderer = useCallback(
    (i: number) => (
      <Icon
        key={i}
        size={6}
        source='checkbox-blank-circle'
        color={i === index ? colors.primary : colors.onSurfaceDisabled}
      />
    ),
    [colors, index],
  )

  return (
    <>
      <RNCarousel
        {...props}
        data={data}
        loop={loop}
        onSnapToItem={handleIndexChange}
      />

      <View
        justifyContent='flex-end'
        flexDirection='row'
        mr={20}
        mt={-20}
        mb={14}
        gap={5}>
        {data.map((_, i) => dotRenderer(i))}
      </View>
    </>
  )
}

export default React.memo(Carousel)
