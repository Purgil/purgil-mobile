import { StackScreenProps } from '@react-navigation/stack'
import { RouteDetailData } from '~/core/dto/activity/route.data'
import { ActivityDetailData } from '~/core/dto/activity/activity.data'
import { Image } from '~/core/dto/shared/shared.data'
import { RouteListQuery } from '~/core/dto/activity/route.query'
import { ExpeditionListReqDto } from '~/core/dto/expedition/expedition.req-dto'

export type ScreenPropsMap = {
  Home?: {
    filter: RouteListQuery
  }
  Map: undefined
  Record: undefined
  Social: {
    expeditionFilter: ExpeditionListReqDto
  }
  Profile: undefined
  BottomNav: undefined
  Auth: undefined
  Login: undefined
  SignUp: undefined
  RouteDetail: {
    id: number
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
    filter: ExpeditionListReqDto
  }
  CreateExpedition: undefined
  SearchRoute: undefined
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
