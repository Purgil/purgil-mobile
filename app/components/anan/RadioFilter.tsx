import React, { memo, useCallback } from 'react'
import { List, RadioButton, TouchableRipple } from 'react-native-paper'
import { Option } from '~/components/basic/CheckboxFilter/CheckboxFilter.tsx'
import { View } from '~/components/styled'

export type RadioFilterProps = {
  value: any
  onChange: (value: any) => void
  options: Option[]
  title?: string
}

function RadioFilter({ options, value, onChange, title }: RadioFilterProps) {
  /** render */
  const renderRadioButton = useCallback(
    (option: Option) => (
      <View pointerEvents='none'>
        <RadioButton
          value={value}
          status={option.value === value ? 'checked' : 'unchecked'}
        />
      </View>
    ),
    [value],
  )

  return (
    <List.Section title={title}>
      {options.map(option => (
        <TouchableRipple
          onPress={() => onChange(option.value)}
          key={option.value}>
          <List.Item
            title={option.label}
            right={() => renderRadioButton(option)}
          />
        </TouchableRipple>
      ))}
    </List.Section>
  )
}

export default memo(RadioFilter)
