import React, { useCallback, useState } from 'react'
import { Button, View } from '~/components/styled'
import { ValueLabelPair } from '~/core/data/basic.types'
import { Checkbox, List, TouchableRipple } from 'react-native-paper'
import { ActionSheetProps } from '~/components/basic/ActionSheet/ActionSheet.tsx'
import { ActionSheet } from '~/components/basic'

export type Option = {
  icon?: string
} & ValueLabelPair

export type CheckboxActionSheetProps = {
  value: any[]
  onChange: (value: any) => void
  options: Option[]
} & ActionSheetProps

function CheckboxActionSheet({
  options,
  value,
  onChange,
  onClose,
  ...props
}: CheckboxActionSheetProps) {
  const [checkedItems, setCheckedItems] = useState<any[]>(value)

  const handlePressItem = useCallback(
    (itemValue: any) => {
      setCheckedItems(
        checkedItems.includes(itemValue)
          ? checkedItems.filter(v => v !== itemValue)
          : [...checkedItems, itemValue],
      )
    },
    [setCheckedItems, checkedItems],
  )

  const handleClear = useCallback(() => {
    setCheckedItems([])
  }, [setCheckedItems])

  const handleSubmit = useCallback(() => {
    onChange(checkedItems)
    if (onClose) onClose()
  }, [checkedItems, onChange, onClose])

  const checkboxRenderer = (checked: boolean) => (
    <Checkbox status={checked ? 'checked' : 'unchecked'} />
  )

  return (
    <ActionSheet {...props} onClose={onClose}>
      <ActionSheet.Body>
        <List.Section>
          {options.map((option: ValueLabelPair) => (
            <TouchableRipple
              onPress={() => handlePressItem(option.value)}
              key={option.value}>
              <List.Item
                title={option.label}
                right={() =>
                  checkboxRenderer(checkedItems.includes(option.value))
                }
              />
            </TouchableRipple>
          ))}
        </List.Section>
        <View p={3} flexDirection='row' justifyContent='flex-end' gap={8}>
          <Button flex={1} onPress={handleClear}>
            클리어
          </Button>
          <Button flex={1} mode='contained' onPress={handleSubmit}>
            적용
          </Button>
        </View>
      </ActionSheet.Body>
    </ActionSheet>
  )
}

export default React.memo(CheckboxActionSheet)