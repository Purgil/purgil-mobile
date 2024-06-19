type AdventureListReqDto = {
  searchText: string
  routeTypeCode: string
  adventureTypeCodes: string[]
  difficultyCodes: string[]
} & Pageable

export { AdventureListReqDto }
