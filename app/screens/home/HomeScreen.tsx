import { Chip, ScrollView, Text, View } from '../../components/styled'
import { Portal, Searchbar } from 'react-native-paper'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  adventureTypes,
  adventures,
  difficultyTypes,
} from './HomeScreen.consts.ts'
import { useFormik } from 'formik'
import { ImgArea, MapArea, Swiper } from '~/components/basic'
import ChkboxActionSheet from '~/components/basic/ChkboxActionSheet/ChkboxActionSheet.tsx'
import ActionSheet from '~/components/basic/ActionSheet/ActionSheet.tsx'
import { FlatList } from 'react-native'
import Adventure from '~/components/adventure/Adventure/Adventure.tsx'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'

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
  /** state */
  const [actionSheets, setActionSheets] = useState<ActionSheetState>({
    adventureTypes: false,
    difficulties: false,
    other: false,
  })

  /** hook */
  const scrollRef = useRef<any>(null)
  const swiperRef = useRef<any>(null)
  const { values, setFieldValue } = useFormik<SearchForm>({
    initialValues,
    onSubmit: () => {},
  })

  /** function */
  const handleCloseActionSheet = useCallback(
    (actionSheetType: FilterType) => {
      setActionSheets({ ...actionSheets, [actionSheetType]: false })
    },
    [actionSheets],
  )

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

  /** memo */
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
        <View flex={1}>
          <Portal.Host>
            <MapArea />
            {/* 루트 목록 */}
            <ActionSheet
              visible
              dim={false}
              snapPoints={[0.1, 1]}
              redeemHeight={15}>
              <ActionSheet.Header>
                <Text textAlign='center' variant='titleMedium'>
                  125 결과
                </Text>
              </ActionSheet.Header>
              <ActionSheet.Body>
                <View px={10}>
                  <NativeViewGestureHandler
                    ref={scrollRef}
                    simultaneousHandlers={swiperRef}>
                    <FlatList
                      data={adventures}
                      keyExtractor={item => `${item.id}`}
                      renderItem={({ item }) => (
                        <Adventure
                          adventure={item}
                          scrollRef={scrollRef}
                          swiperRef={swiperRef}
                        />
                      )}
                    />
                  </NativeViewGestureHandler>
                </View>
              </ActionSheet.Body>
            </ActionSheet>
          </Portal.Host>
        </View>
      </View>

      {/* 액티비티 타입 필터 */}
      {actionSheets.adventureTypes && (
        <ChkboxActionSheet
          visible={actionSheets.adventureTypes}
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
          visible={actionSheets.difficulties}
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
    </>
  )
}

export default HomeScreen
