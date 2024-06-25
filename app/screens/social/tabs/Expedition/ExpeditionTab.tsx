import {
  Chip,
  Pressable,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import React, { useState } from 'react'
import { FilterChip } from '~/components/shared'
import { adventureTypeOptions } from '~/screens/home/HomeScreen.consts.ts'
import { useFormik } from 'formik'
import { ExpeditionListReqDto } from '~/core/dto/expedition/expedition.req-dto'
import { Icon, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'

const initialValues: ExpeditionListReqDto = {
  adventureTypeCodes: [],
}

type Props = {
  filter: ExpeditionListReqDto
}

export default function ExpeditionTab({ filter }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()
  const { colors } = useTheme()
  const { values, setFieldValue } = useFormik<ExpeditionListReqDto>({
    initialValues,
    onSubmit: () => {},
  })

  return (
    <View>
      <View flexDirection='row' p={2} justifyContent='space-between'>
        <View flexDirection='row' alignItems='center' gap={3}>
          <Text my={2}>최신순</Text>
          <Icon size={18} source='sort' />
        </View>
        {/* <FilterChip
          defaultLabel='탐험 유형'
          labelType='icon'
          value={values.adventureTypeCodes}
          onChange={value => setFieldValue('adventureTypeCodes', value)}
          options={adventureTypeOptions}
        /> */}
        <Pressable
          flexDirection='row'
          alignItems='center'
          px={13}
          gap={4}
          border={1}
          borderRadius={20}
          onPress={() => navigation.navigate('ExpeditionFilter', { filter })}
          borderColor={colors.outline}>
          {/*          {filterCount > 0 && (
            <Text color={colors.primary} fontWeight='bold'>
              {filterCount}
            </Text>
          )}*/}
          <Icon size={16} source='tune-variant' />
        </Pressable>
      </View>
    </View>
  )
}
