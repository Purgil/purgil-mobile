import React from 'react'
import { ActionSheetProps } from '~/components/basic/ActionSheet/ActionSheet.tsx'
import { ActionSheet } from '~/components/basic'
import { List, useTheme } from 'react-native-paper'
import { TouchableRipple } from '~/components/styled'

type Props = {
  list: { title: string; onPress: () => void; mode?: 'normal' | 'error' }[]
} & ActionSheetProps

function ListActionSheet({ list, ...props }: Props) {
  const { colors } = useTheme()

  const normalTitleStyle = {
    textAlign: 'center' as 'center',
    color: colors.primary,
  }
  const errorTitleStyle = {
    textAlign: 'center' as 'center',
    color: colors.error,
  }

  return (
    <ActionSheet {...props}>
      <ActionSheet.Body>
        <List.Section>
          {list.map(({ title, onPress, mode = 'normal' }, index) => (
            <TouchableRipple
              key={index}
              rippleColor={
                mode === 'error' ? colors.errorContainer : undefined
              }>
              <List.Item
                title={title}
                onPress={onPress}
                titleStyle={
                  mode !== 'error' ? normalTitleStyle : errorTitleStyle
                }
              />
            </TouchableRipple>
          ))}
        </List.Section>
      </ActionSheet.Body>
    </ActionSheet>
  )
}

export default React.memo(ListActionSheet)
