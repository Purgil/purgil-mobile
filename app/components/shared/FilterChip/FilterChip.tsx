import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Chip, Icon } from '~/components/styled'
import { CheckboxActionSheet } from '~/components/shared'
import { CheckboxActionSheetProps } from '~/components/shared/CheckboxActionSheet/CheckboxActionSheet.tsx'
import RadioActionSheet from '~/components/shared/RadioActionSheet/RadioActionSheet.tsx'

type Props = {
  defaultLabel: string
  labelType?: 'icon' | 'text'
  filterType?: 'radio' | 'checkbox'
} & CheckboxActionSheetProps

function FilterChip({
  labelType = 'text',
  options,
  value,
  defaultLabel,
  filterType = 'checkbox',
  ...props
}: Props) {
  /** state */
  const [actionSheetVisible, setActionSheetVisible] = useState(false)

  /** memo */
  const getCheckboxLabel = useCallback(
    () =>
      value.length > 0
        ? labelType === 'text'
          ? options
              .filter(a => value.includes(a.value))
              .map(v => v.label)
              .join(', ')
          : options
              .filter(a => value.includes(a.value))
              .map((v, index) => (
                <React.Fragment key={index}>
                  <Icon size={20} source={v.icon} />
                  {index < value.length - 1 && ', '}
                </React.Fragment>
              ))
        : defaultLabel,
    [value, defaultLabel],
  )

  const getRadioLabel = useCallback(
    () =>
      value ? (
        labelType === 'text' ? (
          options.find(a => a.value === value)?.label
        ) : (
          <Icon size={20} source={options.find(a => a.value === value)?.icon} />
        )
      ) : (
        defaultLabel
      ),
    [value, defaultLabel],
  )

  const label = useMemo(
    () => (filterType === 'radio' ? getRadioLabel() : getCheckboxLabel()),
    [filterType, value],
  )

  /*  const mode = useMemo(
    () =>
      (filterType === 'radio' ? value : value.length > 0) ? 'flat' : 'outlined',
    [value],
  )*/

  return (
    <>
      <Chip
        icon='chevron-down'
        justifyContent='center'
        alignItems='center'
        mode='outlined'
        onPress={() => setActionSheetVisible(true)}
        maxWidth={150}>
        {label}
      </Chip>

      {actionSheetVisible &&
        (filterType === 'radio' ? (
          <RadioActionSheet
            {...props}
            title={defaultLabel}
            options={options}
            value={value}
            onClose={() => setActionSheetVisible(false)}
          />
        ) : (
          <CheckboxActionSheet
            {...props}
            title={defaultLabel}
            options={options}
            value={value}
            onClose={() => setActionSheetVisible(false)}
          />
        ))}
    </>
  )
}

export default memo(FilterChip)
