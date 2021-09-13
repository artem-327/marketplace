import AllPostsContainer from './components/AllPostsContainer'
import { DatagridProvider } from '../../datagrid'

export const AllPosts = props => {

  const urlApiConfig = {
    url: '/prodex/api/wanted-board/other/datagrid',
    searchToFilter: v => {
      let filters = { or: [], and: [], url: '' }
      if (v && v.filterName && v.filterName.length > 0) {
        v.filterName.map(name => {
          filters.or = filters.or.concat([
            { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${name}%`] },
            { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${name}%`] }
          ])
        })
      }
      if (v && v.filterTags && v.filterTags.length > 0) {
        v.filterTags.map(idTag => {
          filters.or =  filters.or.concat([{
            operator: 'EQUALS',
            path: 'ProductOffer.companyProduct.companyGenericProduct.productGroup.tags.id',
            values: [idTag]
          }])
        })
      }
      return filters
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
