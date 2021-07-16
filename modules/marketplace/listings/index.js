import ListingsContainer from './components/ListingsContainer'
import { connect } from 'react-redux'
import { DatagridProvider } from '../../datagrid'
import { CompanyProductInfo } from '../../company-product-info'

const Listings = props => {
  const { selectedSellerOption } = props
  const urlApiConfig = {
    url: `/prodex/api/product-offers/broadcasted/datagrid${selectedSellerOption && selectedSellerOption.value ? `?sellerCompanyId=${selectedSellerOption.value}` : ''}`,
    searchToFilter: v => {
      let filters = { or: [], and: [] }
      if (v && v.filterName && v.filterName.length > 0) {
        v.filterName.forEach(name =>
          filters.or = filters.or.concat(
            [
              // { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${name}%`] },
              // { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${name}%`] },
              {
                operator: 'LIKE',
                path: 'ProductOffer.companyProduct.companyGenericProduct.name',
                values: [`%${name}%`]
              },
              {
                operator: 'LIKE',
                path: 'ProductOffer.companyProduct.companyGenericProduct.productGroup.tags.name',
                values: [`%${name}%`]
              }
            ]
          )
        )
      }
      if (v && v.filterTags && v.filterTags.length > 0) {
        filters.and.push(v.filterTags.map(idTag => {
          return {
            operator: 'EQUALS',
            path: 'ProductOffer.companyProduct.companyGenericProduct.productGroup.tags.id',
            values: [idTag]
          }
        }))
      }
      if (v && v.filterCAS && v.filterCAS.length > 0) {
        filters.and.push(v.filterCAS.map(idCAS => {
          return {
            operator: 'EQUALS',
            path: 'ProductOffer.companyProduct.companyGenericProduct.elements.id',
            values: [idCAS]
          }
        }))
      }
      return filters
    }
  }

  return (
    <>
      <CompanyProductInfo fromMarketPlace />
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <ListingsContainer {...props} />
      </DatagridProvider>
    </>
  )
}

function mapStateToProps(store) {
  return {
    selectedSellerOption: store.marketplace.selectedSellerOption
  }
}

export default connect(mapStateToProps, null)(Listings)