import { Button, Divider, ScrollView, View } from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootScreenProps } from '~/router/types.ts'
import React, { useCallback, useMemo } from 'react'
import {
  adventureTypeOptions,
  difficultyOptions,
  routeTypeOptions,
} from '~/screens/home/HomeScreen.consts.ts'
import { useFormik } from 'formik'
import { ExpeditionListReqDto } from '~/core/dto/expedition/expedition.req-dto'
import CheckboxFilter from '~/components/shared/filter/CheckboxFilter/CheckboxFilter.tsx'
import { DatetimePicker, SlideBarFilter } from '~/components/shared'
import { initialExpeditionFilter } from '~/screens/social/tabs/Expedition/ExpeditionTab.consts.ts'
import { useColorScheme } from 'react-native'
import dayjs from 'dayjs'
import DatetimeFilter from '~/components/shared/filter/DatetimeFilter/DatetimeFilter.tsx'

export function ExpeditionFilterScreen({
  navigation,
  route: {
    params: { filter },
  },
}: RootScreenProps<'ExpeditionFilter'>) {
  /** hook */
  const { colors } = useTheme()
  const { values, setFieldValue, setValues, submitForm } =
    useFormik<ExpeditionListReqDto>({
      initialValues: filter,
      onSubmit: () => {
        navigation.navigate('Social', { expeditionFilter: values })
      },
    })

  /** memo */
  const initialValues: ExpeditionListReqDto = useMemo(
    () => ({
      ...initialExpeditionFilter,
    }),
    [],
  )

  const minDepartureDate = useMemo(
    () => dayjs(values.minDepartureDate),
    [values.minDepartureDate],
  )
  const maxDepartureDate = useMemo(
    () => dayjs(values.maxDepartureDate),
    [values.maxDepartureDate],
  )

  /** function */
  const handleClear = useCallback(() => {
    setValues(initialValues)
  }, [])
  const handleChangeAdventureType = useCallback(
    (value: any) => setFieldValue('adventureTypeCodes', value),
    [],
  )
  const handleChangeRouteType = useCallback(
    (value: any) => setFieldValue('routeTypeCodes', value),
    [],
  )
  const handleChangeDifficulty = useCallback(
    (value: any) => setFieldValue('difficultyCodes', value),
    [],
  )
  const handleChangeMinAge = useCallback(
    (value: number) => setFieldValue('minAge', value),
    [],
  )
  const handleChangeMaxAge = useCallback(
    (value: number) => setFieldValue('maxAge', value >= 60 ? undefined : value),
    [],
  )
  const handleChangeMinParticipantCount = useCallback(
    (value: number) => setFieldValue('minParticipantCount', value),
    [],
  )
  const handleChangeMaxParticipantCount = useCallback(
    (value: number) =>
      setFieldValue('maxParticipantCount', value >= 10 ? undefined : value),
    [],
  )
  const handleChangeMinRating = useCallback(
    (value: number) => setFieldValue('minRating', value),
    [],
  )
  const handleChangeMinLength = useCallback(
    (value: number) => setFieldValue('minLength', value),
    [],
  )
  const handleChangeMaxLength = useCallback(
    (value: number) =>
      setFieldValue('maxLength', value >= 50 ? undefined : value),
    [],
  )
  const handleChangeMinElvGain = useCallback(
    (value: number) => setFieldValue('minElvGain', value),
    [],
  )
  const handleChangeMaxElvGain = useCallback(
    (value: number) =>
      setFieldValue('maxElvGain', value >= 1500 ? undefined : value),
    [],
  )
  const handleChangeMinHighestPoint = useCallback(
    (value: number) => setFieldValue('minHighestPoint', value),
    [],
  )
  const handleChangeMaxHighestPoint = useCallback(
    (value: number) =>
      setFieldValue('maxHighestPoint', value >= 3000 ? undefined : value),
    [],
  )
  const handleChangeMinDepartureDate = useCallback(
    (value: dayjs.Dayjs) =>
      setFieldValue('minDepartureDate', value.format('YYYY-MM-DD')),
    [],
  )
  const handleChangeMaxDepartureDate = useCallback(
    (value: dayjs.Dayjs) =>
      setFieldValue('maxDepartureDate', value.format('YYYY-MM-DD')),
    [],
  )

  return (
    <View flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='필터' />
      </Appbar.Header>
      <ScrollView>
        {/* 연령 */}
        <SlideBarFilter
          title='연령'
          divideCount={10}
          multiply={5}
          minValue={10}
          unitText='살'
          leftValue={values.minAge}
          rightValue={values.maxAge || 60}
          leftOnChange={handleChangeMinAge}
          rightOnChange={handleChangeMaxAge}
        />

        <Divider my={10} />

        {/* 참가자 수 */}
        <SlideBarFilter
          title='참가인원 수'
          divideCount={9}
          minValue={1}
          unitText='명'
          leftValue={values.minParticipantCount}
          rightValue={values.maxParticipantCount || 10}
          leftOnChange={handleChangeMinParticipantCount}
          rightOnChange={handleChangeMaxParticipantCount}
        />

        <Divider my={10} />

        <DatetimeFilter
          title='출발일'
          fromDatetime={minDepartureDate}
          toDatetime={maxDepartureDate}
          onChangeFromDatetime={handleChangeMinDepartureDate}
          onChangeToDatetime={handleChangeMaxDepartureDate}
        />

        <Divider my={10} />

        {/* 모험 유형 */}
        <CheckboxFilter
          title='모험 유형'
          value={values.adventureTypeCodes}
          onChange={handleChangeAdventureType}
          options={adventureTypeOptions}
        />

        <Divider my={10} />

        {/* 루트 유형 */}
        <CheckboxFilter
          title='루트 유형'
          value={values.routeTypeCodes}
          onChange={handleChangeRouteType}
          options={routeTypeOptions}
        />

        <Divider my={10} />

        {/* 루트 난이도 */}
        <CheckboxFilter
          title='루트 난이도'
          value={values.difficultyCodes}
          onChange={handleChangeDifficulty}
          options={difficultyOptions}
        />

        <Divider my={10} />

        {/* 루트 평점 */}
        <SlideBarFilter
          title='평점'
          fixedRight
          divideCount={5}
          rightLabel='4.5 +'
          leftValue={values.minRating}
          rightValue={5}
          leftOnChange={handleChangeMinRating}
        />

        <Divider my={10} />

        {/* 루트 길이 */}
        <SlideBarFilter
          title='루트 길이'
          unitText='km'
          divideCount={50}
          leftValue={values.minLength}
          rightValue={values.maxLength || 50}
          leftOnChange={handleChangeMinLength}
          rightOnChange={handleChangeMaxLength}
        />

        <Divider my={10} />

        {/* 루트 누적 오르막 */}
        <SlideBarFilter
          title='누적 오르막'
          divideCount={15}
          multiply={100}
          unitText='m'
          leftValue={values.minElvGain}
          rightValue={values.maxElvGain || 1500}
          leftOnChange={handleChangeMinElvGain}
          rightOnChange={handleChangeMaxElvGain}
        />

        <Divider my={10} />

        {/* 루트 정상 고도 */}
        <SlideBarFilter
          title='정상 고도'
          divideCount={30}
          multiply={100}
          unitText='m'
          leftValue={values.minHighestPoint}
          rightValue={values.maxHighestPoint || 3000}
          leftOnChange={handleChangeMinHighestPoint}
          rightOnChange={handleChangeMaxHighestPoint}
        />
      </ScrollView>

      <View
        p={10}
        borderTopWidth={1}
        borderColor={colors.elevation.level3}
        flexDirection='row'>
        <Button flex={1} onPress={handleClear}>
          클리어
        </Button>
        <Button flex={1} mode='contained' onPress={submitForm}>
          적용하기
        </Button>
      </View>
    </View>
  )
}
