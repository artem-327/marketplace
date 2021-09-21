import { useState } from 'react'
import AllPostsContainer from './components/AllPostsContainer'
import { getSafe } from '../../../utils/functions'
import { DatagridProvider } from '../../datagrid'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'

export const AllPosts = props => {
  const [gaSearch, setGaSearch] = useState('')

  const urlApiConfig = {
    url: gaSearch ? `/prodex/api/wanted-board/other/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : '/prodex/api/wanted-board/other/datagrid',
    searchToFilter: v => {
      setGaSearch(getSafe(() => v.searchInput, ''))
      return v && v.searchInput
        ? [
            {
              operator: 'LIKE',
              path: 'WantedBoardRequest.elements.casProduct.casIndexName',
              values: [`%${v.searchInput}%`]
            },
            {
              operator: 'LIKE',
              path: 'WantedBoardRequest.elements.productGroup.name',
              values: [`%${v.searchInput}%`]
            },
            {
              operator: 'LIKE',
              path: 'WantedBoardRequest.elements.productGroup.tags.name',
              values: [`%${v.searchInput}%`]
            },
            {
              operator: 'LIKE',
              path: 'WantedBoardRequest.productSearchPattern',
              values: [`%${v.searchInput}%`]
            }
          ]
        : []
    }
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <AllPostsContainer {...props} />
      </DatagridProvider>
    </>
  )
}
