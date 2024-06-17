import React, { memo, useCallback } from 'react'
import { Checkbox, List, TouchableRipple } from 'react-native-paper'
import { ValueLabelPair } from '~/core/data/basic.types'

export type Option = {
  icon?: string
} & ValueLabelPair

export type CheckboxFilterProps = {
  value: any[]
  onChange: (value: any) => void
  options: Option[]
  title?: string
}

function CheckBoxFilter({
  options,
  value,
  onChange,
  title,
}: CheckboxFilterProps) {
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
    <List.Section title={title}>
      {options.map((option: ValueLabelPair) => (
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
  )
}

export default memo(CheckBoxFilter)
