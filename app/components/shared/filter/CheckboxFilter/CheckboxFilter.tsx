import React, { memo, useCallback, useMemo, useState } from 'react'
import { Checkbox, List, TouchableRipple } from 'react-native-paper'
import { ValueLabelPair } from '~/core/dto/shared/shared.dto'
import { Button, View } from '~/components/styled'
import globalStyles from '~/utils/style.utils.ts'

export type Option = {
  icon?: string
} & ValueLabelPair

export type CheckboxFilterProps = {
  value: any[]
  onChange: (value: any) => void
  options: Option[]
  title?: string
  foldable?: boolean
  leastShowCount?: number
}

function CheckboxFilter({
  options,
  value,
  onChange,
  title,
  foldable = false,
  leastShowCount = 3,
}: CheckboxFilterProps) {
  /** state */
  const [folded, setFolded] = useState(
    foldable && options.length > leastShowCount,
  )

  /** memo */
  const showOptions = useMemo(
    () => (folded ? options.slice(0, leastShowCount) : options),
    [folded, options],
  )
  const toggleButtonVisible = useMemo(
    () => foldable && options.length > leastShowCount,
    [],
  )
  const toggleButton = useMemo(
    () =>
      folded ? (
        <Button
          icon='chevron-down'
          contentStyle={globalStyles.flexReverse}
          onPress={() => setFolded(false)}>
          더보기
        </Button>
      ) : (
        <Button
          icon='chevron-up'
          contentStyle={globalStyles.flexReverse}
          onPress={() => setFolded(true)}>
          접기
        </Button>
      ),
    [folded],
  )

  /** function */
  const handlePressItem = useCallback(
    (itemValue: any) => {
      onChange(
        value.includes(itemValue)
          ? value.filter(v => v !== itemValue)
          : [...value, itemValue],
      )
    },
    [value, onChange],
  )

  /** render */
  const renderCheckbox = useCallback(
    (checked: boolean) => (
      <Checkbox status={checked ? 'checked' : 'unchecked'} />
    ),
    [],
  )

  return (
    <>
      <List.Section title={title}>
        {showOptions.map((option: ValueLabelPair) => (
          <TouchableRipple
            onPress={() => handlePressItem(option.value)}
            key={option.value}>
            <List.Item
              title={option.label}
              right={() => renderCheckbox(value.includes(option.value))}
            />
          </TouchableRipple>
        ))}
      </List.Section>
      <View flexDirection='row' justifyContent='flex-end' pr={1}>
        {toggleButtonVisible && toggleButton}
      </View>
    </>
  )
}

export default memo(CheckboxFilter)
