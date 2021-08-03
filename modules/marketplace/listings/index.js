import { connect } from 'react-redux'
// Components
import ListingsContainer from './components/ListingsContainer'
import { DatagridProvider } from '../../datagrid'
import { CompanyProductInfo } from '../../company-product-info'
// Selectors
import { makeGetSelectedSellerOption } from '../selectors'

const Listings = props => {
  const { selectedSellerOption } = props
  const urlApiConfig = {
    url: `/prodex/api/product-offers/broadcasted/datagrid${selectedSellerOption && selectedSellerOption.value ? `?sellerCompanyId=${selectedSellerOption.value}` : ''}`,
    searchToFilter: v => {
      let filters = { or: [], and: [] }
      if (v && v.filterName && v.filterName.length > 0) {
        v.filterName.map(name => {
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

const makeMapStateToProps = () => {
  const getSelectedSellerOption = makeGetSelectedSellerOption()

  const mapStateToProps = (store) => {
    return {
      selectedSellerOption: getSelectedSellerOption(store)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, null)(Listings)