type AdventureListReqDto = {
  sortBy: string
  searchText: string
  routeTypeCodes: string[]
  adventureTypeCodes: string[]
  difficultyCodes: string[]
  categoryCode?: string
}

export { AdventureListReqDto }
