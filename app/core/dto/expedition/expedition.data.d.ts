import { UserData } from '~/core/dto/user/user.data'

type ExpeditionListData = {
  id: number
  title: string
  description: string
  adventureTypeCode: string
  departureDatetime: string
  applyDeadlineDatetime: string
  maxMemberCount: number
  currentMemberCount: number
  minAge: number
  maxAge: number
  route: {
    id: number
    name: string
    address: string
  }
  leader: {
    id: number
    name: string
    nickname: string
  }
  createdAt: string
}

type ExpeditionDetailData = {
  id: number
  title: string
  description: string
  adventureTypeCode: string
  departureDatetime: string
  applyDeadlineDatetime: string
  maxMemberCount: number
  currentMemberCount: number
  minAge: number
  maxAge: number
  route: {
    id: number
    name: string
    address: string
  }
  leader: UserData
  members: UserData[]
  createdAt: string
}

type ExpeditionNoticeData = {
  id: number
  title: string
  content: string
  writer: UserData
  createdAt: string
}

export { ExpeditionListData, ExpeditionDetailData, ExpeditionNoticeData }
