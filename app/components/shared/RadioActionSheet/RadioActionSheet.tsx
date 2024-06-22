import React, { useCallback, useState } from 'react'
import { Button, View } from '~/components/styled'
import { ActionSheetProps } from '~/components/shared/ActionSheet/ActionSheet.tsx'
import { ActionSheet } from '~/components/shared'
import CheckboxFilter from '~/components/shared/filter/CheckboxFilter/CheckboxFilter.tsx'
import { Option } from '~/core/dto/shared/shared.dto'
import RadioFilter from '~/components/shared/filter/RadioFilter/RadioFilter.tsx'

type RadioActionSheetProps = {
  value: any
  onChange: (value: any) => void
  options: Option[]
} & ActionSheetProps

function RadioActionSheet({
  options,
  value,
  onChange,
  onClose,
  ...props
}: RadioActionSheetProps) {
  const [selectedValue, setSelectedValue] = useState<any>(value)

  const handleClear = useCallback(() => {
    setSelectedValue(undefined)
  }, [])

  const handleSubmit = useCallback(() => {
    onChange(selectedValue)
    if (onClose) onClose()
  }, [selectedValue, onChange, onClose])

  return (
    <ActionSheet {...props} onClose={onClose}>
      <ActionSheet.Body>
        <RadioFilter
          options={options}
          onChange={setSelectedValue}
          value={selectedValue}
          foldable={false}
        />
        <View p={3} flexDirection='row' justifyContent='flex-end' gap={8}>
          <Button flex={1} onPress={handleClear}>
            클리어
          </Button>
          <Button flex={1} mode='contained' onPress={handleSubmit}>
            적용
          </Button>
        </View>
      </ActionSheet.Body>
    </ActionSheet>
  )
}

export default React.memo(RadioActionSheet)
