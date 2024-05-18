import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { PropsWithChildren, RefObject, useCallback, useMemo } from 'react'
import { useTheme } from 'react-native-paper'

type CssDisplay = 'none' | 'flex' | undefined

export type BottomSheetProps = {
  bottomSheetRef: RefObject<BottomSheetModal>
  onSnapPointChange?: (index: number) => void
  hideIndicator?: boolean
  scrollable?: boolean
  withoutBackDrop?: boolean
} & PropsWithChildren &
  Partial<BottomSheetModalProps>

function BottomSheet({
  bottomSheetRef,
  enableDynamicSizing = true,
  onSnapPointChange,
  hideIndicator = false,
  scrollable = false,
  withoutBackDrop = false,
  children,
  ...props
}: BottomSheetProps) {
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
    (backDropProps: any) =>
      withoutBackDrop ? null : (
        <BottomSheetBackdrop
          {...backDropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
    [withoutBackDrop],
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

  return (
    <BottomSheetModal
      {...props}
      ref={bottomSheetRef}
      index={0}
      enableDynamicSizing={enableDynamicSizing}
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
