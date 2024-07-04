import { Option, ValueLabelPair } from '~/core/dto/shared/shared.data'
import { RouteListData } from '~/core/dto/activity/route.data'

const activityTypeOptions: Option[] = [
  {
    value: 'cycling',
    label: '로드 자전거',
    icon: 'bike',
  },
  {
    value: 'mountain-cycling',
    label: '산악 자전거',
    icon: 'bike-fast',
  },
  {
    value: 'hiking',
    label: '하이킹',
    icon: 'hiking',
  },
  {
    value: 'running',
    label: '러닝',
    icon: 'run-fast',
  },
  {
    value: 'walking',
    label: '산책',
    icon: 'walk',
  },
]

const difficultyOptions: ValueLabelPair[] = [
  {
    value: 'high',
    label: '높음',
  },
  {
    value: 'normal',
    label: '보통',
  },
  {
    value: 'easy',
    label: '쉬움',
  },
]

const sortByOptions = [
  {
    value: 'popularity',
    label: '인기순',
  },
  {
    value: 'distance',
    label: '거리순',
  },
  {
    value: 'latest',
    label: '최신순',
  },
]

const routeTypeOptions: Option[] = [
  {
    value: 'circular ',
    label: '순환',
    icon: 'sync',
  },
  {
    value: 'outAndBack',
    label: '왕복',
    icon: 'swap-horizontal',
  },
  {
    value: 'pointToPoint',
    label: '일방',
    icon: 'arrow-right',
  },
]

const categoryOptions: Option[] = [
  {
    value: 'natural',
    label: '자연풍경',
    icon: 'forest',
  },
  {
    value: 'lake',
    label: '강/호수',
    icon: 'waves',
  },
  {
    value: 'ocean',
    label: '바다',
    icon: 'beach',
  },
  {
    value: 'dogFriendly',
    label: '애견 친화적',
    icon: 'dog-service',
  },
  {
    value: 'waterfall',
    label: '폭포',
    icon: 'waterfall',
  },
]

const routes: RouteListData[] = [
  {
    id: 1,
    activityType: '하이킹',
    name: '북한산 메인 루트',
    address: '서울시 은평구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.6,
    distance: 7.2,
  },
  {
    id: 2,
    activityType: 'HIKING',
    name: '백악산 메인 루트',
    address: '서울시 양평구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.5,
    distance: 4.2,
  },
  {
    id: 3,
    activityType: 'HIKING',
    name: '도봉산 메인 루트',
    address: '서울시 도봉구',
    imgs: [],
    difficulty: '중간',
    rating: 4.7,
    distance: 5.8,
  },
  {
    id: 4,
    activityType: 'HIKING',
    name: '관악산 메인 루트',
    address: '서울시 관악구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.8,
    distance: 6.5,
  },
  {
    id: 5,
    activityType: 'HIKING',
    name: '북한산 백운대',
    address: '서울시 성북구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.9,
    distance: 8.0,
  },
  {
    id: 6,
    activityType: 'HIKING',
    name: '인왕산 루트',
    address: '서울시 종로구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.4,
    distance: 3.9,
  },
]

export {
  activityTypeOptions,
  difficultyOptions,
  routeTypeOptions,
  routes,
  categoryOptions,
  sortByOptions,
}
