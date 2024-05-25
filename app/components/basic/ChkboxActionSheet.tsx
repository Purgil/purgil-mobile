import React, { useCallback, useState } from 'react'
import { ActionSheet, Button, Text, View } from '~/components/styled'
import { ValueLabelPair } from '~/core/data/basic.types'
import { Checkbox, List, TouchableRipple } from 'react-native-paper'
import { ActionSheetProps } from '~/components/basic/ActionSheet.tsx'
import { FlatList, ListRenderItemInfo } from 'react-native'

type Props = {
  value: any[]
  onChange: (value: any) => void
  options: ValueLabelPair[]
} & ActionSheetProps

function ChkboxActionSheet({
  options,
  value,
  onChange,
  onClose,
  ...props
}: Props) {
  // const [visible, setVisible] = useState(false)
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
    onClose()
  }, [checkedItems, onChange, onClose])

  const itemRenderer = ({ item }: ListRenderItemInfo<ValueLabelPair>) => (
    <TouchableRipple
      onPress={() => handlePressItem(item.value)}
      key={item.value}>
      <View>
        <Text>{item.label}</Text>
      </View>
    </TouchableRipple>
  )

  return (
    <ActionSheet {...props} onClose={onClose}>
      <FlatList<ValueLabelPair> data={options} renderItem={itemRenderer} />

      {/*<List.Section*/}
      {/*  title={title}*/}
      {/*  titleStyle={globalStyles.bottomSheetTitleStyle}>*/}
      {/*  {options.map((option: ValueLabelPair) => (*/}
      {/*    <TouchableRipple*/}
      {/*      onPress={() => handlePressItem(option.value)}*/}
      {/*      key={option.value}>*/}
      {/*      <List.Item*/}
      {/*        title={option.label}*/}
      {/*        right={() =>*/}
      {/*          checkboxRenderer(checkedItems.includes(option.value))*/}
      {/*        }*/}
      {/*      />*/}
      {/*    </TouchableRipple>*/}
      {/*  ))}*/}
      {/*</List.Section>*/}
      <View p={3} flexDirection='row' justifyContent='flex-end' gap={8}>
        <Button flex={1} onPress={handleClear}>
          클리어
        </Button>
        <Button flex={1} mode='contained' onPress={handleSubmit}>
          적용
        </Button>
      </View>
    </ActionSheet>
  )
}

export default React.memo(ChkboxActionSheet)
