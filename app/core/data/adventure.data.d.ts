type AdventureBasic = {
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
}
