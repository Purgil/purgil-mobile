type RouteListQuery = {
  sortBy: string
  searchText: string
  routeTypeCodes: string[]
  adventureTypeCodes: string[]
  difficultyCodes: string[]
  categoryCodes: string[]
  minLength?: number
  maxLength?: number
  minElvGain?: number
  maxElvGain?: number
  minHighestPoint?: number
  maxHighestPoint?: number
  minRating?: number
}

export { RouteListQuery }
