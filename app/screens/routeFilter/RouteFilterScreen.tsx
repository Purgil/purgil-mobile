import { Button, Divider, ScrollView, View } from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import React, { useCallback, useMemo } from 'react'
import CheckboxFilter from '~/components/shared/filter/CheckboxFilter/CheckboxFilter.tsx'
import { useFormik } from 'formik'
import {
  difficultyOptions,
  routeTypeOptions,
  sortByOptions,
} from '~/screens/home/HomeScreen.consts.ts'
import { RootScreenProps } from '~/router/types.ts'
import RadioFilter from '~/components/shared/filter/RadioFilter/RadioFilter.tsx'
import { SlideBarFilter } from '~/components/shared'
import { RouteListQuery } from '~/core/dto/activity/route.query'

export default function RouteFilterScreen({
  navigation,
  route: {
    params: { filter },
  },
}: RootScreenProps<'RouteFilter'>) {
  /** hook */
  const { colors } = useTheme()
  const { values, setFieldValue, setValues, submitForm } =
    useFormik<RouteListQuery>({
      initialValues: filter,
      onSubmit: () => {
        navigation.navigate('Home', { filter: values })
      },
    })

  /** memo */
  const initialValues: RouteListQuery = useMemo(
    () => ({
      ...filter,
      sortBy: 'popularity',
      difficultyCodes: [],
      routeTypeCodes: [],
    }),
    [],
  )

  /** function */
  const handleClear = useCallback(() => {
    setValues(initialValues)
  }, [])
  const handleChangeSortBy = useCallback(
    (value: any) => setFieldValue('sortBy', value),
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
  const handleChangeMinRating = useCallback(
    (value: any) => setFieldValue('minRating', value),
    [],
  )
  const handleChangeMinLength = useCallback(
    (value: any) => setFieldValue('minLength', value),
    [],
  )
  const handleChangeMaxLength = useCallback(
    (value: any) => setFieldValue('maxLength', value >= 50 ? undefined : value),
    [],
  )
  const handleChangeMinElvGain = useCallback(
    (value: any) => setFieldValue('minElvGain', value),
    [],
  )
  const handleChangeMaxElvGain = useCallback(
    (value: any) =>
      setFieldValue('maxElvGain', value >= 1500 ? undefined : value),
    [],
  )
  const handleChangeMinHighestPoint = useCallback(
    (value: any) => setFieldValue('minHighestPoint', value),
    [],
  )
  const handleChangeMaxHighestPoint = useCallback(
    (value: any) =>
      setFieldValue('maxHighestPoint', value >= 3000 ? undefined : value),
    [],
  )

  return (
    <View flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='필터' />
      </Appbar.Header>
      <ScrollView>
        <RadioFilter
          title='정렬순서'
          value={values.sortBy}
          onChange={handleChangeSortBy}
          options={sortByOptions}
        />

        <Divider my={10} />

        <CheckboxFilter
          title='루트 유형'
          value={values.routeTypeCodes}
          onChange={handleChangeRouteType}
          options={routeTypeOptions}
        />

        <Divider my={10} />

        <CheckboxFilter
          title='난이도'
          value={values.difficultyCodes}
          onChange={handleChangeDifficulty}
          options={difficultyOptions}
        />

        <Divider my={10} />

        {/* 평점 */}
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

        {/* 루트 거리 */}
        <SlideBarFilter
          title='루트 길이'
          divideCount={50}
          unitText='km'
          leftValue={values.minLength}
          rightValue={values.maxLength || 50}
          leftOnChange={handleChangeMinLength}
          rightOnChange={handleChangeMaxLength}
        />

        <Divider my={10} />

        {/* 누적 오르막 */}
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

        {/* 정상 고도 */}
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
