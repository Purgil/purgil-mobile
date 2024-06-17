import { Divider, ScrollView, Text, View } from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootScreenProps } from '~/navigation/types.ts'
import React, { memo } from 'react'
import CheckboxFilter from '~/components/basic/CheckboxFilter/CheckboxFilter.tsx'
import { useFormik } from 'formik'
import {
  adventureTypes,
  difficultyTypes,
  routeTypes,
} from '~/screens/home/HomeScreen.consts.ts'

type FormValues = {
  adventureTypes: string[]
  difficulties: string[]
  routeTypes: string[]
}

const initialValues: FormValues = {
  adventureTypes: [],
  difficulties: [],
  routeTypes: [],
}

export default function RouteFilterScreen({
  navigation,
}: RootScreenProps<'RouteFilter'>) {
  /** hook */
  const { colors } = useTheme()
  const { values, setFieldValue } = useFormik<FormValues>({
    initialValues,
    onSubmit: () => {},
  })

  return (
    <ScrollView flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='필터' />
      </Appbar.Header>

      <CheckboxFilter
        title='탐험 유형'
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
  )
}
