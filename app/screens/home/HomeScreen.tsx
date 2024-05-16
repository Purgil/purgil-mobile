import { Button, ScrollView, Text, View } from '../../components/styled'
import { Checkbox, List, Searchbar, TouchableRipple } from 'react-native-paper'
import { useCallback, useMemo, useRef, useState } from 'react'
import globalStyles from '../../utils/style.utils.ts'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '../../components/bottomSheet/BottomSheet.tsx'
import { activities } from './HomeScreen.consts.ts'
import { NameValuePair } from '../../core/types/common.types'
import { useFormik } from 'formik'

const initialLocation = '경기도 파주시'

type FilterType = 'distance' | 'activity' | 'difficulty'

type SearchForm = {
  searchText: string
  minDistance: number
  maxDistance: number
  activityTypes: string[]
  difficulties: string[]
}

const initialValues: SearchForm = {
  searchText: initialLocation,
  minDistance: 0,
  maxDistance: 100,
  activityTypes: [],
  difficulties: [],
}

function HomeScreen() {
  const distanceFilterRef = useRef<BottomSheetModal>(null)
  const activityFilterRef = useRef<BottomSheetModal>(null)
  const difficultyFilterRef = useRef<BottomSheetModal>(null)

  const [searchParams, setSearchParams] = useState<SearchForm>(initialValues)

  const { values, setFieldValue } = useFormik<SearchForm>({
    initialValues,
    onSubmit: () => {
      setSearchParams(values)
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

  const showFilterBottomSheet = useCallback((filterType: FilterType) => {
    if (filterType === 'distance') {
      distanceFilterRef?.current?.present()
    }
    if (filterType === 'activity') {
      activityFilterRef?.current?.present()
    }
    if (filterType === 'difficulty') {
      difficultyFilterRef?.current?.present()
    }
  }, [])

  const activityButtonText = useMemo(
    () =>
      searchParams.activityTypes.length > 0
        ? activities
            .filter(a => searchParams.activityTypes.includes(a.value))
            .map(v => v.name)
            .join(', ')
        : '액티비티',
    [searchParams.activityTypes],
  )

  const getFilterButtonMode = useCallback(
    (filterType: FilterType): 'contained' | 'contained-tonal' => {
      if (filterType === 'distance') {
        return searchParams.maxDistance || searchParams.minDistance
          ? 'contained'
          : 'contained-tonal'
      }
      if (filterType === 'activity') {
        return searchParams.activityTypes.length > 0
          ? 'contained'
          : 'contained-tonal'
      }
      if (filterType === 'difficulty') {
        return searchParams.difficulties.length > 0
          ? 'contained'
          : 'contained-tonal'
      }
      return 'contained-tonal'
    },
    [
      searchParams.maxDistance,
      searchParams.minDistance,
      searchParams.activityTypes,
      searchParams.difficulties,
    ],
  )

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
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Button
              mode={getFilterButtonMode('distance')}
              icon='chevron-down'
              contentStyle={globalStyles.flexReverse}
              onPress={() => showFilterBottomSheet('distance')}>
              거리
            </Button>
            <Button
              maxWidth={150}
              mode={getFilterButtonMode('activity')}
              icon='chevron-down'
              onPress={() => showFilterBottomSheet('activity')}
              contentStyle={globalStyles.flexReverse}>
              {activityButtonText}
            </Button>
            <Button
              mode={getFilterButtonMode('difficulty')}
              icon='chevron-down'
              onPress={() => showFilterBottomSheet('difficulty')}
              contentStyle={globalStyles.flexReverse}>
              난이도
            </Button>
          </ScrollView>
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
        <Button>클리어</Button>
        <Button>적용</Button>
      </BottomSheet>

      {/* 난이도 필터 */}
      <BottomSheet bottomSheetRef={difficultyFilterRef}>
        <Text>difficultyFilterRef</Text>
      </BottomSheet>
    </>
  )
}

export default HomeScreen
