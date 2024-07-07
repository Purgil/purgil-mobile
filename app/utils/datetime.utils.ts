import dayjs from 'dayjs'

const MToHM = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours) {
    return `${hours}시간 ${remainingMinutes}분`
  }
  return `${remainingMinutes}분`
}

const formatDatetime = (datetime: string) => {
  return dayjs(datetime).format('YYYY년 M월 D일 H시 m분')
}

export { MToHM, formatDatetime }
