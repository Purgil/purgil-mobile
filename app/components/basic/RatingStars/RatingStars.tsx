import React from 'react'
import { Text, View } from '~/components/styled'
import { Icon, useTheme } from 'react-native-paper'
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types'

type Props = {
  rating: number
  size?: number
  textVariant?: VariantProp<never>
  color?: string
  single?: boolean
  ratingPosition?: 'right' | 'top' | 'hide'
}
function RatingStars({
  rating,
  size = 16,
  textVariant = 'labelMedium',
  color,
  ratingPosition = 'right',
  single = false,
}: Props) {
  const { colors } = useTheme()

  const renderStars = () => {
    if (single)
      return (
        <Icon
          size={size}
          source='star'
          color={color ? color : colors.primary}
        />
      )
    const floored = Math.floor(rating)
    let index = 0
    const stars = [...new Array(floored)].map(() => (
      <Icon
        key={index++}
        size={size}
        source='star'
        color={color ? color : colors.primary}
      />
    ))
    if (floored !== rating)
      stars.push(
        <Icon
          key={index}
          size={size}
          source='star-half'
          color={color ? color : colors.primary}
        />,
      )
    return stars
  }

  return (
    <View
      flexDirection={ratingPosition === 'top' ? 'column-reverse' : 'row'}
      alignItems='center'
      gap={3}>
      <View flexDirection='row'>{renderStars()}</View>
      {ratingPosition !== 'hide' && <Text variant={textVariant}>{rating}</Text>}
    </View>
  )
}

export default React.memo(RatingStars)
