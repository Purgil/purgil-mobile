import { Dayjs } from 'dayjs'

type ExpeditionListReqDto = {
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
  sortBy: string
}

type CreateExpeditionReqDto = {
  title?: string
  description?: string
  departureDatetime?: Dayjs
  minAge?: number
  maxAge?: number
  maxParticipantCount?: number
  routeId?: number
  applyDeadlineDatetime?: Dayjs
}

export { ExpeditionListReqDto, CreateExpeditionReqDto }
