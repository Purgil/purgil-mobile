type ValueLabelPair = {
  value: any
  label: string
}

type Image = {
  uri: string
  fileSize: number
  width: number
  height: number
  extension: string
}

type SimultaneousRefs = {
  scrollRef: any
  swiperRef: any
}

type Pageable = {
  page: number
  size: number
}

export type Option = {
  icon?: string
} & ValueLabelPair

export const { ValueLabelPair, Image, SimultaneousRefs, Pageable, Option }
