import { memo } from 'react'
import { Text } from '~/components/styled'
import { useTheme } from 'react-native-paper'

type Props = {
  label: string
}

function RequiredInputLabel({ label }: Props) {
  const { colors } = useTheme()

  return (
    <Text color={colors.onBackground}>
      <Text color={colors.error}>*</Text> {label}
    </Text>
  )
}

export default memo(RequiredInputLabel)
