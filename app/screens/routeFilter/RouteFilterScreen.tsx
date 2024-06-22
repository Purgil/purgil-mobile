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

  const handleClear = useCallback(() => {
    setValues(initialValues)
  }, [])

  return (
    <View flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='필터' />
      </Appbar.Header>
      <ScrollView>
        <Divider my={10} />

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
        {/* 누적 오르막 */}
        {/* 평점 */}
        {/* 정상 고도 */}
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
