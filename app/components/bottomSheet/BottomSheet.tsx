import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { PropsWithChildren, RefObject, useCallback, useMemo } from 'react'
import { useTheme } from 'react-native-paper'

type CssDisplay = 'none' | 'flex' | undefined

type Props = {
  bottomSheetRef: RefObject<BottomSheetModal>
  onSnapPointChange?: (index: number) => void
  snapPoints?: string[]
  hideIndicator?: boolean
  scrollable?: boolean
  enableDynamicSizing?: boolean
} & PropsWithChildren

function BottomSheet({
  bottomSheetRef,
  snapPoints,
  enableDynamicSizing = true,
  onSnapPointChange,
  hideIndicator = false,
  scrollable = false,
  children,
}: Props) {
  const { colors } = useTheme()

  const handleSnapPointChange = useCallback(
    (index: number) => {
      if (onSnapPointChange) {
        onSnapPointChange(index)
      }
    },
    [onSnapPointChange],
  )

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  )

  const styles = useMemo(
    () => ({
      bg: {
        backgroundColor: colors.surface,
      },
      indicator: {
        backgroundColor: colors.onSurface,
        display: (hideIndicator ? 'none' : undefined) as CssDisplay,
      },
    }),
    [colors, hideIndicator],
  )

  const snapPointsMemo = useMemo(
    () => (enableDynamicSizing ? undefined : snapPoints),
    [enableDynamicSizing, snapPoints],
  )

  const enableDynamicSizingMemo = useMemo(
    () => (snapPoints ? false : enableDynamicSizing),
    [enableDynamicSizing, snapPoints],
  )

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPointsMemo}
      enableDynamicSizing={enableDynamicSizingMemo}
      onChange={handleSnapPointChange}
      backgroundStyle={styles.bg}
      handleIndicatorStyle={styles.indicator}
      backdropComponent={renderBackdrop}>
      {scrollable ? (
        <BottomSheetScrollView>{children}</BottomSheetScrollView>
      ) : (
        <BottomSheetView>{children}</BottomSheetView>
      )}
    </BottomSheetModal>
  )
}

export default BottomSheet
