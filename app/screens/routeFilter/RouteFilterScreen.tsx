import { Button, Divider, ScrollView, Text, View } from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import React, { useCallback } from 'react'
import CheckboxFilter from '~/components/shared/filter/CheckboxFilter/CheckboxFilter.tsx'
import { useFormik } from 'formik'
import {
  adventureTypes,
  difficultyTypes,
  routeTypes,
} from '~/screens/home/HomeScreen.consts.ts'
import { RootScreenProps } from '~/router/types.ts'
import { AdventureListReqDto } from '~/core/dto/adventure/adventure.reqDto'
import RadioFilter from '~/components/shared/filter/RadioFilter/RadioFilter.tsx'

const initialValues: AdventureListReqDto = {
  adventureTypeCode: 'bike',
  difficultyCodes: [],
  routeTypeCodes: [],
}

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
        <RadioFilter
          title='탐험 유형'
          foldable
          value={values.adventureTypes}
          onChange={(value: any) => setFieldValue('adventureTypes', value)}
          options={adventureTypes}
        />

        <Divider my={10} />

        <CheckboxFilter
          title='루트 유형'
          value={values.routeTypes}
          onChange={(value: any) => setFieldValue('routeTypes', value)}
          options={routeTypes}
        />

        <Divider my={10} />

        <CheckboxFilter
          title='난이도'
          value={values.difficulties}
          onChange={(value: any) => setFieldValue('difficulties', value)}
          options={difficultyTypes}
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
