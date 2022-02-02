import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { CornerLeftDown, PlusCircle } from 'react-feather'
import { Container, Button, Input } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Router from 'next/router'
// Components
import ProdexTable from '../../../../components/table'
import ProductPopup from './ProductPopupContainer'
import ProductImportPopup from './ProductImportPopupContainer'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import Tutorial from '../../../tutorial/Tutorial'
// Services
import { columns, handleFiltersValue, handleFilterChangeInputSearch, handleFilterChangeMappedUnmapped, getRows } from './MyProducts.services'
import { getSafe } from '../../../../utils/functions'
// Styles
import { CustomRowDiv } from '../../styles'
import { DropdownStyled } from './MyProducts.styles'
// Hooks
import { usePrevious } from '../../../../hooks'

/**
 * MyProducts Component
 * @category Inventory - My Products
 * @components
 */
const MyProducts = props => {
  const [state, setState] = useState({
    companyGenericProduct: [],
    filterValue: {
      searchInput: '',
      productType: 'ALL'
    }
  })

  useEffect(async () => {
    const { myProductsFilters } = props

    if (myProductsFilters) {
      setState(myProductsFilters)
      const filter = myProductsFilters.filterValue
      if (filter) {
        props.datagrid.clear()
        handleFiltersValue(filter, props)
      }
    } else {
      const filter = state.filterValue
      if (filter) {
        props.datagrid.clear()
        handleFiltersValue(filter, props)
      }
    }

    const productId = getSafe(() => Router.router.query.cgp_id, '')

    if (productId && !isNaN(parseInt(productId))) {
      let genericProduct
      try {
        genericProduct = await props.getCompanyGenericProductById(parseInt(productId))
            .then(response => response.value.company.id !== props.currentCompany.id ? null : response.value)
      } catch (e) {
        console.error(e)
      }
      props.openPopupPreFilledProduct(genericProduct ? { initGenericProductId: genericProduct.id } : null)
    }
  }, [])

  const prevProps = usePrevious(props)

  useEffect(() => {
    if (typeof prevProps !== 'undefined') {
      const { action, actionId, loaded, openPopup, rows } = props

      if (action === 'edit' && actionId && loaded) {
        const editRow = rows.find(function (product) {
          return product.id === parseInt(actionId)
        })
        openPopup(editRow)
      }
    }
  }, [props])

  const {
    rows,
    openPopup,
    openImportPopup,
    intl: {formatMessage},
    datagrid,
    loading,
    editedId,
    isOpenPopup,
    isOpenImportPopup
  } = props

  return (
    <>
      {<Tutorial isTutorial={false} isBusinessVerification={true} />}

      <Container fluid style={{ padding: '0px 30px' }} className='flex stretched'>
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column'>
                <Input
                  style={{ width: '370px' }}
                  icon='search'
                  name='searchInput'
                  value={state.filterValue.searchInput}
                  placeholder={formatMessage({
                    id: 'settings.tables.products.search',
                    defaultMessage: 'Search product by name, code'
                  })}
                  onChange={(e, data) => handleFilterChangeInputSearch(data, props, state, setState)}
                />
              </div>
            </div>

            <div>
              <div className='column'>
                <DropdownStyled
                  style={{ width: '200px' }}
                  placeholder={formatMessage({
                    id: 'operations.tables.companyProductCatalog.MappedText',
                    defaultMessage: 'Select mapped/unmapped only'
                  })}
                  selection
                  options={[
                    {
                      key: 0,
                      text: <FormattedMessage id='operations.noSelection' defaultMessage='All' />,
                      value: 'ALL'
                    },
                    {
                      key: 1,
                      text: <FormattedMessage id='operations.unmapped' defaultMessage='Unmapped Only' />,
                      value: 'UNMAPPED'
                    },
                    {
                      key: 2,
                      text: <FormattedMessage id='operations.mappedOnly' defaultMessage='Mapped Only' />,
                      value: 'MAPPED'
                    }
                  ]}
                  name='productType'
                  value={state.filterValue.productType}
                  onChange={(e, data) => handleFilterChangeMappedUnmapped(data, props, state, setState)}
                  data-test='settings_dwolla_unmapped_only_drpdn'
                />
              </div>
              <div className='column'>
                <Button
                  className='light'
                  size='large'
                  primary
                  onClick={() => openImportPopup()}
                  data-test='settings_open_import_popup_btn'>
                  <CornerLeftDown />
                  <FormattedMessage id='settings.tables.products.buttonImport' />
                </Button>
              </div>
              <div className='column'>
                <Button
                  className='secondary'
                  size='large'
                  primary
                  onClick={() => openPopup()}
                  data-test='settings_open_popup_btn'>
                  <PlusCircle />
                  <FormattedMessage id='settings.tables.SKUs.buttonAdd' defaultMessage="Add SKU" />
                </Button>
              </div>
              <ColumnSettingButton divide={true} />
            </div>
          </CustomRowDiv>
        </div>
        <div className='flex stretched inventory-wrapper listings-wrapper' style={{ padding: '10px 0' }}>
          <ProdexTable
            tableName='inventory_my_products'
            {...datagrid.tableProps}
            loading={datagrid.loading || loading}
            rows={getRows(rows, props)}
            columns={columns}
            style={{ marginTop: '5px' }}
            defaultSorting={{
              columnName: 'intProductName',
              sortPath: 'CompanyProduct.intProductName',
              direction: 'asc'
            }}
            editingRowId={editedId}
          />
        </div>
      </Container>
      {isOpenImportPopup && <ProductImportPopup />}
      {isOpenPopup && <ProductPopup />}
    </>
  )
}

MyProducts.propTypes = {
  myProductsFilters: PropTypes.object,
  datagrid: PropTypes.object,
  intl: PropTypes.object,
  action: PropTypes.string,
  rows: PropTypes.array,
  actionId: PropTypes.number,
  editedId: PropTypes.number,
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  isOpenPopup: PropTypes.bool,
  isOpenImportPopup: PropTypes.bool,
  openPopup: PropTypes.func,
  openImportPopup: PropTypes.func,
  handleVariableSave: PropTypes.func,
  handleProductCatalogUnmappedValue: PropTypes.func,
  deleteProduct: PropTypes.func,
  currentCompany: PropTypes.object
}

MyProducts.defaultProps = {
  myProductsFilters: null,
  datagrid: {},
  intl: {},
  action: '',
  rows: [],
  actionId: null,
  editedId: null,
  loaded: false,
  loading: false,
  isOpenPopup: false,
  isOpenImportPopup: false,
  openPopup: () => {},
  openImportPopup: () => {},
  handleVariableSave: () => {},
  handleProductCatalogUnmappedValue: () => {},
  deleteProduct: () => {},
  currentCompany: {}
}

export default injectIntl(MyProducts)
