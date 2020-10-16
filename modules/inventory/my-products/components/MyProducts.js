import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProdexTable from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'

import * as Actions from '~/modules/settings/actions'
import { openPopup, handleProductCatalogUnmappedValue } from '../../actions'
import Router from 'next/router'

import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl, FormattedNumber, FormattedMessage } from 'react-intl'
import { debounce } from 'lodash'
import { UnitOfPackaging } from '~/components/formatted-messages'
import { getSafe } from '~/utils/functions'
import styled from 'styled-components'
import { Clock, FileText, CornerLeftUp, CornerLeftDown, PlusCircle } from 'react-feather'
import { Container, Menu, Header, Modal, Checkbox, Popup, Button, Grid, Input, Dropdown } from 'semantic-ui-react'
import { CustomRowDiv } from '../../constants/layout'
import ProductSidebar from './ProductSidebar'
import ProductImportPopup from './ProductImportPopup'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import Tutorial from '~/modules/tutorial/Tutorial'

const FileTextIcon = styled(FileText)`
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #848893;
  line-height: 20px;
`

const Circle = styled.div`
  width: 14px;
  height: 14px;
  margin: 3px;
  border-radius: 7px;
  background-color: #84c225;
  &.red {
    background-color: #f16844;
  }
`

const StyledDropdown = styled(Dropdown)`
  z-index: 601 !important;
`

class MyProducts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'productStatus',
          title: (
            <Popup
              size='small'
              header={
                <FormattedMessage
                  id='global.productStatusIndicator'
                  defaultMessage='Status indicator if Company Product will be shown on Marketplace'
                />
              }
              trigger={
                <div>
                  <FileTextIcon />
                </div>
              } // <div> has to be there otherwise popup will be not shown
            />
          ),
          caption: <FormattedMessage id='global.productStatusIcon' defaultMessage='Product Status Icon' />,
          width: 40,
          align: 'center'
        },
        {
          name: 'intProductName',
          title: (
            <FormattedMessage id='global.intProductName' defaultMessage='Internal Product Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 200,
          sortPath: 'CompanyProduct.intProductName',
          actions: this.getActions()
        },
        {
          name: 'intProductCode',
          title: (
            <FormattedMessage id='global.intProductCode' defaultMessage='Internal Product Code'>
              {text => text}
            </FormattedMessage>
          ),
          width: 190,
          sortPath: 'CompanyProduct.intProductCode'
        },
        {
          name: 'genericProductName',
          title: (
            <FormattedMessage id='global.genericProductName' defaultMessage='Generic Product Name!'>
              {text => text}
            </FormattedMessage>
          ),
          width: 230,
          sortPath: 'CompanyProduct.companyGenericProduct.name'
        },
        {
          name: 'genericProductCode',
          title: (
            <FormattedMessage id='global.genericProductCode' defaultMessage='Generic Product Code!'>
              {text => text}
            </FormattedMessage>
          ),
          width: 200,
          sortPath: 'CompanyProduct.companyGenericProduct.code'
        },
        {
          name: 'packagingSizeFormatted',
          title: (
            <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140,
          sortPath: 'CompanyProduct.packagingSize'
        },
        {
          name: 'unit',
          title: (
            <FormattedMessage id='global.packagingUnit' defaultMessage='Packaging Unit'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140,
          sortPath: 'CompanyProduct.packagingUnit.nameAbbreviation'
        },
        {
          name: 'packagingTypeName',
          title: (
            <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150,
          sortPath: 'CompanyProduct.packagingType.name'
        },
        {
          name: 'productGroup',
          title: (
            <FormattedMessage id='global.productGroup' defaultMessage='Product Group'>
              {text => text}
            </FormattedMessage>
          ),
          width: 200,
          sortPath: 'CompanyProduct.companyGenericProduct.name'
        }
      ],
      companyGenericProduct: [],
      filterValue: {
        searchInput: '',
        productType: 'ALL'
      }
    }
  }

  componentDidMount() {
    const { myProductsFilters } = this.props

    if (myProductsFilters) {
      this.setState(myProductsFilters)
      const filter = myProductsFilters.filterValue
      if (filter) {
        this.props.datagrid.clear()
        this.handleFiltersValue(filter)
      }
    } else {
      const filter = this.state.filterValue
      if (filter) {
        this.props.datagrid.clear()
        this.handleFiltersValue(filter)
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { action, actionId, loaded, openPopup, rows } = this.props

    if (action === 'edit' && actionId && loaded) {
      const editRow = rows.find(function (product) {
        return product.id === parseInt(actionId)
      })
      openPopup(editRow)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('myProductsFilters', this.state)
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  handleFilterChangeInputSearch = (e, data) => {
    const filter = {
      ...this.state.filterValue,
      [data.name]: data.value
    }
    this.setState({ filterValue: filter })
    this.handleFiltersValue(filter)
  }

  handleFilterChangeMappedUnmapped = (e, data) => {
    this.props.handleProductCatalogUnmappedValue(data.value)

    const filter = {
      ...this.state.filterValue,
      [data.name]: data.value
    }
    this.setState({ filterValue: filter })
    this.handleFiltersValue(filter)
  }

  getActions = () => {
    const { openPopup, deleteProduct, intl, datagrid } = this.props
    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openPopup(row.rawData)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        disabled: row => this.props.editedId === row.id,
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

  render() {
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
    } = this.props

    let { columns, filterValue } = this.state
    const { formatMessage } = intl

    return (
      <>
        {!tutorialCompleted && <Tutorial />}

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
                      defaultMessage: 'Search product by name, number ...'
                    })}
                    onChange={this.handleFilterChangeInputSearch}
                  />
                </div>
              </div>

              <div>
                <div className='column'>
                  <StyledDropdown
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
                    onChange={this.handleFilterChangeMappedUnmapped}
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
                    <FormattedMessage id='settings.tables.products.buttonImport'>{text => text}</FormattedMessage>
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
                    <FormattedMessage id='settings.tables.products.buttonAdd'>{text => text}</FormattedMessage>
                  </Button>
                </div>
                <ColumnSettingButton divide={true} />
              </div>
            </CustomRowDiv>
          </div>
          <div className='flex stretched inventory-wrapper' style={{ padding: '10px 0' }}>
            <ProdexTable
              tableName='inventory_my_products'
              {...datagrid.tableProps}
              loading={datagrid.loading || loading}
              rows={rows}
              columns={columns}
              style={{ marginTop: '5px' }}
              defaultSorting={{
                columnName: 'intProductName',
                sortPath: 'CompanyProduct.intProductName',
                direction: 'asc'
              }}
              editingRowId={editedId}
              columnActions='intProductName'
            />
          </div>
        </Container>
        {isOpenImportPopup && <ProductImportPopup />}
        {isOpenPopup && <ProductSidebar />}
      </>
    )
  }
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
      dispIcon = <Circle className='red' />
      break

    case 'Unmapped':
      popupText = (
        <FormattedMessage
          id='settings.product.unmapped'
          defaultMessage='This product is not mapped and will not show on the Marketplace.'
        />
      )
      dispIcon = <Circle className='red' />
      break

    default:
      popupText = (
        <FormattedMessage
          id='global.productOk'
          defaultMessage='This product is being broadcasted to the marketplace'
        />
      )
      dispIcon = <Circle />
  }

  return (
    <Popup
      size='small'
      header={popupText}
      trigger={<div>{dispIcon}</div>} // <div> has to be there otherwise popup will be not shown
    />
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
        intProductName: (
          <div style={{ fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.intProductName}
          </div>
        ),
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
        productStatus: getProductStatus(product),
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
          <FormattedMessage id='global.unmapped.cptlz' defaultMessage='Unmapped'>
            {text => text}
          </FormattedMessage>
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
