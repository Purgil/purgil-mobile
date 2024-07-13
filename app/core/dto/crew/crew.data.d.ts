import { ActivityType } from '~/core/dto/activity/activity.data'

type CrewAccessType = 'PUBLIC' | 'PRIVATE'

type CrewDetailData = {}

type CrewListData = {
  id: number
  accessType: CrewAccessType
  activityType: ActivityType
  memberCount: number
  name: string
  address: string
  profileImgUrl: string
}

export { CrewDetailData, CrewListData, CrewAccessType }
