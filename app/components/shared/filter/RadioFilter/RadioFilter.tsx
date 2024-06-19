import React, { memo, useCallback, useMemo, useState } from 'react'
import { List, RadioButton, TouchableRipple } from 'react-native-paper'
import { Option } from '~/components/shared/filter/CheckboxFilter/CheckboxFilter.tsx'
import { Button, View } from '~/components/styled'
import globalStyles from '~/utils/style.utils.ts'

export type RadioFilterProps = {
  value: any
  onChange: (value: any) => void
  options: Option[]
  title?: string
  foldable?: boolean
  leastShowCount?: number
}

function RadioFilter({
  options,
  value,
  onChange,
  title,
  foldable = false,
  leastShowCount = 3,
}: RadioFilterProps) {
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
    <>
      <List.Section title={title}>
        {showOptions.map(option => (
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
      <View flexDirection='row' justifyContent='flex-end' pr={1}>
        {toggleButtonVisible && toggleButton}
      </View>
    </>
  )
}

export default memo(RadioFilter)
