import {
  Button,
  Divider,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
} from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootScreenProps } from '~/router/types.ts'
import { CreateExpeditionCommend } from '~/core/dto/expedition/expedition.commend'
import { useFormik } from 'formik'
import ListSubheader from 'react-native-paper/src/components/List/ListSubheader.tsx'
import React, { useCallback, useEffect, useState } from 'react'
import { DatetimePicker } from '~/components/shared'
import SelectedRoute from '~/screens/createExpedition/components/SelectedRoute.tsx'
import RequiredInputLabel from '~/components/shared/input/RequiredInputLabel.tsx'

const initialValues: CreateExpeditionCommend = {
  title: '',
  description: '',
  departureDatetime: undefined,
  minAge: undefined,
  maxAge: undefined,
  maxParticipantCount: undefined,
  routeId: undefined,
  applyDeadlineDatetime: undefined,
}

export default function CreateExpeditionScreen({
  navigation,
  route: {
    params: { route },
  },
}: RootScreenProps<'CreateExpedition'>) {
  /** hook */
  const { colors } = useTheme()
  const { values, setFieldValue } = useFormik<CreateExpeditionCommend>({
    initialValues,
    onSubmit: () => {},
  })

  /** render */
  const renderRouteArea = useCallback(
    () =>
      route ? (
        <SelectedRoute route={route} />
      ) : (
        <Button
          mode='contained-tonal'
          onPress={() => navigation.navigate('SearchRoute')}>
          루트 선택
        </Button>
      ),
    [route],
  )

  return (
    <View flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='새 원정대' />
      </Appbar.Header>

      <View flex={1} justifyContent='space-between' pb={10} gap={10}>
        <KeyboardAvoidingView>
          <ScrollView gap={10}>
            <View>
              <ListSubheader>루트 선택</ListSubheader>
              <View px={12}>{renderRouteArea()}</View>
            </View>

            <Divider my={2} />

            <View>
              <ListSubheader>원정대 상세 정보</ListSubheader>
              <View px={15} gap={10}>
                <TextInput
                  label={<RequiredInputLabel label='원정대 제목' />}
                  mode='outlined'
                  value={values.title}
                  onChangeText={text => setFieldValue('title', text)}
                />
                <TextInput
                  label='원정대 설명'
                  mode='outlined'
                  value={values.description}
                  onChangeText={text => setFieldValue('description', text)}
                  multiline
                  numberOfLines={4}
                />
                <View flexDirection='row' gap={10}>
                  <TextInput
                    flex={1}
                    label='최소 연령'
                    mode='outlined'
                    inputMode='numeric'
                  />
                  <TextInput
                    flex={1}
                    label='최대 연령'
                    mode='outlined'
                    inputMode='numeric'
                  />
                </View>
                <DatetimePicker
                  label={<RequiredInputLabel label='출발 시간' />}
                  value={values.departureDatetime}
                  mode='datetime'
                  onChange={value => setFieldValue('departureDatetime', value)}
                />
                <DatetimePicker
                  label={<RequiredInputLabel label='모집 마감 시간' />}
                  value={values.applyDeadlineDatetime}
                  mode='datetime'
                  onChange={value =>
                    setFieldValue('applyDeadlineDatetime', value)
                  }
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View px={12}>
          <Button mode='contained' disabled>
            생성하기
          </Button>
        </View>
      </View>
    </View>
  )
}
