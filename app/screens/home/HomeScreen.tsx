import { ScrollView, Text, View } from '../../components/styled'
import { Portal, Searchbar } from 'react-native-paper'
import React, { useRef, useState } from 'react'
import {
  adventureTypes,
  adventures,
  difficultyTypes,
  routeTypes,
} from './HomeScreen.consts.ts'
import { useFormik } from 'formik'
import { FilterChip, MapArea } from '~/components/basic'
import ActionSheet from '~/components/basic/ActionSheet/ActionSheet.tsx'
import { FlatList } from 'react-native'
import Adventure from '~/components/adventure/Adventure/Adventure.tsx'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import { IconButton } from '~/components/styled'
import { RootScreenProps } from '~/navigation/types.ts'

const initialLocation = '경기도 파주시'

type SearchForm = {
  searchText: string
  adventureTypes: string[]
  difficulties: string[]
  routeTypes: string[]
}

const initialValues: SearchForm = {
  searchText: initialLocation,
  adventureTypes: [],
  difficulties: [],
  routeTypes: [],
}

function HomeScreen({ navigation }: RootScreenProps<'Home'>) {
  /** state */

  /** hook */
  const scrollRef = useRef<any>(null)
  const swiperRef = useRef<any>(null)
  const { values, setFieldValue } = useFormik<SearchForm>({
    initialValues,
    onSubmit: () => {},
  })

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
                />
              </View>
            </ScrollView>
            <IconButton
              icon='tune'
              size={20}
              m={0}
              onPress={() => navigation.navigate('RouteFilter')}
            />
            {/*<Button
              mode='outlined'
              icon='tune'
              contentStyle={{ flexDirection: 'row-reverse' }}>
              1
            </Button>*/}
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
    </>
  )
}

export default HomeScreen
