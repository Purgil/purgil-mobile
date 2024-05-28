import React from 'react'
import { View } from '~/components/styled'
import { Icon, useTheme } from 'react-native-paper'

type Props = {
  rating: number
  size?: number
  color?: string
}
function RatingStars({ rating, size = 16, color }: Props) {
  const { colors } = useTheme()

  const renderStars = () => {
    const floored = Math.floor(rating)
    const stars = [...new Array(floored)].map((_, index) => (
      <Icon
        key={index}
        size={size}
        source='star'
        color={color ? color : colors.primary}
      />
    ))
    if (floored !== rating)
      stars.push(
        <Icon
          size={size}
          source='star-half'
          color={color ? color : colors.primary}
        />,
      )
    return stars
  }

  return <View flexDirection='row'>{renderStars()}</View>
}

export default React.memo(RatingStars)
