import React, { useMemo } from 'react'
import { ActionSheetProps } from '~/components/basic/ActionSheet/ActionSheet.tsx'
import { ActionSheet } from '~/components/basic'
import { List, useTheme } from 'react-native-paper'
import { TouchableRipple } from '~/components/styled'

type Props = {
  list: { title: string; onPress: () => void; mode?: 'normal' | 'error' }[]
} & ActionSheetProps

function ListActionSheet({ list, ...props }: Props) {
  const { colors } = useTheme()

  const titleStyleMap = {
    error: {
      color: colors.error,
      fontSize: 14,
    },
    normal: {
      fontSize: 14,
    },
  }

  const rippleColorMap = {
    error: colors.errorContainer,
    normal: undefined,
  }

  return (
    <ActionSheet {...props}>
      <ActionSheet.Body>
        <List.Section>
          {list.map(({ title, onPress, mode = 'normal' }, index) => (
            <TouchableRipple key={index}>
              <List.Item
                rippleColor={rippleColorMap[mode]}
                title={title}
                onPress={onPress}
                titleStyle={titleStyleMap[mode]}
              />
            </TouchableRipple>
          ))}
        </List.Section>
      </ActionSheet.Body>
    </ActionSheet>
  )
}

export default React.memo(ListActionSheet)
