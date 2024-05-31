import { ActivityReview } from '~/core/data/adventure.data'

const reviews: ActivityReview[] = [
  {
    id: 1,
    contentId: 101,
    writer: { id: 1, username: 'user1', nickname: 'nick1' },
    content: 'Great content, really enjoyed it!',
    createdAt: '2023-05-31T10:30:00Z',
  },
  {
    id: 2,
    contentId: 102,
    writer: { id: 2, username: 'user2', nickname: 'nick2' },
    content: 'It was okay, could have been better.',
    createdAt: '2023-05-31T11:00:00Z',
  },
  {
    id: 3,
    contentId: 103,
    writer: { id: 3, username: 'user3', nickname: 'nick3' },
    content: "I didn't like it at all.",
    createdAt: '2023-05-31T12:00:00Z',
  },
  {
    id: 4,
    contentId: 101,
    writer: { id: 4, username: 'user4', nickname: 'nick4' },
    content: 'Fantastic read, highly recommend!',
    createdAt: '2023-05-31T13:00:00Z',
  },
  {
    id: 5,
    contentId: 104,
    writer: { id: 5, username: 'user5', nickname: 'nick5' },
    content: 'Good effort but needs improvement.',
    createdAt: '2023-05-31T14:00:00Z',
  },
  {
    id: 6,
    contentId: 102,
    writer: { id: 6, username: 'user6', nickname: 'nick6' },
    content: 'Absolutely loved it!',
    createdAt: '2023-05-31T15:00:00Z',
  },
  {
    id: 7,
    contentId: 103,
    writer: { id: 7, username: 'user7', nickname: 'nick7' },
    content: 'Not my cup of tea.',
    createdAt: '2023-05-31T16:00:00Z',
  },
  {
    id: 8,
    contentId: 104,
    writer: { id: 8, username: 'user8', nickname: 'nick8' },
    content: 'Pretty decent overall.',
    createdAt: '2023-05-31T17:00:00Z',
  },
  {
    id: 9,
    contentId: 105,
    writer: { id: 9, username: 'user9', nickname: 'nick9' },
    content: 'Could not put it down!',
    createdAt: '2023-05-31T18:00:00Z',
  },
  {
    id: 10,
    contentId: 105,
    writer: { id: 10, username: 'user10', nickname: 'nick10' },
    content: 'Well written and engaging.',
    createdAt: '2023-05-31T19:00:00Z',
  },
]

export { reviews }
