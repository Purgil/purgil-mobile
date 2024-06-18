import { StackScreenProps } from '@react-navigation/stack'
import { Activity, Adventure } from '~/core/data/adventure.data'
import { Image } from '~/core/data/basic.types'

export type ScreenPropsMap = {
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
    maxCount: number
    targetScreen?: 'CreatePost'
  }
  CreatePost?: {
    selectedImgs: Image[]
  }
  CreateActivity?: {
    selectedImgs: Image[]
  }
  RouteFilter: undefined
  Follow: undefined
}

export type RootScreenProps<T extends keyof ScreenPropsMap> = StackScreenProps<
  ScreenPropsMap,
  T
>

declare global {
  namespace ReactNavigation {
    interface ScreenProps extends ScreenPropsMap {}
  }
}
