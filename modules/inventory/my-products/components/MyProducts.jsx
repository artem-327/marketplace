import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { injectIntl, FormattedNumber, FormattedMessage } from 'react-intl'
import { debounce } from 'lodash'
import { CornerLeftDown, PlusCircle } from 'react-feather'
import { Container, Popup, Button, Input } from 'semantic-ui-react'
//Components
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import { withDatagrid } from '../../../datagrid'
import ProductPopup from './ProductPopupContainer'

import ProductImportPopup from './ProductImportPopup'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import Tutorial from '../../../tutorial/Tutorial'
import confirm from '../../../../components/Confirmable/confirm'
import { UnitOfPackaging } from '../../../../components/formatted-messages'
//Actions
import * as Actions from '../../../settings/actions'
import { openPopup, handleProductCatalogUnmappedValue } from '../../actions'
//Services
import { getSafe } from '../../../../utils/functions'
//Styles
import { CustomRowDiv } from '../../styles'
import { FileTextIcon, DivCircle, DropdownStyled } from './styles'
// Hooks
import { usePrevious } from '../../../../hooks'

const MyProducts = props => {
  const columns = [
    {
      name: 'intProductName',
      title: (
        <FormattedMessage id='global.intProductName' defaultMessage='Internal Product Name' />
      ),
      width: 250,
      sortPath: 'CompanyProduct.intProductName',
      allowReordering: false
    },
    {
      name: 'intProductCode',
      title: (
        <FormattedMessage id='global.intProductCode' defaultMessage='Internal Product Code' />
      ),
      width: 190,
      sortPath: 'CompanyProduct.intProductCode'
    },
    {
      name: 'genericProductName',
      title: (
        <FormattedMessage id='global.genericProductName' defaultMessage='Generic Product Name!' />
      ),
      width: 230,
      sortPath: 'CompanyProduct.companyGenericProduct.name'
    },
    {
      name: 'genericProductCode',
      title: (
        <FormattedMessage id='global.genericProductCode' defaultMessage='Generic Product Code!' />
      ),
      width: 200,
      sortPath: 'CompanyProduct.companyGenericProduct.code'
    },
    {
      name: 'packagingSizeFormatted',
      title: (
        <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size' />
      ),
      width: 140,
      sortPath: 'CompanyProduct.packagingSize'
    },
    {
      name: 'unit',
      title: (
        <FormattedMessage id='global.packagingUnit' defaultMessage='Packaging Unit' />
      ),
      width: 140,
      sortPath: 'CompanyProduct.packagingUnit.nameAbbreviation'
    },
    {
      name: 'packagingTypeName',
      title: (
        <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type' />
      ),
      width: 150,
      sortPath: 'CompanyProduct.packagingType.name'
    },
    {
      name: 'productGroup',
      title: (
        <FormattedMessage id='global.productGroup' defaultMessage='Product Group' />
      ),
      width: 200,
      sortPath: 'CompanyProduct.companyGenericProduct.name'
    }
  ]

  const [state, setState] = useState({
    companyGenericProduct: [],
    filterValue: {
      searchInput: '',
      productType: 'ALL'
    }
  })

  useEffect(() => {
    const { myProductsFilters } = props

    if (myProductsFilters) {
      setState({...state, ...myProductsFilters})
      const filter = myProductsFilters.filterValue
      if (filter) {
        props.datagrid.clear()
        handleFiltersValue(filter)
      }
    } else {
      const filter = state.filterValue
      if (filter) {
        props.datagrid.clear()
        handleFiltersValue(filter)
      }
    }

    return () => props.handleVariableSave('myProductsFilters', state)
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

  const handleFiltersValue = debounce(filter => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  const handleFilterChangeInputSearch = (e, data) => {
    const filter = {
      ...state.filterValue,
      [data.name]: data.value
    }
    setState({ ...state, filterValue: filter })
    handleFiltersValue(filter)
  }

  const handleFilterChangeMappedUnmapped = (e, data) => {
    props.handleProductCatalogUnmappedValue(data.value)

    const filter = {
      ...state.filterValue,
      [data.name]: data.value
    }
    setState({ ...state, filterValue: filter })
    handleFiltersValue(filter)
  }

  const getActions = () => {
    const { openPopup, deleteProduct, intl, datagrid } = props
    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openPopup(row.rawData)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        disabled: row => props.editedId === row.id,
        callback: row => {
          return confirm(
            formatMessage({ id: 'confirm.deleteProduct', defaultMessage: 'Delete Product' }),
            formatMessage(
              {
                id: 'confirm.deleteItem',
                defaultMessage: `Do you really want to delete '${row.rawData.intProductName}'?`
              },
              { item: row.rawData.intProductName }
            )
          ).then(async () => {
            try {
              await deleteProduct(row.id, row.intProductName)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
        }
      }
    ]
  }

  const getProductStatus = product => {
    let status = product.companyGenericProduct
      ? !product.companyGenericProduct.isPublished
        ? 'Unpublished'
        : ''
      : 'Unmapped'

    let popupText, dispIcon

    switch (status) {
      case 'Unpublished':
        popupText = (
          <FormattedMessage
            id='global.notPublished'
            defaultMessage='This Company Generic Product is not published and will not be shown on the Marketplace.'
          />
        )
        dispIcon = <DivCircle className='red' />
        break

      case 'Unmapped':
        popupText = (
          <FormattedMessage
            id='settings.product.unmapped'
            defaultMessage='This product is not mapped and will not show on the Marketplace.'
          />
        )
        dispIcon = <DivCircle className='red' />
        break

      default:
        popupText = (
          <FormattedMessage
            id='global.productOk'
            defaultMessage='This product is being broadcasted to the marketplace'
          />
        )
        dispIcon = <DivCircle />
    }

    return (
      <Popup
        size='small'
        header={popupText}
        trigger={<div>{dispIcon}</div>} // <div> has to be there otherwise popup will be not shown
      />
    )
  }

  const getRows = rows => {
    const { openPopup } = props

    return rows.map(r => {
      return {
        ...r,
        intProductName: (
          <ActionCell
            row={r}
            getActions={getActions}
            content={r.intProductName}
            onContentClick={() => openPopup(r.rawData)}
            leftContent={getProductStatus(r.rawData)}
          />
        )
      }
    })
  }

  const {
    rows,
    openPopup,
    openImportPopup,
    intl,
    datagrid,
    loading,
    editedId,
    isOpenPopup,
    isOpenImportPopup,
    tutorialCompleted
  } = props

  let { filterValue } = state
  const { formatMessage } = intl

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
                  value={filterValue ? filterValue.searchInput : ''}
                  placeholder={formatMessage({
                    id: 'settings.tables.products.search',
                    defaultMessage: 'Search product by name, code'
                  })}
                  onChange={handleFilterChangeInputSearch}
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
                      text: formatMessage({ id: 'operations.noSelection', defaultMessage: 'All' }),
                      value: 'ALL'
                    },
                    {
                      key: 1,
                      text: formatMessage({ id: 'operations.unmapped', defaultMessage: 'Unmapped Only' }),
                      value: 'UNMAPPED'
                    },
                    {
                      key: 2,
                      text: formatMessage({ id: 'operations.mappedOnly', defaultMessage: 'Mapped Only' }),
                      value: 'MAPPED'
                    }
                  ]}
                  name='productType'
                  value={filterValue.productType}
                  onChange={handleFilterChangeMappedUnmapped}
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
                  <FormattedMessage id='settings.tables.products.buttonAdd' />
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
            rows={getRows(rows)}
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

const mapStateToProps = (state, { datagrid }) => {
  const editedId = state.simpleAdd.isOpenPopup && state.simpleAdd.editedId ? state.simpleAdd.editedId : -1
  return {
    ...state.simpleAdd,
    editedId,
    loading: state.simpleAdd.loading || state.settings.loading,
    isOpenImportPopup: state.settings.isOpenImportPopup,
    isOpenPopup: state.simpleAdd.isOpenPopup,
    rows: datagrid.rows.map(product => {
      return {
        ...product,
        rawData: product,
        intProductName: product.intProductName,
        packagingTypeName: getSafe(() => product.packagingType.name) ? (
          <UnitOfPackaging value={product.packagingType.name} />
        ) : (
          'N/A'
        ),
        packagingType: getSafe(() => product.packagingType.id),
        packagingSize: getSafe(() => product.packagingSize, 'N/A'),
        packagingSizeFormatted: product.packagingSize ? (
          <FormattedNumber value={product.packagingSize} minimumFractionDigits={0} />
        ) : (
          'N/A'
        ),
        //packagingGroup: getSafe(() => product.packagingGroup.id),
        genericProductCode: getSafe(() => product.companyGenericProduct.code, 'N/A'),
        genericProductName: getSafe(() => product.companyGenericProduct.name, 'N/A'),
        unit: getSafe(() => product.packagingUnit.nameAbbreviation, 'N/A'),
        packagingUnit: getSafe(() => product.packagingUnit.id),
        productStatusTmp:
          product.companyGenericProduct && !product.companyGenericProduct.isPublished ? (
            <Popup
              size='small'
              header={
                <FormattedMessage
                  id='global.notPublished'
                  defaultMessage='This echo product is not published and will not show on the Marketplace.'
                />
              }
              trigger={
                <div>
                  <FileTextIcon />
                </div>
              } // <div> has to be there otherwise popup will be not shown
            />
          ) : null,
        productGroup: getSafe(
          () => product.companyGenericProduct.productGroup.name,
          <FormattedMessage id='global.unmapped.cptlz' defaultMessage='Unmapped' />
        )
      }
    }),
    action: getSafe(() => Router.router.query.action), // ! ! ?
    actionId: getSafe(() => Router.router.query.id), // ! ! ?
    tutorialCompleted: getSafe(() => state.auth.identity.tutorialCompleted, false)
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
    openPopup,
    handleProductCatalogUnmappedValue
  })(injectIntl(MyProducts))
)
