import { Dayjs } from 'dayjs'

type CreateExpeditionCommend = {
  title?: string
  description?: string
  departureDatetime?: Dayjs
  minAge?: number
  maxAge?: number
  maxParticipantCount?: number
  routeId?: number
  applyDeadlineDatetime?: Dayjs
}

export { CreateExpeditionCommend }
