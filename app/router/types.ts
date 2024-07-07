import { StackScreenProps } from '@react-navigation/stack'
import { RouteSearchResultData } from '~/core/dto/activity/route.data'
import { ActivityDetailData } from '~/core/dto/activity/activity.data'
import { Image } from '~/core/dto/shared/shared.data'
import { RouteListQuery } from '~/core/dto/activity/route.query'
import { ExpeditionListQuery } from '~/core/dto/expedition/expedition.query'
import { ExpeditionListData } from '~/core/dto/expedition/expedition.data'

export type ScreenPropsMap = {
  Home?: {
    filter: RouteListQuery
  }
  Map: undefined
  Record: undefined
  Social: {
    expeditionFilter: ExpeditionListQuery
  }
  Profile: undefined
  BottomNav: undefined
  Auth: undefined
  Login: undefined
  SignUp: undefined
  RouteDetail: {
    id: number
    toCreateExpedition?: boolean
  }
  ActivityDetail: {
    activity: ActivityDetailData
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
    filter: RouteListQuery
  }
  Follow: undefined
  ExpeditionFilter: {
    filter: ExpeditionListQuery
  }
  CreateExpedition: {
    route?: RouteSearchResultData
  }
  SearchRoute: undefined
  ExpeditionDetail: {
    id: number
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
