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
    activityType: 'Cycling',
    imgs: ['img1.jpg', 'img2.jpg'],
    name: 'Yeouido to Jamsil',
    rating: 4.5,
    difficulty: 'Moderate',
    distance: 15.2,
    address: 'Yeouido, Seoul',
    coordinates: [
      { latitude: 37.530341, longitude: 126.926073 },
      { latitude: 37.528965, longitude: 126.935584 },
      { latitude: 37.5326, longitude: 126.940775 },
      { latitude: 37.526342, longitude: 126.947768 },
      { latitude: 37.520309, longitude: 126.996522 },
      { latitude: 37.51954, longitude: 127.016649 },
      { latitude: 37.517104, longitude: 127.034504 },
      { latitude: 37.520027, longitude: 127.050652 },
      { latitude: 37.520613, longitude: 127.070981 },
      { latitude: 37.520992, longitude: 127.081625 },
      { latitude: 37.517829, longitude: 127.093883 },
    ],
  },
  {
    id: 2,
    activityType: 'Running',
    imgs: ['img3.jpg', 'img4.jpg'],
    name: 'Han River Park',
    rating: 4.7,
    difficulty: 'Easy',
    distance: 10.5,
    address: 'Banpo, Seoul',
    coordinates: [
      { latitude: 37.511074, longitude: 126.995619 },
      { latitude: 37.514264, longitude: 126.998745 },
      { latitude: 37.517094, longitude: 127.002671 },
      { latitude: 37.520352, longitude: 127.006249 },
      { latitude: 37.523198, longitude: 127.009804 },
    ],
  },
  {
    id: 3,
    activityType: 'Hiking',
    imgs: ['img5.jpg', 'img6.jpg'],
    name: 'Bukhansan Trail',
    rating: 4.8,
    difficulty: 'Hard',
    distance: 8.7,
    address: 'Bukhansan, Seoul',
    coordinates: [
      { latitude: 37.658206, longitude: 126.977068 },
      { latitude: 37.662216, longitude: 126.980563 },
      { latitude: 37.667321, longitude: 126.982984 },
      { latitude: 37.672469, longitude: 126.987412 },
    ],
  },
  {
    id: 4,
    activityType: 'Walking',
    imgs: ['img7.jpg', 'img8.jpg'],
    name: 'Namsan Circuit',
    rating: 4.2,
    difficulty: 'Moderate',
    distance: 5.3,
    address: 'Namsan, Seoul',
    coordinates: [
      { latitude: 37.551169, longitude: 126.990822 },
      { latitude: 37.554769, longitude: 126.991775 },
      { latitude: 37.557396, longitude: 126.994394 },
      { latitude: 37.559967, longitude: 126.996513 },
    ],
  },
  {
    id: 5,
    activityType: 'Cycling',
    imgs: ['img9.jpg', 'img10.jpg'],
    name: 'Gangnam River Trail',
    rating: 4.0,
    difficulty: 'Easy',
    distance: 12.1,
    address: 'Gangnam, Seoul',
    coordinates: [
      { latitude: 37.497962, longitude: 127.02761 },
      { latitude: 37.502692, longitude: 127.03238 },
      { latitude: 37.507293, longitude: 127.037489 },
      { latitude: 37.511919, longitude: 127.042071 },
    ],
  },
  {
    id: 6,
    activityType: 'Running',
    imgs: ['img11.jpg', 'img12.jpg'],
    name: 'Seoul Forest Loop',
    rating: 4.6,
    difficulty: 'Moderate',
    distance: 6.8,
    address: 'Seoul Forest, Seoul',
    coordinates: [
      { latitude: 37.54457, longitude: 127.038161 },
      { latitude: 37.54697, longitude: 127.040569 },
      { latitude: 37.549204, longitude: 127.043261 },
      { latitude: 37.551471, longitude: 127.046117 },
    ],
  },
  {
    id: 7,
    activityType: 'Hiking',
    imgs: ['img13.jpg', 'img14.jpg'],
    name: 'Inwangsan Path',
    rating: 4.7,
    difficulty: 'Hard',
    distance: 7.5,
    address: 'Inwangsan, Seoul',
    coordinates: [
      { latitude: 37.574297, longitude: 126.967403 },
      { latitude: 37.577669, longitude: 126.969856 },
      { latitude: 37.581075, longitude: 126.972324 },
      { latitude: 37.584482, longitude: 126.975672 },
    ],
  },
  {
    id: 8,
    activityType: 'Walking',
    imgs: ['img15.jpg', 'img16.jpg'],
    name: 'Cheonggyecheon Stream',
    rating: 4.3,
    difficulty: 'Easy',
    distance: 5.0,
    address: 'Cheonggyecheon, Seoul',
    coordinates: [
      { latitude: 37.569427, longitude: 126.979306 },
      { latitude: 37.571832, longitude: 126.981456 },
      { latitude: 37.574218, longitude: 126.983683 },
      { latitude: 37.576578, longitude: 126.986143 },
    ],
  },
  {
    id: 9,
    activityType: 'Cycling',
    imgs: ['img17.jpg', 'img18.jpg'],
    name: 'Hangang Park Ride',
    rating: 4.5,
    difficulty: 'Moderate',
    distance: 9.8,
    address: 'Hangang Park, Seoul',
    coordinates: [
      { latitude: 37.519004, longitude: 126.894124 },
      { latitude: 37.521304, longitude: 126.898542 },
      { latitude: 37.523691, longitude: 126.903064 },
      { latitude: 37.526074, longitude: 126.907533 },
    ],
  },
  {
    id: 10,
    activityType: 'Running',
    imgs: ['img19.jpg', 'img20.jpg'],
    name: 'Olympic Park Jog',
    rating: 4.8,
    difficulty: 'Easy',
    distance: 4.2,
    address: 'Olympic Park, Seoul',
    coordinates: [
      { latitude: 37.519982, longitude: 127.121627 },
      { latitude: 37.522541, longitude: 127.124009 },
      { latitude: 37.525095, longitude: 127.126443 },
      { latitude: 37.527622, longitude: 127.128842 },
    ],
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
