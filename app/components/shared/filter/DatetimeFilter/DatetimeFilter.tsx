import { Text, View } from '~/components/styled'
import React, { memo } from 'react'
import { DatetimePicker } from '~/components/shared'
import { Dayjs } from 'dayjs'
import ListSubheader from 'react-native-paper/src/components/List/ListSubheader.tsx'
import { DatetimePickerProps } from '~/components/shared/DatetimePicker/DatetimePicker.tsx'

type Props = {
  title: string
  fromDatetime: Dayjs
  toDatetime: Dayjs
  onChangeFromDatetime: (value: Dayjs) => void
  onChangeToDatetime: (value: Dayjs) => void
} & DatetimePickerProps

function DatetimeFilter({
  title,
  fromDatetime,
  toDatetime,
  onChangeFromDatetime,
  onChangeToDatetime,
  ...props
}: Props) {
  return (
    <View py={10}>
      <ListSubheader>{title}</ListSubheader>
      <View
        px={12}
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        gap={5}>
        <View flex={1}>
          <DatetimePicker
            {...props}
            value={fromDatetime}
            onChange={onChangeFromDatetime}
          />
        </View>
        <Text>~</Text>
        <View flex={1}>
          <DatetimePicker
            {...props}
            value={toDatetime}
            onChange={onChangeToDatetime}
          />
        </View>
      </View>
    </View>
  )
}

export default memo(DatetimeFilter)
