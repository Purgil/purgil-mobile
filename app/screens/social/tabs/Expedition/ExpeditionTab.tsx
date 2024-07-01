import { Pressable, ScrollView, Text, View } from '~/components/styled'
import React, { useMemo, useState } from 'react'
import { useFormik } from 'formik'
import { ExpeditionListReqDto } from '~/core/dto/expedition/expedition.req-dto'
import { FAB, Icon, Portal, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'
import ExpeditionListItem from '~/components/expedition/ExpeditionListItem.tsx'
import {
  expeditions,
  initialExpeditionFilter,
} from '~/screens/social/tabs/Expedition/ExpeditionTab.consts.ts'
import PortalHost from 'react-native-paper/lib/typescript/components/Portal/PortalHost'

type Props = {
  filter: ExpeditionListReqDto
}

export default function ExpeditionTab({
  filter = initialExpeditionFilter,
}: Props) {
  /** state */
  const [fabOpened, setFabOpened] = useState(false)

  /** hook */
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
    if (filter.minDepartureDate || filter.maxDepartureDate) count++
    return count
  }, [filter])

  return (
    <>
      <Portal.Host>
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
            icon: 'post-outline',
            label: '원정대 생성하기',
            onPress: () => navigation.navigate('CreatePost'),
          },
          {
            icon: 'image-outline',
            label: '참가 신청한 원정대',
            onPress: () =>
              navigation.navigate('ImgUpload', {
                maxCount: 10,
                targetScreen: 'CreatePost',
              }),
          },
        ]}
        onStateChange={() => setFabOpened(!fabOpened)}
      />
    </>
  )
}
