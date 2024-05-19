import RNSwiper from 'react-native-swiper'
import { useTheme } from 'react-native-paper'
import { SwiperProps } from '../../core/data/external.types'
import React from 'react'
import { IconButton } from '../styled'

type Props = {} & SwiperProps

function Swiper({ children, ...props }: Props) {
  const { colors } = useTheme()

  return (
    <RNSwiper
      {...props}
      activeDotColor={colors.primary}
      prevButton={<IconButton icon='chevron-left' />}
      nextButton={<IconButton icon='chevron-right' />}>
      {children}
    </RNSwiper>
  )
}

export default React.memo(Swiper)
