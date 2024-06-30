import { Pressable, TextInput } from '~/components/styled'
import React, { memo, useCallback, useMemo, useState } from 'react'
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import dayjs, { Dayjs } from 'dayjs'

export type DatetimePickerProps = {
  mode?: 'date' | 'time' | 'datetime'
  value: Dayjs
  onChange: (value: Dayjs) => void
}

function DatetimePicker({
  mode = 'date',
  value,
  onChange,
}: DatetimePickerProps) {
  /** state */
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  /** memo */
  const text = useMemo(
    () =>
      mode === 'date'
        ? value.format('YYYY년 M월 D일')
        : value.format('YYYY년 M월 D일 h시 m분'),
    [mode, value],
  )

  /** function */
  const handlePress = useCallback(() => {
    if (mode === 'date') {
      setShowDatePicker(true)
    } else if (mode === 'time') {
      setShowTimePicker(true)
    }
  }, [mode])

  const handleChangeDate = useCallback((e: DateTimePickerEvent) => {
    onChange(dayjs(e.nativeEvent.timestamp))
    setShowDatePicker(false)
  }, [])

  const handleChangeTime = useCallback((e: DateTimePickerEvent) => {
    onChange(dayjs(e.nativeEvent.timestamp))
    setShowTimePicker(false)
  }, [])

  return (
    <>
      <Pressable onPress={handlePress}>
        <TextInput mode='outlined' value={text} readOnly />
      </Pressable>

      {showDatePicker && (
        <RNDateTimePicker
          onChange={handleChangeDate}
          value={value.toDate()}
          display='default'
        />
      )}

      {showTimePicker && (
        <RNDateTimePicker
          onChange={handleChangeTime}
          value={value.toDate()}
          mode='time'
          display='default'
        />
      )}
    </>
  )
}

export default memo(DatetimePicker)
