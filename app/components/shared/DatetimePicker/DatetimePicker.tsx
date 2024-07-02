import { Pressable, TextInput } from '~/components/styled'
import React, { memo, useCallback, useMemo, useState } from 'react'
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import dayjs, { Dayjs } from 'dayjs'

export type DatetimePickerProps = {
  value?: Dayjs
  onChange?: (value: Dayjs) => void
  mode?: 'date' | 'time' | 'datetime'
  minDate?: Dayjs
  maxDate?: Dayjs
  label?: string
}

function DatetimePicker({
  mode = 'date',
  value,
  onChange,
  minDate,
  maxDate,
  label = '날짜 선택',
}: DatetimePickerProps) {
  /** state */
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  /** memo */
  const text = useMemo(
    () =>
      mode === 'date'
        ? value?.format('YYYY년 M월 D일')
        : value?.format('YYYY년 M월 D일 h시 m분'),
    [mode, value],
  )
  const date = useMemo(() => value?.toDate() || new Date(), [value])

  /** function */
  const handlePress = useCallback(() => {
    if (mode === 'date') {
      setShowDatePicker(true)
    } else if (mode === 'time') {
      setShowTimePicker(true)
    } else if (mode === 'datetime') {
      setShowDatePicker(true)
    }
  }, [mode])

  const handleChangeDate = useCallback((e: DateTimePickerEvent) => {
    setShowDatePicker(false)
    if (onChange) onChange(dayjs(e.nativeEvent.timestamp).startOf('day'))
    setShowTimePicker(true)
  }, [])

  const handleChangeTime = useCallback((e: DateTimePickerEvent) => {
    setShowTimePicker(false)
    if (onChange) onChange(dayjs(e.nativeEvent.timestamp))
  }, [])

  return (
    <>
      <Pressable onPress={handlePress}>
        <TextInput mode='outlined' label={label} value={text} readOnly />
      </Pressable>

      {showDatePicker && (
        <RNDateTimePicker
          onChange={handleChangeDate}
          value={date}
          display='default'
          minimumDate={minDate?.toDate()}
          maximumDate={maxDate?.toDate()}
        />
      )}

      {showTimePicker && (
        <RNDateTimePicker
          onChange={handleChangeTime}
          value={date}
          mode='time'
          display='default'
        />
      )}
    </>
  )
}

export default memo(DatetimePicker)
