import { WithTimingConfig } from 'react-native-reanimated/src/reanimated2/animation/timing.ts'
import { Easing } from 'react-native-reanimated'

const basicTimingConfig: WithTimingConfig = {
  duration: 150,
  easing: Easing.out(Easing.ease),
}

export { basicTimingConfig }
