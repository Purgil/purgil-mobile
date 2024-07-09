import {
  ExpeditionDetailData,
  ExpeditionNoticeData,
} from '~/core/dto/expedition/expedition.data'
import { UserData } from '~/core/dto/user/user.data'

const expedition: ExpeditionDetailData = {
  id: 1,
  title: 'Mount Everest Base Camp Trek',
  description:
    'An adventurous trek to the base camp of Mount Everest, offering stunning views and a thrilling experience.',
  adventureTypeCode: 'TREK',
  departureDatetime: '2024-07-03 08:00',
  applyDeadlineDatetime: '2024-07-01 23:00',
  maxMemberCount: 15,
  currentMemberCount: 7,
  minAge: 18,
  maxAge: 60,
  route: {
    id: 1,
    name: 'Everest Base Camp Route',
    address: '서울시 송파구',
  },
  leader: {
    id: 1,
    username: 'John Doe',
    nickname: 'John',
  },
  members: [
    {
      id: 2,
      username: 'Jane Doe',
      nickname: 'Jane',
    },
    {
      id: 3,
      username: 'Alice Doe',
      nickname: 'Alice',
    },
    {
      id: 4,
      username: 'Bob Doe',
      nickname: 'Bob',
    },
  ],
  createdAt: '2024-01-01 12:00',
}

const applies: UserData[] = [
  {
    id: 2,
    username: 'Jane Doe',
    nickname: 'Jane',
  },
  {
    id: 3,
    username: 'Alice Doe',
    nickname: 'Alice',
  },
  {
    id: 4,
    username: 'Bob Doe',
    nickname: 'Bob',
  },
]

const notices: ExpeditionNoticeData[] = [
  {
    id: 1,
    title: 'Important Notice',
    content: 'Please bring your own tent and sleeping bag.',
    writer: {
      id: 1,
      username: 'John Doe',
      nickname: 'John',
    },
    createdAt: '2024-07-01 12:00',
  },
  {
    id: 2,
    title: 'Important Notice',
    content: 'Please bring your own tent and sleeping bag.',
    writer: {
      id: 1,
      username: 'John Doe',
      nickname: 'John',
    },
    createdAt: '2024-07-01 12:00',
  },
  {
    id: 3,
    title: 'Important Notice',
    content: 'Please bring your own tent and sleeping bag.',
    writer: {
      id: 1,
      username: 'John Doe',
      nickname: 'John',
    },
    createdAt: '2024-07-01 12:00',
  },
  {
    id: 4,
    title: 'Important Notice',
    content: 'Please bring your own tent and sleeping bag.',
    writer: {
      id: 1,
      username: 'John Doe',
      nickname: 'John',
    },
    createdAt: '2024-07-01 12:00',
  },
  {
    id: 5,
    title: 'Important Notice',
    content: 'Please bring your own tent and sleeping bag.',
    writer: {
      id: 1,
      username: 'John Doe',
      nickname: 'John',
    },
    createdAt: '2024-07-01 12:00',
  },
]

export { expedition, applies, notices }
