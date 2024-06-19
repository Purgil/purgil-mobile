import { ScrollView, Text, View } from '../../components/styled'
import { Portal, Searchbar, useTheme } from 'react-native-paper'
import React, { useMemo, useRef, useState } from 'react'
import {
  adventures,
  adventureTypes,
  difficultyTypes,
  routeTypes,
} from './HomeScreen.consts.ts'
import { useFormik } from 'formik'
import { FilterChip, MapArea } from '~/components/shared'
import ActionSheet from '~/components/shared/ActionSheet/ActionSheet.tsx'
import { FlatList } from 'react-native'
import Adventure from '~/components/adventure/Adventure/Adventure.tsx'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import { Chip, Icon, Pressable } from '~/components/styled'
import { RootScreenProps } from '~/router/types.ts'
import { AdventureListReqDto } from '~/core/dto/adventure/adventure.reqDto'

const initialLocation = '경기도 파주시'

const initialValues: AdventureListReqDto = {
  searchText: initialLocation,
  adventureTypeCode: 'bike',
  difficultyCodes: [],
  routeTypeCodes: [],
}

function HomeScreen({
  navigation,
  route: { params: { filter } = { filter: initialValues } },
}: RootScreenProps<'Home'>) {
  /** hook */
  const { colors } = useTheme()
  const scrollRef = useRef<any>(null)
  const swiperRef = useRef<any>(null)
  const { values, setFieldValue } = useFormik<AdventureListReqDto>({
    initialValues,
    onSubmit: () => {},
  })

  /** memo */
  const filterCount = useMemo(
    () =>
      Object.keys(filter).reduce((count, key) => {
        const value = filter[key]
        if (Array.isArray(value)) {
          return count + (value.length > 0 ? 1 : 0)
        } else if (key === 'searchText') {
          return count
        } else {
          return count + (value ? 1 : 0)
        }
      }, 0),
    [filter],
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
          <View flexDirection='row' justifyContent='space-between'>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              gap={5}>
              <View flexDirection='row' gap={5}>
                <FilterChip
                  defaultLabel='탐험 유형'
                  value={values.adventureTypeCode}
                  onChange={value => setFieldValue('adventureTypeCode', value)}
                  options={adventureTypes}
                />
                <Chip icon='map-marker' mode='outlined'>
                  가까운
                </Chip>
                <Chip icon='trending-up'>인기</Chip>
                <Chip icon='bookmark' mode='outlined'>
                  저장한
                </Chip>
                {/*
                <FilterChip
                  defaultLabel='탐험 유형'
                  value={values.adventureTypes}
                  onChange={value => setFieldValue('adventureTypes', value)}
                  options={adventureTypes}
                />
                <FilterChip
                  defaultLabel='루트 유형'
                  value={values.routeTypes}
                  onChange={value => setFieldValue('routeTypes', value)}
                  options={routeTypes}
                />
                <FilterChip
                  defaultLabel='난이도'
                  value={values.difficulties}
                  onChange={value => setFieldValue('difficulties', value)}
                  options={difficultyTypes}
                />*/}
              </View>
            </ScrollView>
            <Pressable
              flexDirection='row'
              alignItems='center'
              px={13}
              gap={4}
              border={1}
              borderRadius={20}
              onPress={() => navigation.navigate('RouteFilter', { filter })}
              borderColor={colors.outline}>
              {filterCount > 0 && (
                <Text color={colors.primary} fontWeight='bold'>
                  {filterCount}
                </Text>
              )}
              <Icon size={18} source='tune' />
            </Pressable>
          </View>
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
                  123 결과
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
    </>
  )
}

export default HomeScreen
