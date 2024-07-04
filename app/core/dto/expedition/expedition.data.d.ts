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
    title: string
  }
  leader: {
    id: number
    name: string
    nickname: string
  }
  createdAt: string
}

export { ExpeditionListData }
