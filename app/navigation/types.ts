import { StackScreenProps } from '@react-navigation/stack'
import { Activity, Adventure } from '~/core/data/adventure.data'

export type RootStackParamList = {
  Home: undefined
  Map: undefined
  Record: undefined
  Social: undefined
  Profile: undefined
  BottomNav: undefined
  Auth: undefined
  Login: undefined
  SignUp: undefined
  AdventureDetail: {
    adventure: Adventure
  }
  ActivityDetail: {
    activity: Activity
  }
  ImgUpload: {
    onComplete: () => void
    maxCount: number
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
