import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Checkbox, List, TouchableRipple } from 'react-native-paper'
import { Option, ValueLabelPair } from '~/core/dto/shared/shared.dto'
import { Button, View } from '~/components/styled'
import globalStyles from '~/utils/style.utils.ts'
import { Style } from 'react-native-paper/lib/typescript/components/List/utils'

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

  const renderIcon = useCallback(
    (icon: string | undefined, style: Style) =>
      icon ? <List.Icon icon={icon} style={style} /> : undefined,
    [],
  )

  return (
    <>
      <List.Section title={title}>
        {showOptions.map((option: Option) => (
          <TouchableRipple
            onPress={() => handlePressItem(option.value)}
            key={option.value}>
            <List.Item
              title={option.label}
              left={({ style }) => renderIcon(option.icon, style)}
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
