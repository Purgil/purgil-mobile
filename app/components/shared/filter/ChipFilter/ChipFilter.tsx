import { memo, useCallback, useEffect } from 'react'
import { Option } from '~/core/dto/shared/shared.dto'
import { Chip, View } from '~/components/styled'

type Props = {
  value: any
  onChange: (value: any) => void
  options: Option[]
  multiple?: boolean
  required?: boolean
}

function ChipFilter({
  value,
  onChange,
  options,
  required = true,
  multiple,
}: Props) {
  /** memo */

  /** function */
  const handlePress = useCallback(
    (val: any) => {
      if (multiple) {
        onChange(
          value.includes(val)
            ? value.filter((v: any) => v !== val)
            : [...value, val],
        )
      } else {
        onChange(value === val ? (required ? value : null) : val)
      }
    },
    [value],
  )

  const getMode = useCallback(
    (val: any) => {
      if (multiple) return value.includes(val) ? undefined : 'outlined'
      return value === val ? undefined : 'outlined'
    },
    [value],
  )

  return (
    <View flexDirection='row' gap={5}>
      {options.map((option, index) => (
        <Chip
          icon={option.icon}
          key={index}
          mode={getMode(option.value)}
          onPress={() => handlePress(option.value)}>
          {option.label}
        </Chip>
      ))}
    </View>
  )
}

export default memo(ChipFilter)
