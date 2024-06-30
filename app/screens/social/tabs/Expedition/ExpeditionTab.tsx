import { Pressable, ScrollView, Text, View } from '~/components/styled'
import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import { ExpeditionListReqDto } from '~/core/dto/expedition/expedition.req-dto'
import { Icon, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'
import ExpeditionListItem from '~/components/expedition/ExpeditionListItem.tsx'
import {
  expeditions,
  initialExpeditionFilter,
} from '~/screens/social/tabs/Expedition/ExpeditionTab.consts.ts'

type Props = {
  filter: ExpeditionListReqDto
}

export default function ExpeditionTab({
  filter = initialExpeditionFilter,
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()
  const { colors } = useTheme()
  const { values, setFieldValue } = useFormik<ExpeditionListReqDto>({
    initialValues: filter,
    onSubmit: () => {},
  })

  /** memo */
  const filterCount = useMemo(() => {
    let count = 0
    if (filter.adventureTypeCodes.length) count++
    if (filter.routeTypeCodes.length) count++
    if (filter.difficultyCodes.length) count++
    if (filter.minLength || filter.maxLength) count++
    if (filter.minElvGain || filter.maxElvGain) count++
    if (filter.minHighestPoint || filter.maxHighestPoint) count++
    if (filter.minRating) count++
    if ((filter.minAge && filter.minAge > 10) || filter.maxAge) count++
    if (
      (filter.minParticipantCount && filter.minParticipantCount > 1) ||
      filter.maxParticipantCount
    )
      count++
    return count
  }, [filter])

  return (
    <ScrollView>
      <View flexDirection='row' p={2} justifyContent='space-between'>
        <View flexDirection='row' alignItems='center' gap={3}>
          <Text my={2}>최신순</Text>
          <Icon size={18} source='sort' />
        </View>
        <Pressable
          flexDirection='row'
          alignItems='center'
          px={13}
          gap={4}
          border={1}
          borderRadius={20}
          onPress={() => navigation.navigate('ExpeditionFilter', { filter })}
          borderColor={colors.outline}>
          {filterCount > 0 && (
            <Text color={colors.primary} fontWeight='bold'>
              {filterCount}
            </Text>
          )}
          <Icon size={16} source='tune-variant' />
        </Pressable>
      </View>

      <View gap={10} px={2} pb={10}>
        {expeditions.map(expedition => (
          <ExpeditionListItem key={expedition.id} expedition={expedition} />
        ))}
      </View>
    </ScrollView>
  )
}
