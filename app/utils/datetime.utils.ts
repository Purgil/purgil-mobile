const MToHM = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours) {
    return `${hours}시간 ${remainingMinutes}분`
  }
  return `${remainingMinutes}분`
}

export { MToHM }
