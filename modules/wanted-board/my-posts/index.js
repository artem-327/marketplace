import { useState } from 'react'
import MyPostsContainer from './components/MyPostsContainer'
import { getSafe } from '../../../utils/functions'
import { DatagridProvider } from '../../datagrid'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'

export const MyPosts = props => {
  const [gaSearch, setGaSearch] = useState('')

  const urlApiConfig = {
    url: gaSearch ? `/prodex/api/wanted-board/own/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : '/prodex/api/wanted-board/own/datagrid',
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
        <MyPostsContainer {...props} />
      </DatagridProvider>
    </>
  )
}
