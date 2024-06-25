import { StackScreenProps } from '@react-navigation/stack'
import { Activity, Adventure } from '~/core/dto/adventure.dto'
import { Image } from '~/core/dto/shared/shared.dto'
import { AdventureListReqDto } from '~/core/dto/adventure/adventure.req-dto'
import { ExpeditionListReqDto } from '~/core/dto/expedition/expedition.req-dto'

export type ScreenPropsMap = {
  Home?: {
    filter: AdventureListReqDto
  }
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
  RouteFilter: {
    filter: AdventureListReqDto
  }
  Follow: undefined
  ExpeditionFilter: {
    filter: ExpeditionListReqDto
  }
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
