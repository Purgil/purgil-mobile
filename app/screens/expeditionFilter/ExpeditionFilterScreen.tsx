import { ScrollView, Text, View } from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootScreenProps } from '~/router/types.ts'
import React from 'react'
import RadioFilter from '~/components/shared/filter/RadioFilter/RadioFilter.tsx'
import { sortByOptions } from '~/screens/home/HomeScreen.consts.ts'
import { useFormik } from 'formik'
import { ExpeditionListReqDto } from '~/core/dto/expedition/expedition.req-dto'

export function ExpeditionFilterScreen({
  navigation,
  route: {
    params: { filter },
  },
}: RootScreenProps<'ExpeditionFilter'>) {
  const { colors } = useTheme()

  const { values, setFieldValue, setValues, submitForm } =
    useFormik<ExpeditionListReqDto>({
      initialValues: filter,
      onSubmit: () => {
        navigation.navigate('Social')
        // navigation.navigate('Social', { filter: values })
      },
    })

  return (
    <View flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='필터' />
      </Appbar.Header>
      <ScrollView>
        {/*<RadioFilter*/}
        {/*  title='정렬순서'*/}
        {/*  value={values.sortBy}*/}
        {/*  onChange={(value: any) => setFieldValue('sortBy', value)}*/}
        {/*  options={sortByOptions}*/}
        {/*/>*/}
      </ScrollView>
    </View>
  )
}
