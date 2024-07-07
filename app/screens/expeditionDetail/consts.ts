import { ExpeditionDetailData } from '~/core/dto/expedition/expedition.data'

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
    name: 'John Doe',
    nickname: 'John',
  },
  participants: [
    {
      id: 2,
      name: 'Jane Doe',
      nickname: 'Jane',
    },
    {
      id: 3,
      name: 'Alice Doe',
      nickname: 'Alice',
    },
    {
      id: 4,
      name: 'Bob Doe',
      nickname: 'Bob',
    },
  ],
  createdAt: '2024-01-01 12:00',
}

export { expedition }
