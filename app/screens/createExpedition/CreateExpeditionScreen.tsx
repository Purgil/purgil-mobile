import { Button, Divider, Text, TextInput, View } from '~/components/styled'
import { Appbar, useTheme } from 'react-native-paper'
import { RootScreenProps } from '~/router/types.ts'
import { CreateExpeditionReqDto } from '~/core/dto/expedition/expedition.req-dto'
import { useFormik } from 'formik'
import ListSubheader from 'react-native-paper/src/components/List/ListSubheader.tsx'
import React from 'react'
import { DatetimePicker } from '~/components/shared'

const initialValues: CreateExpeditionReqDto = {
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
}: RootScreenProps<'CreateExpedition'>) {
  const { colors } = useTheme()
  const { values, setFieldValue } = useFormik<CreateExpeditionReqDto>({
    initialValues,
    onSubmit: () => {},
  })

  return (
    <View flex={1} bg={colors.background}>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title='새 원정대' />
      </Appbar.Header>

      <View flex={1} justifyContent='space-between' pb={10}>
        <View p={12} gap={10}>
          <Button
            mode='elevated'
            onPress={() => navigation.navigate('SearchRoute')}>
            루트 선택
          </Button>

          <Divider my={2} />

          <TextInput
            label='원정대 제목'
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
            label='출발 시간'
            value={values.departureDatetime}
            mode='datetime'
            onChange={value => setFieldValue('departureDatetime', value)}
          />
          <DatetimePicker
            label='모집 마감 시간'
            value={values.applyDeadlineDatetime}
            mode='datetime'
            onChange={value => setFieldValue('applyDeadlineDatetime', value)}
          />
        </View>
        <Button mode='contained' disabled>
          생성하기
        </Button>
      </View>
    </View>
  )
}
