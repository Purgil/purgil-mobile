import { Pressable, ScrollView, Text, View } from '~/components/styled'
import React, { useCallback, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { ExpeditionListQuery } from '~/core/dto/expedition/expedition.query'
import {
  Checkbox,
  FAB,
  Icon,
  Portal,
  RadioButton,
  useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'
import ExpeditionListItem from '~/components/expedition/ExpeditionListItem.tsx'
import {
  expeditions,
  initialExpeditionFilter,
} from '~/screens/social/tabs/Expedition/ExpeditionTab.consts.ts'

type Props = {
  filter: ExpeditionListQuery
}

export default function ExpeditionTab({
  filter = initialExpeditionFilter,
}: Props) {
  /** state */
  const [fabOpened, setFabOpened] = useState(false)

  /** hook */
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()
  const { colors } = useTheme()
  const { values, setFieldValue } = useFormik<ExpeditionListQuery>({
    initialValues: filter,
    onSubmit: () => {},
  })

  /** function */
  const handlePressApplyByMe = useCallback(() => {
    setFieldValue('appliedByMe', !values.appliedByMe)
  }, [values.appliedByMe])
  const handlePressCreatedByMe = useCallback(() => {
    setFieldValue('createdByMe', !values.createdByMe)
  }, [values.createdByMe])

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
    if (filter.minDepartureDate || filter.maxDepartureDate) count++
    return count
  }, [filter])

  const appliedByMeStatus = useMemo(
    () => (values.appliedByMe ? 'checked' : 'unchecked'),
    [values.appliedByMe],
  )
  const createdByMeStatus = useMemo(
    () => (values.createdByMe ? 'checked' : 'unchecked'),
    [values.createdByMe],
  )

  return (
    <>
      <Portal.Host>
        <ScrollView>
          <View
            flexDirection='row'
            px={2}
            pt={2}
            justifyContent='space-between'>
            <View flexDirection='row' gap={20}>
              <View flexDirection='row' alignItems='center' gap={5}>
                <Text my={2}>최신순</Text>
                <Icon size={18} source='sort' />
              </View>
            </View>
            <Pressable
              flexDirection='row'
              alignItems='center'
              px={13}
              gap={4}
              border={1}
              borderRadius={20}
              onPress={() =>
                navigation.navigate('ExpeditionFilter', { filter })
              }
              borderColor={colors.outline}>
              {filterCount > 0 && (
                <Text color={colors.primary} fontWeight='bold'>
                  {filterCount}
                </Text>
              )}
              <Icon size={16} source='tune-variant' />
            </Pressable>
          </View>

          <View flexDirection='row' justifyContent='flex-end' pr={15} pb={10}>
            <Pressable
              flexDirection='row'
              alignItems='center'
              onPress={handlePressApplyByMe}>
              <Checkbox status={appliedByMeStatus} />
              <Text>내 신청 목록</Text>
            </Pressable>
            <Pressable
              flexDirection='row'
              alignItems='center'
              onPress={handlePressCreatedByMe}>
              <Checkbox status={createdByMeStatus} />
              <Text>내 원정대</Text>
            </Pressable>
          </View>

          <View gap={10} px={2} pb={10}>
            {expeditions.map(expedition => (
              <ExpeditionListItem key={expedition.id} expedition={expedition} />
            ))}
          </View>
        </ScrollView>
      </Portal.Host>

      <FAB.Group
        open={fabOpened}
        visible
        icon={fabOpened ? 'close' : 'plus'}
        actions={[
          {
            icon: 'plus-box',
            label: '새 원정대 만들기',
            onPress: () =>
              navigation.navigate('CreateExpedition', {
                route: undefined,
              }),
          },
        ]}
        onStateChange={() => setFabOpened(!fabOpened)}
      />
    </>
  )
}
