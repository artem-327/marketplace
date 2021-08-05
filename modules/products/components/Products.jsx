import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
// Components
import TablesHandlers from './TablesHandlersContainer'
// Services
import { getSafe } from '../../../utils/functions'
import { DatagridProvider } from '../../datagrid'
// Constants
import { tables, addForms, editForms, importForm, edit2Forms, sidebars } from '../constants'
import { GA_TRACK_QUERY } from '../../../constants'

/**
 * @Component
 * @category Products - Components / Products
 */
const Products = props => {
  const [gaSearch, setGaSearch] = useState('')

  const { currentTab, currentEdit2Form, currentAddForm, currentEditForm, isOpenImportPopup } = props

  useEffect(() => {
    const { currentAddForm, currentEditForm, currentEdit2Form, closeAddPopup } = props
    if (currentAddForm || currentEditForm || currentEdit2Form) closeAddPopup()
  }, [])

  const renderContent = () => {
    return (
      <>
        {currentAddForm && addForms[currentTab]}
        {currentEditForm && editForms[currentTab]}
        {isOpenImportPopup && importForm[currentTab]}
        {currentEdit2Form && edit2Forms[currentTab]}
        {tables[currentTab] || <p>This page is still under construction</p>}
      </>
    )
  }

  /**
   * Get Api Config
   * @category Products - Products
   * @method
   */
  const getApiConfig = () => {
    const datagridApiMap = {
      'cas-products': {
        url: `/prodex/api/cas-products/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
          return v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'CasProduct.casIndexName', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'CasProduct.casNumber', values: [`%${v.searchInput}%`] }
              ]
            : []
        }
      },
      'product-catalog': {
        url: `/prodex/api/company-generic-products/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
          return v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'CompanyGenericProduct.name', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'CompanyGenericProduct.code', values: [`%${v.searchInput}%`] },
                {
                  operator: 'LIKE',
                  path: 'CompanyGenericProduct.company.cfDisplayName',
                  values: [`%${v.searchInput}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'CompanyGenericProduct.productGroup.name',
                  values: [`%${v.searchInput}%`]
                }
              ]
            : []
        }
      },
      'product-groups': {
        url: `/prodex/api/product-groups/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
          return v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'ProductGroup.name', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'ProductGroup.tags.name', values: [`%${v.searchInput}%`] }
              ]
            : []
        }
      }
    }

    return datagridApiMap[currentTab]
  }

  if (!getSafe(() => props.auth.identity.isAdmin, false))
    return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

  return (
    <DatagridProvider apiConfig={getApiConfig()} preserveFilters skipInitLoad>
      <Container fluid className='flex stretched'>
        <>
          <div style={{ padding: '20px 30px' }}>
            <TablesHandlers currentTab={currentTab} />
          </div>
          <div style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
            {renderContent()}
          </div>
        </>
      </Container>
      {(currentAddForm || currentEditForm) && sidebars[currentTab]}
    </DatagridProvider>
  )
}

Products.propTypes = {
  currentTab: PropTypes.string,
  currentEdit2Form: PropTypes.bool,
  currentAddForm: PropTypes.bool,
  currentEditForm: PropTypes.bool,
  isOpenImportPopup: PropTypes.bool,
  closeAddPopup: PropTypes.func,
  auth: PropTypes.object
}

Products.defaultProps = {
  currentTab: '',
  currentEdit2Form: null,
  currentAddForm: null,
  currentEditForm: null,
  isOpenImportPopup: false,
  closeAddPopup: () => {},
  auth: {}
}

export default Products
