import { User } from '~/core/data/user.data'

type AdventureType = 'HIKING' | 'CYCLING' | 'MOUNTINE_CYCLING'

type AdventureBasic = {
  adventureType: AdventureType
  id: number
  imgs: string[]
  name: string
  rating: number
  difficulty: string
  distance: number
  address: string
}

type AdventureDetailBasic = {
  elevationGain: number
  avgCompleteTime: number // 분 단위
}

type Hiking = {} & AdventureBasic

type HikingDetail = {} & Hiking & AdventureDetailBasic

type Cycling = {} & AdventureBasic

type CyclingDetail = {} & Cycling & AdventureDetailBasic

type Running = {} & AdventureBasic

type RunningDetail = {} & Running & AdventureDetailBasic

type Adventure = Hiking | Cycling | Running

type AdventureDetail = HikingDetail | CyclingDetail | RunningDetail

type Review = {
  id: number
  contentId: number
  writer: User
  content: string
  createdAt: string
  rating: number
}

type AdventureReview = {} & Review

type Comment = {
  id: number
  contentType: 'activity'
  contentId: number
  writer: User
  content: string
  createdAt: string
}

type Split = {
  splitDistance: number
  elevationGain: number
  time: number
}

type Activity = {
  id: number
  adventureType: AdventureType
  user: User
  title: string
  adventure: Adventure
  distance: number
  elevationGain: number
  totalTime: number
  movingTime: number
  calories: number
  splits: Split[]
  rating: number
  description: string
  country: string
  city: string
  district: string
  imgs: string[]
  createdAt: string
}

export {
  AdventureBasic,
  Hiking,
  Cycling,
  Running,
  Adventure,
  AdventureDetailBasic,
  RunningDetail,
  HikingDetail,
  CyclingDetail,
  AdventureDetail,
  Review,
  AdventureReview,
  ActivityReview,
  Activity,
  Split,
  Comment,
}
