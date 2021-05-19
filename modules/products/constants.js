//Components
import { FormattedMessage } from 'react-intl'
import CasProductsTable from './components/CasProductsTable/CasProductsTableContainer'
import ProductCatalogTable from './components/ProductCatalogTable/TableContainer'
import EditAltNamesCasProductsPopup from './components/CasProductsTable/EditAltNamesCasProductsPopupContainer'
import EditAltNamesEchoProductPopup from './components/ProductCatalogTable/EditAltNamesEchoProductPopupContainer'
import ProductImportPopup from '../inventory/my-products/components/ProductImportPopup'
import CasProductsSidebar from './components/CasProductsTable/CasProductsSidebarContainer'
import ProductGroupsTable from './components/ProductGroups/ProductGroupsTableContainer'
import ProductGroupsPopup from './components/ProductGroups/ProductGroupsPopupContainer'
import AddEditEchoProduct from './components/ProductCatalogTable/AddEditEchoProductContainer'


export const defaultTabs = [
  { name: 'CAS Products', id: 0, type: 'cas-products' },
  { name: 'Product Catalog', id: 1, type: 'product-catalog' },
  { name: 'Product Groups', id: 2, type: 'product-groups' }
]

export const textsTable = {
  'cas-products': {
    BtnAddText: 'products.casProducts.buttonAdd',
    SearchText: 'products.casProducts.search'
  },
  'product-catalog': {
    BtnAddText: 'products.productCatalog.buttonAdd',
    SearchText: 'products.productCatalog.search'
  },
  'product-groups': {
    BtnAddText: 'products.productGroups.buttonAdd',
    SearchText: 'products.productGroups.search'
  }
}

export const tables = {
  'cas-products': <CasProductsTable />,
  'product-catalog': <ProductCatalogTable />,
  'product-groups': <ProductGroupsTable handleFilterChange={()=>{}} />
}

export const addForms = {
  'cas-products': <CasProductsSidebar />,
  'product-groups': <ProductGroupsPopup />
}

export const editForms = {
  'cas-products': <CasProductsSidebar />,
  'product-groups': <ProductGroupsPopup />
}

export const edit2Forms = {
  'cas-products': <EditAltNamesCasProductsPopup />,
  'product-catalog': <EditAltNamesEchoProductPopup />
}

export const importForm = {
  'product-catalog': <ProductImportPopup />
}

export const sidebars = {
  'product-catalog': <AddEditEchoProduct />
}

export const productGroupsTableColumns =
[
  {
    name: 'name',
    title: (
      <FormattedMessage id='product.groups.name' defaultMessage='Group Name' />
    ),
    sortPath: 'ProductGroup.name',
    allowReordering: false
  },
  {
    name: 'tags',
    title: (
      <FormattedMessage id='product.groups.tags' defaultMessage='Tags' />
    )
  }
]  

export const casProductsTableColumns = [
  {
    name: 'casIndexName',
    title: (
      <FormattedMessage id='global.indexName' defaultMessage='Index Name' />
    ),
    width: 375,
    sortPath: 'CasProduct.casIndexName',
    allowReordering: false
  },
  {
    name: 'casNumber',
    title: (
      <FormattedMessage id='global.casNumber' defaultMessage='CAS Number' />
    ),
    width: 150,
    sortPath: 'CasProduct.casNumber'
  }
]
