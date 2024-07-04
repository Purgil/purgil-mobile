import { User } from '~/core/dto/user/user.dto'

type RouteListData = {
  id: number
  activityType: string
  imgs: string[]
  name: string
  rating: number
  difficulty: string
  distance: number
  address: string
}

type RouteDetailData = {
  elevationGain: number
  avgCompleteTime: number // 분 단위
} & RouteListData

type RouteReviewListData = {
  id: number
  contentId: number
  writer: User
  content: string
  createdAt: string
  rating: number
}

type RouteCommentListData = {
  id: number
  contentType: 'ROUTE'
  contentId: number
  writer: User
  content: string
  createdAt: string
}
