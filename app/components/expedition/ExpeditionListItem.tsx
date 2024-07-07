import { memo, useCallback, useMemo, useState } from 'react'
import {
  Avatar,
  Button,
  Icon,
  IconButton,
  Surface,
  Text,
  TouchableRipple,
  View,
} from '~/components/styled'
import { Portal, Snackbar, useTheme } from 'react-native-paper'
import { ListActionSheet } from '~/components/shared'
import { ExpeditionListData } from '~/core/dto/expedition/expedition.data'
import { UserData } from '~/core/dto/user/user.data'
import dayjs from 'dayjs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'
import { ScreenPropsMap } from '~/router/types.ts'

type Props = {
  expedition: ExpeditionListData
}

function ExpeditionListItem({ expedition }: Props) {
  /** state */
  const [reportActionSheetVisible, setReportActionSheetVisible] =
    useState(false)
  const [descriptionFolded, setDescriptionFolded] = useState(
    expedition.description.length > 500,
  )
  const [snackbarStatus, setSnackbarStatus] = useState({
    apply: false,
    cancel: false,
  })
  const [applied, setApplied] = useState(false)

  /** hook */
  const { colors, animation } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<ScreenPropsMap>>()

  /** memo */
  const applyButtonColor = useMemo(
    () => (applied ? colors.surfaceDisabled : colors.surfaceVariant),
    [applied],
  )
  const applyButtonTextColor = useMemo(
    () => (applied ? colors.onSurfaceDisabled : colors.onSurfaceVariant),
    [applied],
  )
  const applyButtonLabel = useMemo(
    () => (applied ? '신청 취소' : '참가 신청'),
    [applied],
  )

  /** function */
  const handleDescriptionUnfold = useCallback(() => {
    setDescriptionFolded(false)
  }, [])

  const handleJoinExpedition = useCallback(() => {
    setApplied(prevState => {
      if (prevState) setSnackbarStatus({ apply: false, cancel: true })
      else setSnackbarStatus({ apply: true, cancel: false })
      return !prevState
    })
  }, [])

  const getApplyDeadlineText = useCallback(
    (deadline: string) => dayjs(deadline).format('M월 d일 h시 m분'),
    [],
  )

  const navigateToExpeditionDetail = useCallback(() => {
    navigation.navigate('ExpeditionDetail', { expedition })
  }, [])

  return (
    <>
      <Surface elevation={2} borderRadius={10}>
        <View
          p={10}
          pb={0}
          flexDirection='row'
          justifyContent='space-between'
          mb={1}>
          <Avatar
            user={expedition.leader as unknown as UserData}
            size={30}
            underNickname='3분 전'
            nicknameDisplayType='right'
          />
          <View
            flexDirection='row'
            alignItems='center'
            gap={3}
            justifyContent='space-around'>
            <Icon size={20} source='bike' color={colors.primary} />
            <IconButton
              icon='dots-vertical'
              size={18}
              m={0}
              onPress={() => setReportActionSheetVisible(true)}
            />
          </View>
        </View>

        <TouchableRipple p={10} onPress={navigateToExpeditionDetail}>
          <>
            <View flexDirection='row' gap={5}>
              <Text mb={1} fontSize={17}>
                {expedition.title}
              </Text>
            </View>

            <View gap={2}>
              <Text
                mb={1}
                fontSize={14}
                color={colors.onSurfaceVariant}
                numberOfLines={descriptionFolded ? 1 : undefined}>
                {expedition.description}
              </Text>
              {descriptionFolded && (
                <Text
                  textAlign='right'
                  onPress={handleDescriptionUnfold}
                  pr={10}
                  fontWeight='bold'
                  color={colors.onSurfaceDisabled}>
                  자세히보기
                </Text>
              )}
            </View>

            <View my={15} gap={15}>
              <View flexDirection='row'>
                <View
                  flex={1}
                  alignItems='center'
                  borderRightWidth={1}
                  borderColor={colors.elevation.level4}>
                  <Text fontSize={13} color={colors.onSurfaceDisabled}>
                    출발
                  </Text>
                  <Text fontSize={13} color={colors.onSurface}>
                    9월 5일 14시 0분
                  </Text>
                </View>

                <View flex={1} alignItems='center'>
                  <Text fontSize={13} color={colors.onSurfaceDisabled}>
                    모집마감
                  </Text>
                  <Text fontSize={13} color={colors.onSurface}>
                    {getApplyDeadlineText(expedition.applyDeadlineDatetime)}
                  </Text>
                </View>
              </View>

              <View flexDirection='row'>
                <View
                  flex={1}
                  alignItems='center'
                  borderRightWidth={1}
                  borderColor={colors.elevation.level4}>
                  <Text fontSize={13} color={colors.onSurfaceDisabled}>
                    나이제한
                  </Text>
                  <Text fontSize={13} color={colors.onSurface}>
                    20세 ~ 60세
                  </Text>
                </View>

                <View flex={1} alignItems='center'>
                  <Text fontSize={13} color={colors.onSurfaceDisabled}>
                    모집현황
                  </Text>
                  <Text fontSize={13} color={colors.onSurface}>
                    10명 / 15명
                  </Text>
                </View>
              </View>
            </View>
          </>
        </TouchableRipple>

        <View
          p={10}
          pt={0}
          flexDirection='row'
          justifyContent='space-between'
          alignItems='flex-end'>
          <View flexDirection='row' mb={1} gap={5}>
            <Text color={colors.primary} fontSize={13}>
              {expedition.route.name}
            </Text>
            <Text
              color={colors.onSurfaceDisabled}
              fontSize={12}
              fontWeight='bold'>
              · 서울시 송파구
            </Text>
          </View>
          <Button
            mode='contained'
            onPress={handleJoinExpedition}
            textColor={applyButtonTextColor}
            buttonColor={applyButtonColor}>
            {applyButtonLabel}
          </Button>
        </View>
      </Surface>

      {reportActionSheetVisible && (
        <ListActionSheet
          list={[
            {
              title: '부적절한 원정대 신고 및 차단하기',
              onPress: () => {},
              mode: 'error',
            },
          ]}
          onClose={() => setReportActionSheetVisible(false)}
        />
      )}

      <Portal>
        <Snackbar
          visible={snackbarStatus.apply}
          onDismiss={() =>
            setSnackbarStatus(prevState => ({ ...prevState, apply: false }))
          }
          duration={2000}>
          원정대에 참가 신청되었습니다.
        </Snackbar>

        <Snackbar
          visible={snackbarStatus.cancel}
          onDismiss={() =>
            setSnackbarStatus(prevState => ({ ...prevState, cancel: false }))
          }
          duration={2000}>
          원정대 참가 신청이 취소되었습니다.
        </Snackbar>
      </Portal>
    </>
  )
}

export default memo(ExpeditionListItem)
