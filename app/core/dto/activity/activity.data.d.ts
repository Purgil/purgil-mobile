import { UserData } from '~/core/dto/user/user.data'

type ActivityType = 'HIKING' | 'RUNNING' | 'CYCLING' | 'MOUNTINE_CYCLING'

type ActivityListData = {
  id: number
  activityType: string
  user: UserData
  title: string
  routeId: number
  routeName: string
  rating: number
  description: string
  country: string
  city: string
  district: string
  imgs: string[]
  createdAt: string
}

type ActivityDetailData = {
  distance: number
  elevationGain: number
  totalTime: number
  movingTime: number
  calories: number
  splits: {
    splitDistance: number
    elevationGain: number
    time: number
  }[]
} & ActivityListData
