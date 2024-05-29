import { User } from '~/core/data/user.data'

type AdventureType = 'HIKING' | 'CYCLING'

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
  rating: number
  createdAt: string
}

type AdventureReview = {} & Review

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
  Activity,
  Split,
}
