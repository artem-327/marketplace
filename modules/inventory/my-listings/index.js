// Components
import MyListingsContainer from './components/MyListingsContainer'
import { DatagridProvider } from '../../datagrid'
import { CompanyProductInfo } from '../../company-product-info'

const MyListings = () => (
  <>
    <CompanyProductInfo />
    <DatagridProvider
      apiConfig={{
        url: '/prodex/api/product-offers/own/datagrid/',
        searchToFilter: v => {
          let filters = { or: [], and: [] }
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
          if (v && v.filterCAS && v.filterCAS.length > 0) {
            v.filterCAS.map(idCAS => {
              filters.or =  filters.or.concat([{
                operator: 'EQUALS',
                path: 'ProductOffer.companyProduct.companyGenericProduct.elements.casProduct.id',
                values: [idCAS]
              }])
            })
          }
          return filters
        }
      }}
      preserveFilters
      skipInitLoad>
      <MyListingsContainer />
    </DatagridProvider>
  </>
)

export { MyListings }
