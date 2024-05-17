import { Button, ScrollView, Text, View } from '../../components/styled'
import {
  Checkbox,
  List,
  Searchbar,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
import { useCallback, useMemo, useRef, useState } from 'react'
import globalStyles from '../../utils/style.utils.ts'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '../../components/bottomSheet/BottomSheet.tsx'
import { activities, difficulties } from './HomeScreen.consts.ts'
import { NameValuePair } from '../../core/types/common.types'
import { useFormik } from 'formik'
import MapArea from '../../components/basic/MapArea.tsx'

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
  maxDistance: 0,
  activityTypes: [],
  difficulties: [],
}

function HomeScreen() {
  const distanceFilterRef = useRef<BottomSheetModal>(null)
  const activityFilterRef = useRef<BottomSheetModal>(null)
  const difficultyFilterRef = useRef<BottomSheetModal>(null)
  const [searchParams, setSearchParams] = useState<SearchForm>(initialValues)

  const { values, setFieldValue, submitForm } = useFormik<SearchForm>({
    initialValues,
    onSubmit: () => {
      setSearchParams(values)
    },
  })

  /* 공통 ----------------------------------------------------*/
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

  const getFilterButtonMode = useCallback(
    (filterType: FilterType): 'outlined' | 'contained-tonal' => {
      if (filterType === 'distance') {
        return searchParams.maxDistance || searchParams.minDistance
          ? 'contained-tonal'
          : 'outlined'
      }
      if (filterType === 'activity') {
        return searchParams.activityTypes.length > 0
          ? 'contained-tonal'
          : 'outlined'
      }
      if (filterType === 'difficulty') {
        return searchParams.difficulties.length > 0
          ? 'contained-tonal'
          : 'outlined'
      }
      return 'outlined'
    },
    [
      searchParams.maxDistance,
      searchParams.minDistance,
      searchParams.activityTypes,
      searchParams.difficulties,
    ],
  )

  const handleClearFilter = useCallback(
    (filterType: FilterType) => {
      if (filterType === 'activity') {
        setFieldValue('activityTypes', [])
      }
    },
    [setFieldValue],
  )

  const handleSubmitFilter = useCallback(
    (filterType: FilterType) => {
      submitForm()
      if (filterType === 'activity') {
        activityFilterRef?.current?.dismiss()
      }
      if (filterType === 'distance') {
        distanceFilterRef?.current?.dismiss()
      }
      if (filterType === 'difficulty') {
        difficultyFilterRef?.current?.dismiss()
      }
    },
    [submitForm],
  )

  /* 액티비티 관련 ---------------------------------------------*/
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

  /* 거리 관련 ------------------------------------------------*/
  /* 난이도 관련  ----------------------------------------------*/

  const checkboxRenderer = (checked: boolean) => (
    <Checkbox status={checked ? 'checked' : 'unchecked'} />
  )

  return (
    <>
      <View flex={1}>
        <View p={10} gap={8}>
          <Searchbar
            placeholder='검색'
            onChangeText={value => setFieldValue('searchText', value)}
            value={values.searchText}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View flexDirection='row' gap={5}>
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
              <Button
                mode={getFilterButtonMode('difficulty')}
                icon='chevron-down'
                onPress={() => showFilterBottomSheet('difficulty')}
                contentStyle={globalStyles.flexReverse}>
                기타
              </Button>
            </View>
          </ScrollView>
        </View>
        <MapArea />
      </View>

      {/* 거리 필터 */}
      <BottomSheet bottomSheetRef={distanceFilterRef} hideIndicator>
        <Text>distanceFilterRef</Text>
      </BottomSheet>

      {/* 액티비티 타입 필터 */}
      <BottomSheet bottomSheetRef={activityFilterRef} hideIndicator>
        <List.Section
          title='액티비티'
          titleStyle={globalStyles.bottomSheetTitleStyle}>
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
        <View p={3} flexDirection='row' justifyContent='flex-end' gap={8}>
          <Button onPress={() => handleClearFilter('activity')}>클리어</Button>
          <Button
            mode='contained'
            onPress={() => handleSubmitFilter('activity')}>
            적용
          </Button>
        </View>
      </BottomSheet>

      {/* 난이도 필터 */}
      <BottomSheet bottomSheetRef={difficultyFilterRef} hideIndicator>
        <List.Section
          title='난이도'
          titleStyle={globalStyles.bottomSheetTitleStyle}>
          {difficulties.map((difficulty: NameValuePair) => (
            <TouchableRipple
              onPress={() => onPressActivityItem(difficulty.value)}
              key={difficulty.value}>
              <List.Item
                title={difficulty.name}
                right={() =>
                  checkboxRenderer(
                    values.difficulties.includes(difficulty.value),
                  )
                }
              />
            </TouchableRipple>
          ))}
        </List.Section>
        <View p={3} flexDirection='row' justifyContent='flex-end' gap={8}>
          <Button onPress={() => handleClearFilter('activity')}>클리어</Button>
          <Button
            mode='contained'
            onPress={() => handleSubmitFilter('activity')}>
            적용
          </Button>
        </View>
      </BottomSheet>
    </>
  )
}

export default HomeScreen
