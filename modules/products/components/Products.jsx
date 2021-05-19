import { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
// Components
import TablesHandlers from './TablesHandlersContainer'
// Services
import { withAuth } from '../../../hocs'
import { DatagridProvider, withDatagrid, Datagrid } from '../../datagrid'
// Constants
import { tables, addForms, editForms, importForm, edit2Forms, sidebars } from '../constants'

const Products = props => {
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

  const getApiConfig = () => {
    const { currentTab, companyProductUnmappedOnly } = props
    const datagridApiMap = {
      'cas-products': {
        url: '/prodex/api/cas-products/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'CasProduct.casIndexName', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'CasProduct.casNumber', values: [`%${v.searchInput}%`] }
              ]
            : []
      },
      'product-catalog': {
        url: '/prodex/api/company-generic-products/datagrid',
        searchToFilter: v =>
          v && v.searchInput
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
      },
      'product-groups': {
        url: '/prodex/api/product-groups/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'ProductGroup.name', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'ProductGroup.tags.name', values: [`%${v.searchInput}%`] }
              ]
            : []
      }
    }

    return datagridApiMap[currentTab]
  }

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

export default withDatagrid(withAuth(Products))
