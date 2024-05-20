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
    name: '북한산 메인 루트',
    address: '서울시 은평구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.6,
    distance: 7.2,
  },
  {
    id: 2,
    name: '백악산 메인 루트',
    address: '서울시 양평구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.5,
    distance: 4.2,
  },
  {
    id: 3,
    name: '도봉산 메인 루트',
    address: '서울시 도봉구',
    imgs: [],
    difficulty: '중간',
    rating: 4.7,
    distance: 5.8,
  },
  {
    id: 4,
    name: '관악산 메인 루트',
    address: '서울시 관악구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.8,
    distance: 6.5,
  },
  {
    id: 5,
    name: '북한산 백운대',
    address: '서울시 성북구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.9,
    distance: 8.0,
  },
  {
    id: 6,
    name: '인왕산 루트',
    address: '서울시 종로구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.4,
    distance: 3.9,
  },
  {
    id: 7,
    name: '남산 루트',
    address: '서울시 중구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.3,
    distance: 3.0,
  },
  {
    id: 8,
    name: '청계산 메인 루트',
    address: '서울시 서초구',
    imgs: [],
    difficulty: '중간',
    rating: 4.6,
    distance: 7.0,
  },
  {
    id: 9,
    name: '삼성산 루트',
    address: '서울시 금천구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.7,
    distance: 5.2,
  },
  {
    id: 10,
    name: '불암산 루트',
    address: '서울시 노원구',
    imgs: [],
    difficulty: '중간',
    rating: 4.5,
    distance: 6.3,
  },
  {
    id: 11,
    name: '수락산 루트',
    address: '서울시 노원구',
    imgs: [],
    difficulty: '중간',
    rating: 4.6,
    distance: 5.5,
  },
  {
    id: 12,
    name: '아차산 루트',
    address: '서울시 광진구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.4,
    distance: 3.7,
  },
  {
    id: 13,
    name: '대모산 루트',
    address: '서울시 강남구',
    imgs: [],
    difficulty: '중간',
    rating: 4.3,
    distance: 4.8,
  },
  {
    id: 14,
    name: '용마산 루트',
    address: '서울시 중랑구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.7,
    distance: 5.9,
  },
  {
    id: 15,
    name: '매봉산 루트',
    address: '서울시 서대문구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.5,
    distance: 3.2,
  },
  {
    id: 16,
    name: '성북산 루트',
    address: '서울시 성북구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.8,
    distance: 6.7,
  },
  {
    id: 17,
    name: '불광산 루트',
    address: '서울시 은평구',
    imgs: [],
    difficulty: '중간',
    rating: 4.4,
    distance: 5.0,
  },
  {
    id: 18,
    name: '수명산 루트',
    address: '서울시 강서구',
    imgs: [],
    difficulty: '쉬움',
    rating: 4.3,
    distance: 3.5,
  },
  {
    id: 19,
    name: '백련산 루트',
    address: '서울시 마포구',
    imgs: [],
    difficulty: '중간',
    rating: 4.5,
    distance: 4.6,
  },
  {
    id: 20,
    name: '봉산 루트',
    address: '서울시 영등포구',
    imgs: [],
    difficulty: '어려움',
    rating: 4.7,
    distance: 5.4,
  },
]

export { adventureTypes, difficultyTypes, adventures }
