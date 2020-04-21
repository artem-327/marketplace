import * as AT from './action-types'
import * as api from './api'

export const searchTags = tag => ({
  type: AT.SEARCH_TAGS,
  payload: api.searchTags({
    orFilters: [
      {
        operator: 'LIKE',
        path: 'Tag.name',
        values: [tag.toString()]
      }
    ],
    pageNumber: 0,
    pageSize: 50
  })
})

export function applyDatagridFilter(filter) {
  return {
    type: AT.APPLY_FILTER,
    payload: filter
  }
}
