import { Button, Text, View } from '../../components/styled'
import { Searchbar } from 'react-native-paper'
import { useCallback, useMemo, useRef, useState } from 'react'
import globalStyles from '../../utils/style.utils.ts'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { StyleSheet } from 'react-native'

const initialLocation = '경기도 파주시'

function HomeScreen() {
  const [searchValue, setSearchValue] = useState(initialLocation)
  // 맵을 움직이면 검색어가 초기화됩니다

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], [])

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  )

  return (
    <View flex={1} p={10} gap={8}>
      <Searchbar
        placeholder='검색'
        onChangeText={setSearchValue}
        value={searchValue}
      />

      <View flexDirection='row' gap={4}>
        <Button
          mode='contained-tonal'
          icon='chevron-down'
          contentStyle={globalStyles.flexReverse}
          onPress={handlePresentModalPress}>
          거리
        </Button>
        <Button
          mode='contained-tonal'
          icon='chevron-down'
          contentStyle={globalStyles.flexReverse}>
          액티비티
        </Button>
        <Button
          mode='contained-tonal'
          icon='chevron-down'
          contentStyle={globalStyles.flexReverse}>
          난이도
        </Button>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
