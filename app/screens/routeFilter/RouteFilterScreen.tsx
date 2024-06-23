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
import { AdventureListReqDto } from '~/core/dto/adventure/adventure.req-dto'
import RadioFilter from '~/components/shared/filter/RadioFilter/RadioFilter.tsx'
import { SlideBar } from '~/components/shared'
import ListSubheader from 'react-native-paper/src/components/List/ListSubheader.tsx'

export default function RouteFilterScreen({
  navigation,
  route: {
    params: { filter },
  },
}: RootScreenProps<'RouteFilter'>) {
  /** hook */
  const { colors } = useTheme()
  const { values, setFieldValue, setValues, submitForm } =
    useFormik<AdventureListReqDto>({
      initialValues: filter,
      onSubmit: () => {
        navigation.navigate('Home', { filter: values })
      },
    })

  /** memo */
  const initialValues: AdventureListReqDto = useMemo(
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

  const getDistanceSlideRightLabel = useCallback(
    (num: number) => (num === 50 ? '50+ km' : `${num} km`),
    [],
  )

  const getElvGainSlideRightLabel = useCallback(
    (num: number) => (num === 1500 ? '1,500+ m' : `${num} m`),
    [],
  )

  const getHighestPointSlideRightLabel = useCallback(
    (num: number) => (num === 3000 ? '3,000+ m' : `${num} m`),
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
          onChange={(value: any) => setFieldValue('sortBy', value)}
          options={sortByOptions}
        />

        <Divider my={10} />

        <CheckboxFilter
          title='루트 유형'
          value={values.routeTypeCodes}
          onChange={(value: any) => setFieldValue('routeTypeCodes', value)}
          options={routeTypeOptions}
        />

        <Divider my={10} />

        <CheckboxFilter
          title='난이도'
          value={values.difficultyCodes}
          onChange={(value: any) => setFieldValue('difficultyCodes', value)}
          options={difficultyOptions}
        />

        <Divider my={10} />

        {/* 루트 거리 */}
        <View py={10}>
          <ListSubheader>총 길이</ListSubheader>
          <SlideBar
            divideCount={50}
            leftLabel={num => `${num} km`}
            rightLabel={getDistanceSlideRightLabel}
            leftValue={values.minLength}
            rightValue={values.maxLength}
            leftOnChange={value => setFieldValue('minLength', value)}
            rightOnChange={value => setFieldValue('maxLength', value)}
          />
        </View>

        <Divider my={10} />

        {/* 누적 오르막 */}
        <View py={10}>
          <ListSubheader>누적 오르막</ListSubheader>
          <SlideBar
            divideCount={15}
            multiply={100}
            leftLabel={num => `${num} m`}
            rightLabel={getElvGainSlideRightLabel}
            leftValue={values.minElvGain}
            rightValue={values.maxElvGain}
            leftOnChange={value => setFieldValue('minElvGain', value)}
            rightOnChange={value => setFieldValue('maxElvGain', value)}
          />
        </View>

        <Divider my={10} />

        {/* 평점 */}
        {/*        <View py={10}>
          <ListSubheader>평점</ListSubheader>
          <SlideBar
            divideCount={15}
            leftLabel={num => `${num * 100} m`}
            rightLabel={getElvGainSlideRightLabel}
            leftValue={values.minElvGain}
            rightValue={values.maxElvGain}
            leftOnChange={value => setFieldValue('minElvGain', value)}
            rightOnChange={value => setFieldValue('maxElvGain', value)}
          />
        </View>*/}

        {/* 정상 고도 */}
        <View py={10}>
          <ListSubheader>정상 고도</ListSubheader>
          <SlideBar
            divideCount={30}
            multiply={100}
            leftLabel={num => `${num} m`}
            rightLabel={getHighestPointSlideRightLabel}
            leftValue={values.minHighestPoint}
            rightValue={values.maxHighestPoint}
            leftOnChange={value => setFieldValue('minHighestPoint', value)}
            rightOnChange={value => setFieldValue('maxHighestPoint', value)}
          />
        </View>
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
