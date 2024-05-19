import { Button, Chip, ScrollView, View } from '../../components/styled'
import { List, Searchbar } from 'react-native-paper'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import globalStyles from '../../utils/style.utils.ts'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import BottomSheet from '../../components/basic/BottomSheet.tsx'
import { courseTypes, courses, difficultyTypes } from './HomeScreen.consts.ts'
import { useFormik } from 'formik'
import MapArea from '../../components/basic/MapArea.tsx'
import ChkboxBottomSheet from '../../components/basic/ChkboxBottomSheet.tsx'
import Courses from '../../components/cource/Courses.tsx'

const initialLocation = '경기도 파주시'

type FilterType = 'courseTypes' | 'difficulties' | 'other'

type SearchForm = {
  searchText: string
  courseTypes: string[]
  difficulties: string[]
}

const initialValues: SearchForm = {
  searchText: initialLocation,
  courseTypes: [],
  difficulties: [],
}

function HomeScreen() {
  const courseTypeFilterRef = useRef<BottomSheetModal>(null)
  const difficultyFilterRef = useRef<BottomSheetModal>(null)
  const otherFiltersRef = useRef<BottomSheetModal>(null)
  const routesRef = useRef<BottomSheetModal>(null)

  const { values, setFieldValue, submitForm } = useFormik<SearchForm>({
    initialValues,
    onSubmit: () => {},
  })

  useEffect(() => {
    routesRef?.current?.present()
  }, [])

  const showFilterBottomSheet = useCallback((filterType: FilterType) => {
    if (filterType === 'courseTypes') {
      courseTypeFilterRef?.current?.present()
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
      if (filterType === 'courseTypes') {
        return values.courseTypes.length > 0 ? 'flat' : 'outlined'
      }
      if (filterType === 'difficulties') {
        return values.difficulties.length > 0 ? 'flat' : 'outlined'
      }
      return 'outlined'
    },
    [values.courseTypes, values.difficulties],
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
      if (filterType === 'courseTypes') {
        courseTypeFilterRef?.current?.dismiss()
      }
      if (filterType === 'difficulties') {
        difficultyFilterRef?.current?.dismiss()
      }
    },
    [submitForm],
  )

  const activityButtonText = useMemo(
    () =>
      values.courseTypes.length > 0
        ? courseTypes
            .filter(a => values.courseTypes.includes(a.value))
            .map(v => v.name)
            .join(', ')
        : '유형',
    [values.courseTypes],
  )

  const difficultyButtonText = useMemo(
    () =>
      values.difficulties.length > 0
        ? difficultyTypes
            .filter(a => values.difficulties.includes(a.value))
            .map(v => v.name)
            .join(', ')
        : '난이도',
    [values.difficulties],
  )

  return (
    <BottomSheetModalProvider>
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
                mode={getFilterButtonMode('courseTypes')}
                alignItems='center'
                maxWidth={150}
                onPress={() => showFilterBottomSheet('courseTypes')}
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

      <BottomSheet
        bottomSheetRef={routesRef}
        withoutBackDrop
        snapPoints={['7.5%', '50%', '85%']}
        scrollable
        enableDynamicSizing={false}
        enablePanDownToClose={false}>
        <Courses totalCount={226} courses={courses} />
      </BottomSheet>

      {/* 액티비티 타입 필터 */}
      <ChkboxBottomSheet
        title='액티비티'
        value={values.courseTypes}
        setValue={value => setFieldValue('activityTypes', value)}
        options={courseTypes}
        bottomSheetRef={courseTypeFilterRef}
      />

      {/* 난이도 필터 */}
      <ChkboxBottomSheet
        title='난이도'
        value={values.difficulties}
        setValue={value => setFieldValue('difficulties', value)}
        options={difficultyTypes}
        bottomSheetRef={difficultyFilterRef}
      />

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
    </BottomSheetModalProvider>
  )
}

export default HomeScreen
