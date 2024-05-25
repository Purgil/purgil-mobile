import { Button, Chip, ScrollView, View } from '../../components/styled'
import { List, Searchbar } from 'react-native-paper'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import globalStyles from '~/utils/style.utils.ts'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import {
  adventureTypes,
  adventures,
  difficultyTypes,
} from './HomeScreen.consts.ts'
import { useFormik } from 'formik'
import Adventures from '../../components/adventure/Adventures.tsx'
import { ChkboxBottomSheet, MapArea, BottomSheet } from '~/components/basic'
import ChkboxActionSheet from '~/components/basic/ChkboxActionSheet.tsx'

const initialLocation = '경기도 파주시'

type FilterType = 'adventureTypes' | 'difficulties' | 'other'

type ActionSheetState = { [key in FilterType]: boolean }

type SearchForm = {
  searchText: string
  adventureTypes: string[]
  difficulties: string[]
}

const initialValues: SearchForm = {
  searchText: initialLocation,
  adventureTypes: [],
  difficulties: [],
}

function HomeScreen() {
  const adventureTypeFilterRef = useRef<BottomSheetModal>(null)
  const difficultyFilterRef = useRef<BottomSheetModal>(null)
  const otherFiltersRef = useRef<BottomSheetModal>(null)
  const routesRef = useRef<BottomSheetModal>(null)

  const [actionSheets, setActionSheets] = useState<ActionSheetState>({
    adventureTypes: false,
    difficulties: false,
    other: false,
  })

  const handleCloseActionSheet = useCallback(
    (actionSheetType: FilterType) => {
      setActionSheets({ ...actionSheets, [actionSheetType]: false })
    },
    [actionSheets],
  )

  const { values, setFieldValue, submitForm } = useFormik<SearchForm>({
    initialValues,
    onSubmit: () => {},
  })

  useEffect(() => {
    routesRef?.current?.present()
  }, [])

  const showFilterBottomSheet = useCallback(
    (filterType: FilterType) => {
      setActionSheets({ ...actionSheets, [filterType]: true })
    },
    [actionSheets],
  )

  const getFilterButtonMode = useCallback(
    (filterType: FilterType): 'outlined' | 'flat' => {
      if (filterType === 'adventureTypes') {
        return values.adventureTypes.length > 0 ? 'flat' : 'outlined'
      }
      if (filterType === 'difficulties') {
        return values.difficulties.length > 0 ? 'flat' : 'outlined'
      }
      return 'outlined'
    },
    [values.adventureTypes, values.difficulties],
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
      if (filterType === 'adventureTypes') {
        adventureTypeFilterRef?.current?.dismiss()
      }
      if (filterType === 'difficulties') {
        difficultyFilterRef?.current?.dismiss()
      }
    },
    [submitForm],
  )

  const activityButtonText = useMemo(
    () =>
      values.adventureTypes.length > 0
        ? adventureTypes
            .filter(a => values.adventureTypes.includes(a.value))
            .map(v => v.label)
            .join(', ')
        : '유형',
    [values.adventureTypes],
  )

  const difficultyButtonText = useMemo(
    () =>
      values.difficulties.length > 0
        ? difficultyTypes
            .filter(a => values.difficulties.includes(a.value))
            .map(v => v.label)
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
                mode={getFilterButtonMode('adventureTypes')}
                alignItems='center'
                maxWidth={150}
                onPress={() => showFilterBottomSheet('adventureTypes')}
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

      {/*<BottomSheet*/}
      {/*  bottomSheetRef={routesRef}*/}
      {/*  withoutBackDrop*/}
      {/*  snapPoints={['7.5%', '50%', '85%']}*/}
      {/*  scrollable*/}
      {/*  enableDynamicSizing={false}*/}
      {/*  enablePanDownToClose={false}>*/}
      {/*  <Adventures totalCount={226} adventures={adventures} />*/}
      {/*</BottomSheet>*/}

      {/* 액티비티 타입 필터 */}
      {actionSheets.adventureTypes && (
        <ChkboxActionSheet
          visible={true}
          onClose={() => {
            handleCloseActionSheet('adventureTypes')
          }}
          title='모험 유형'
          value={values.adventureTypes}
          onChange={value => setFieldValue('adventureTypes', value)}
          options={adventureTypes}
        />
      )}

      {/* 난이도 필터 */}
      {actionSheets.difficulties && (
        <ChkboxActionSheet
          visible={true}
          snapPoints={[0.5, 0.8]}
          onClose={() => {
            handleCloseActionSheet('difficulties')
          }}
          title='난이도'
          value={values.difficulties}
          onChange={value => setFieldValue('difficulties', value)}
          options={difficultyTypes}
        />
      )}

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
