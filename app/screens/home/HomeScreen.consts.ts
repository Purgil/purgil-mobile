import { ValueLabelPair } from '../../core/data/basic.types'
import { Adventure } from '../../core/data/adventure.data'

const adventureTypes: ValueLabelPair[] = [
  {
    value: 'hiking',
    label: '등산',
  },
  {
    value: 'running',
    label: '러닝',
  },
  {
    value: 'walking',
    label: '산책',
  },
  {
    value: 'cycling',
    label: '로드 사이클',
  },
  {
    value: 'mountain-cycling',
    label: '마운틴 사이클',
  },
]

const difficultyTypes: ValueLabelPair[] = [
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

const adventures: Adventure[] = [
  {
    id: 1,
    adventureType: 'HIKING',
    name: '북한산 메인 루트',
    address: '서울시 은평구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.6,
    distance: 7.2,
  },
  {
    id: 2,
    adventureType: 'HIKING',
    name: '백악산 메인 루트',
    address: '서울시 양평구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.5,
    distance: 4.2,
  },
  {
    id: 3,
    adventureType: 'HIKING',
    name: '도봉산 메인 루트',
    address: '서울시 도봉구',
    imgs: [],
    difficulty: '중간',
    rating: 4.7,
    distance: 5.8,
  },
  {
    id: 4,
    adventureType: 'HIKING',
    name: '관악산 메인 루트',
    address: '서울시 관악구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.8,
    distance: 6.5,
  },
  {
    id: 5,
    adventureType: 'HIKING',
    name: '북한산 백운대',
    address: '서울시 성북구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.9,
    distance: 8.0,
  },
  {
    id: 6,
    adventureType: 'HIKING',
    name: '인왕산 루트',
    address: '서울시 종로구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.4,
    distance: 3.9,
  },
]

export { adventureTypes, difficultyTypes, adventures }
