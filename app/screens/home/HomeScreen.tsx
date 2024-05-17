import { Button, Chip, ScrollView, View } from '../../components/styled'
import { Checkbox, List, Searchbar, TouchableRipple } from 'react-native-paper'
import { useCallback, useMemo, useRef, useState } from 'react'
import globalStyles from '../../utils/style.utils.ts'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '../../components/bottomSheet/BottomSheet.tsx'
import { activities, difficulties } from './HomeScreen.consts.ts'
import { NameValuePair } from '../../core/types/common.types'
import { useFormik } from 'formik'
import MapArea from '../../components/basic/MapArea.tsx'

const initialLocation = '경기도 파주시'

type FilterType = 'activityTypes' | 'difficulties' | 'other'

type SearchForm = {
  searchText: string
  activityTypes: string[]
  difficulties: string[]
}

const initialValues: SearchForm = {
  searchText: initialLocation,
  activityTypes: [],
  difficulties: [],
}

function HomeScreen() {
  const activityFilterRef = useRef<BottomSheetModal>(null)
  const difficultyFilterRef = useRef<BottomSheetModal>(null)
  const otherFiltersRef = useRef<BottomSheetModal>(null)
  const [searchParams, setSearchParams] = useState<SearchForm>(initialValues)

  const { values, setFieldValue, submitForm } = useFormik<SearchForm>({
    initialValues,
    onSubmit: () => {
      setSearchParams(values)
    },
  })

  /* 공통 ----------------------------------------------------*/
  const showFilterBottomSheet = useCallback((filterType: FilterType) => {
    if (filterType === 'activityTypes') {
      activityFilterRef?.current?.present()
    }
    if (filterType === 'difficulties') {
      difficultyFilterRef?.current?.present()
    }
    if (filterType === 'other') {
      otherFiltersRef?.current?.present()
    }
  }, [])

  const getFilterButtonMode = useCallback(
    (filterType: FilterType): 'outlined' | 'flat' => {
      if (filterType === 'activityTypes') {
        return searchParams.activityTypes.length > 0 ? 'flat' : 'outlined'
      }
      if (filterType === 'difficulties') {
        return searchParams.difficulties.length > 0 ? 'flat' : 'outlined'
      }
      return 'outlined'
    },
    [searchParams.activityTypes, searchParams.difficulties],
  )

  const handleClearFilter = useCallback(
    (filterType: FilterType) => {
      setFieldValue(filterType, [])
    },
    [setFieldValue],
  )

  const handleSubmitFilter = useCallback(
    (filterType: FilterType) => {
      submitForm()
      if (filterType === 'activityTypes') {
        activityFilterRef?.current?.dismiss()
      }
      if (filterType === 'difficulties') {
        difficultyFilterRef?.current?.dismiss()
      }
    },
    [submitForm],
  )

  const handlePressFilterItem = useCallback(
    (filterType: 'activityTypes' | 'difficulties', value: string) => {
      setFieldValue(
        filterType,
        values[filterType].includes(value)
          ? values[filterType].filter(v => v !== value)
          : [...values[filterType], value],
      )
    },
    [setFieldValue, values],
  )

  /* 거리 관련 ------------------------------------------------*/
  /* 액티비티 관련 ---------------------------------------------*/

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

  /* 난이도 관련  ----------------------------------------------*/
  const difficultyButtonText = useMemo(
    () =>
      searchParams.difficulties.length > 0
        ? difficulties
            .filter(a => searchParams.difficulties.includes(a.value))
            .map(v => v.name)
            .join(', ')
        : '난이도',
    [searchParams.difficulties],
  )

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
              <Chip
                icon='chevron-down'
                mode={getFilterButtonMode('activityTypes')}
                alignItems='center'
                maxWidth={150}
                onPress={() => showFilterBottomSheet('activityTypes')}
                justifyContent='center'>
                {activityButtonText}
              </Chip>
              <Chip
                icon='chevron-down'
                mode={getFilterButtonMode('difficulties')}
                alignItems='center'
                maxWidth={150}
                onPress={() => showFilterBottomSheet('difficulties')}
                justifyContent='center'>
                {difficultyButtonText}
              </Chip>
              <Chip
                icon='chevron-down'
                mode={getFilterButtonMode('other')}
                alignItems='center'
                maxWidth={150}
                onPress={() => showFilterBottomSheet('other')}
                justifyContent='center'>
                기타
              </Chip>
            </View>
          </ScrollView>
        </View>
        <MapArea />
      </View>

      {/* 액티비티 타입 필터 */}
      <BottomSheet bottomSheetRef={activityFilterRef} hideIndicator>
        <List.Section
          title='액티비티'
          titleStyle={globalStyles.bottomSheetTitleStyle}>
          {activities.map((activity: NameValuePair) => (
            <TouchableRipple
              onPress={() =>
                handlePressFilterItem('activityTypes', activity.value)
              }
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
          <Button flex={1} onPress={() => handleClearFilter('activityTypes')}>
            클리어
          </Button>
          <Button
            flex={1}
            mode='contained'
            onPress={() => handleSubmitFilter('activityTypes')}>
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
              onPress={() =>
                handlePressFilterItem('difficulties', difficulty.value)
              }
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
          <Button flex={1} onPress={() => handleClearFilter('difficulties')}>
            클리어
          </Button>
          <Button
            flex={1}
            mode='contained'
            onPress={() => handleSubmitFilter('difficulties')}>
            적용
          </Button>
        </View>
      </BottomSheet>

      {/* 기타 필터 */}
      <BottomSheet bottomSheetRef={otherFiltersRef} hideIndicator>
        <List.Section
          title='기타 필터'
          titleStyle={globalStyles.bottomSheetTitleStyle}>
          <Button>123</Button>

          <View p={3} flexDirection='row' justifyContent='flex-end' gap={8}>
            <Button flex={1} onPress={() => handleClearFilter('difficulties')}>
              클리어
            </Button>
            <Button
              flex={1}
              mode='contained'
              onPress={() => handleSubmitFilter('difficulties')}>
              적용
            </Button>
          </View>
        </List.Section>
      </BottomSheet>
    </>
  )
}

export default HomeScreen
