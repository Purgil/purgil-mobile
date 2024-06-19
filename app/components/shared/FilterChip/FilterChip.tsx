import { memo, useMemo, useState } from 'react'
import { Chip, Icon } from '~/components/styled'
import { CheckboxActionSheetProps } from '~/components/shared/ChkboxActionSheet/CheckboxActionSheet.tsx'
import { ChkboxActionSheet } from '~/components/shared'

type Props = {
  defaultLabel: string
} & CheckboxActionSheetProps

function FilterChip({ options, value, defaultLabel, ...props }: Props) {
  /** state */
  const [actionSheetVisible, setActionSheetVisible] = useState(false)

  /** memo */
  const label = useMemo(
    () =>
      value.length > 0
        ? options
            .filter(a => value.includes(a.value))
            .map(v => v.label)
            .join(', ')
        : defaultLabel,
    [value, defaultLabel],
  )
  const mode = useMemo(
    () => (value.length > 0 ? 'flat' : 'outlined'),
    [value.length],
  )

  return (
    <>
      <Chip
        icon='chevron-down'
        justifyContent='center'
        alignItems='center'
        mode={mode}
        onPress={() => setActionSheetVisible(true)}
        maxWidth={150}>
        <Icon size={20} source='bike' />
      </Chip>

      {actionSheetVisible && (
        <ChkboxActionSheet
          {...props}
          title={defaultLabel}
          options={options}
          value={value}
          onClose={() => setActionSheetVisible(false)}
        />
      )}
    </>
  )
}

export default memo(FilterChip)
