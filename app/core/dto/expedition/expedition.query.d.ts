type ExpeditionListQuery = {
  adventureTypeCodes: string[]
  minAge?: number
  maxAge?: number
  minParticipantCount?: number
  maxParticipantCount?: number
  routeTypeCodes: string[]
  difficultyCodes: string[]
  minRating?: number
  minLength?: number
  maxLength?: number
  minElvGain?: number
  maxElvGain?: number
  minHighestPoint?: number
  maxHighestPoint?: number
  minDepartureDate?: string
  maxDepartureDate?: string
  appliedByMe?: boolean
  createdByMe?: boolean
  sortBy: string
}

type ExpeditionSearchQuery = {
  query: string
}

export { ExpeditionListQuery, ExpeditionSearchQuery }
