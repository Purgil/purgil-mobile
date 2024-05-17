import { NameValuePair } from '../../core/types/common.types'

const activities: NameValuePair[] = [
  {
    value: 'hiking',
    name: '하이킹',
  },
  {
    value: 'cycling',
    name: '싸이클링',
  },
  {
    value: 'mountain-cycling',
    name: '마운틴 싸이클링',
  },
  {
    value: 'jogging',
    name: '조깅',
  },
  {
    value: 'walking',
    name: '산책',
  },
]

const difficulties: NameValuePair[] = [
  {
    value: 'high',
    name: '높음',
  },
  {
    value: 'normal',
    name: '보통',
  },
  {
    value: 'easy',
    name: '쉬움',
  },
]

export { activities, difficulties }
