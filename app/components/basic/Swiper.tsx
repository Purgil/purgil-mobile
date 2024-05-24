import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  runOnUI,
  useSharedValue,
} from 'react-native-reanimated'

function Swiper() {
  const height = useSharedValue(300)
  const panGesture = Gesture.Pan()
    .onStart(() => {
      height.value = 500
    })
    .onChange(() => {
      height.value = 560
    })
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View>
        <Animated.Text>hhh</Animated.Text>
      </Animated.View>
    </GestureDetector>
  )
}

export default Swiper
