import React, { useCallback, useState } from 'react'
import { Button, View } from '~/components/styled'
import { ActionSheetProps } from '~/components/shared/ActionSheet/ActionSheet.tsx'
import { ActionSheet } from '~/components/shared'
import CheckboxFilter from '~/components/shared/filter/CheckboxFilter/CheckboxFilter.tsx'
import { Option } from '~/core/dto/shared/shared.dto'

export type CheckboxActionSheetProps = {
  value: any
  onChange: (value: any) => void
  options: Option[]
} & ActionSheetProps

function CheckboxActionSheet({
  options,
  value,
  onChange,
  onClose,
  ...props
}: CheckboxActionSheetProps) {
  const [checkedItems, setCheckedItems] = useState<any[]>(value)

  const handleClear = useCallback(() => {
    setCheckedItems([])
  }, [setCheckedItems])

  const handleSubmit = useCallback(() => {
    onChange(checkedItems)
    if (onClose) onClose()
  }, [checkedItems, onChange, onClose])

  return (
    <ActionSheet {...props} onClose={onClose}>
      <ActionSheet.Body>
        <CheckboxFilter
          options={options}
          onChange={setCheckedItems}
          value={checkedItems}
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

export default React.memo(CheckboxActionSheet)
