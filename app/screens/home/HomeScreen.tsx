import { Button, Text, View } from '../../components/styled'
import { Checkbox, List, Searchbar, TouchableRipple } from 'react-native-paper'
import { useCallback, useRef } from 'react'
import globalStyles from '../../utils/style.utils.ts'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '../../components/bottomSheet/BottomSheet.tsx'
import { activities } from './HomeScreen.consts.ts'
import { NameValuePair } from '../../core/types/common.types'
import { useFormik } from 'formik'

const initialLocation = '경기도 파주시'

type SearchForm = {
  searchText: string
  minDistance: number
  maxDistance: number
  activityTypes: string[]
}

const initialValues: SearchForm = {
  searchText: initialLocation,
  minDistance: 0,
  maxDistance: 100,
  activityTypes: [],
}

function HomeScreen() {
  const distanceFilterRef = useRef<BottomSheetModal>(null)
  const activityFilterRef = useRef<BottomSheetModal>(null)
  const difficultyFilterRef = useRef<BottomSheetModal>(null)

  const { values, setFieldValue } = useFormik<SearchForm>({
    initialValues,
    onSubmit: () => {
      console.log('>>', values)
    },
  })

  const onPressActivityItem = useCallback(
    (value: string) => {
      setFieldValue(
        'activityTypes',
        values.activityTypes.includes(value)
          ? values.activityTypes.filter(v => v !== value)
          : [...values.activityTypes, value],
      )
    },
    [values.activityTypes, setFieldValue],
  )

  const showDistanceFilter = useCallback(() => {
    distanceFilterRef?.current?.present()
  }, [])
  const showActivityFilter = useCallback(() => {
    activityFilterRef?.current?.present()
  }, [])
  const showDifficultyFilter = useCallback(() => {
    difficultyFilterRef?.current?.present()
  }, [])

  const checkboxRenderer = (checked: boolean) => (
    <Checkbox status={checked ? 'checked' : 'unchecked'} />
  )

  return (
    <>
      <View flex={1} p={10} gap={8}>
        <Searchbar
          placeholder='검색'
          onChangeText={value => setFieldValue('searchText', value)}
          value={values.searchText}
        />

        <View flexDirection='row' gap={4}>
          <Button
            mode='contained-tonal'
            icon='chevron-down'
            contentStyle={globalStyles.flexReverse}
            onPress={showDistanceFilter}>
            거리
          </Button>
          <Button
            mode='contained-tonal'
            icon='chevron-down'
            onPress={showActivityFilter}
            contentStyle={globalStyles.flexReverse}>
            액티비티
          </Button>
          <Button
            mode='contained-tonal'
            icon='chevron-down'
            onPress={showDifficultyFilter}
            contentStyle={globalStyles.flexReverse}>
            난이도
          </Button>
        </View>
      </View>

      {/* 거리 필터 */}
      <BottomSheet bottomSheetRef={distanceFilterRef}>
        <Text>distanceFilterRef</Text>
      </BottomSheet>

      {/* 액티비티 타입 필터 */}
      <BottomSheet bottomSheetRef={activityFilterRef}>
        <List.Section title='액티비티' titleStyle={{ fontSize: 24 }}>
          {activities.map((activity: NameValuePair) => (
            <TouchableRipple
              onPress={() => onPressActivityItem(activity.value)}
              key={activity.value}>
              <List.Item
                title={activity.name}
                right={() =>
                  checkboxRenderer(
                    values.activityTypes.includes(activity.value),
                  )
                }
              />
            </TouchableRipple>
          ))}
        </List.Section>
      </BottomSheet>

      {/* 난이도 필터 */}
      <BottomSheet bottomSheetRef={difficultyFilterRef}>
        <Text>difficultyFilterRef</Text>
      </BottomSheet>
    </>
  )
}

export default HomeScreen
