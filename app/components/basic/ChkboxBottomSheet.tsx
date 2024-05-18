import BottomSheet, { BottomSheetProps } from './BottomSheet.tsx'
import { Checkbox, List, TouchableRipple } from 'react-native-paper'
import globalStyles from '../../utils/style.utils.ts'
import { NameValuePair } from '../../core/types/common.types'
import { Button, View } from '../styled'
import { useCallback, useState } from 'react'

type Props = {
  title: string
  value: any[]
  setValue: (v: any) => void
  options: NameValuePair[]
} & Pick<BottomSheetProps, 'bottomSheetRef'>

function ChkboxBottomSheet({
  bottomSheetRef,
  value,
  setValue,
  options,
  title,
}: Props) {
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
    setValue(checkedItems)
    bottomSheetRef?.current?.dismiss()
  }, [bottomSheetRef, checkedItems, setValue])

  const checkboxRenderer = (checked: boolean) => (
    <Checkbox status={checked ? 'checked' : 'unchecked'} />
  )

  return (
    <BottomSheet bottomSheetRef={bottomSheetRef}>
      <List.Section
        title={title}
        titleStyle={globalStyles.bottomSheetTitleStyle}>
        {options.map((option: NameValuePair) => (
          <TouchableRipple
            onPress={() => handlePressItem(option.value)}
            key={option.value}>
            <List.Item
              title={option.name}
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
    </BottomSheet>
  )
}

export default ChkboxBottomSheet
