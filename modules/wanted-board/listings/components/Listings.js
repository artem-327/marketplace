import React, { Component } from 'react'
import { Container, Input, Button, } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import { debounce } from 'lodash'
import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import DetailSidebar from './DetailSidebar'
import { Datagrid } from '~/modules/datagrid'
import { SubmitOffer } from './SubmitOffer/index'
import { PlusCircle } from 'react-feather'
import Tutorial from '~/modules/tutorial/Tutorial'
import {
  CustomRowDiv,
  ProductChemicalSwitch
} from '../../constants/layout'
import { getSafe } from '~/utils/functions'

class Listings extends Component {
  state = {
    columnsProduct: [
      {
        name: 'product',
        title: (
          <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
            {text => text}
          </FormattedMessage>
        ),
        width: 290
        //align: 'right',
        //sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'casNumber',
        title: (
          <FormattedMessage id='wantedBoard.casNumber' defaultMessage='CAS Number'>
            {text => text}
          </FormattedMessage>
        ),
        width: 225,
        disabled: true
      },
      {
        name: 'assay',
        title: (
          <FormattedMessage id='wantedBoard.assay' defaultMessage='Assay'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        disabled: true
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 420
      },
      */
      {
        name: 'form',
        title: (
          <FormattedMessage id='wantedBoard.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='wantedBoard.maxPrice' defaultMessage='Max Price/Unit'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='wantedBoard.quantityNeeded' defaultMessage='Quantity Needed'>
            {text => text}
          </FormattedMessage>
        ),
        width: 180
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'createdAt',
        title: (
          <FormattedMessage id='wantedBoard.datePost' defaultMessage='Date Post'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'PurchaseRequest.createdAt'
      }
    ],
    columnsChemical: [
      {
        name: 'product',
        title: (
          <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
            {text => text}
          </FormattedMessage>
        ),
        width: 290,
        disabled: true
        //align: 'right',
        //sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'casNumber',
        title: (
          <FormattedMessage id='wantedBoard.casNumber' defaultMessage='CAS Number'>
            {text => text}
          </FormattedMessage>
        ),
        width: 225
      },
      {
        name: 'assay',
        title: (
          <FormattedMessage id='wantedBoard.assay' defaultMessage='Assay'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 420
      },
      */
      {
        name: 'form',
        title: (
          <FormattedMessage id='wantedBoard.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='wantedBoard.maxPrice' defaultMessage='Max Price/Unit'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='wantedBoard.quantityNeeded' defaultMessage='Quantity Needed'>
            {text => text}
          </FormattedMessage>
        ),
        width: 180
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'createdAt',
        title: (
          <FormattedMessage id='wantedBoard.datePost' defaultMessage='Date Post'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'PurchaseRequest.createdAt',
        disabled: true
      }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false,
    popupValues: null,
    filterValues: {
      searchInput: ''
    }
  }

  componentDidMount() {
    const { tableHandlersFiltersListings } = this.props

    if (tableHandlersFiltersListings) {
      this.setState({ filterValues: tableHandlersFiltersListings }, () => {
        const filter = {
          ...this.state.filterValues
        }
        this.handleFiltersValue(filter)
      })
    } else {
      this.handleFiltersValue(this.state.filterValues)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersListings', this.state.filterValues)
    if (this.props.editWindowOpen) this.props.closeDetailSidebar()
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid && datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  handleProductChemicalSwitch = data => {
    const { datagrid } = this.props
    this.props.setWantedBoardType(data)
    datagrid.clear()
    const filter = {
      ...this.state.filterValues
    }
    this.handleFiltersValue(filter)
  }

  handleFilterChangeInputSearch = (e, data) => {
    if (!data) return
    e && e.stopPropagation()
    this.setState({
      filterValues: {
        searchInput: data.value
      }
    })
    const filter = {
      filterName: data.value
    }
    this.handleFiltersValue(filter)
  }

  renderContent = () => {
    const {
      datagrid,
      intl,
      rows,
      editedId,
      sidebarDetailTrigger,
      openedSubmitOfferPopup,
      type,
      popupValues,
      tutorialCompleted
    } = this.props
    const { columnsProduct, columnsChemical, filterValues } = this.state
    let { formatMessage } = intl

    return (
      <>
        {!tutorialCompleted && <Tutorial marginWantedBoard />}
        {openedSubmitOfferPopup && <SubmitOffer {...popupValues} />}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div className='column'>
              <Input
                style={{ width: 340 }}
                name='searchInput'
                icon='search'
                value={filterValues.searchInput}
                placeholder={formatMessage({
                  id: 'wantedBoard.searchByProductName',
                  defaultMessage: 'Search by product name...'
                })}
                onChange={this.handleFilterChangeInputSearch}
              />
            </div>
            <div>
              <div className='column'>
                <ProductChemicalSwitch className={type}>
                  <Button
                    attached='left'
                    onClick={() => this.handleProductChemicalSwitch('product')}
                    data-test='wanted_board_product_switch_btn'>
                    <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                  <Button
                    attached='right'
                    onClick={() => this.handleProductChemicalSwitch('chemical')}
                    data-test='wanted_board_chemical_switch_btn'>
                    <FormattedMessage id='wantedBoard.chemical' defaultMessage='Chemical'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </ProductChemicalSwitch>
              </div>
              <div className='column'>
                <Button
                  className='secondary'
                  primary
                  onClick={() => sidebarDetailTrigger(null, 'wanted-board')}
                  data-test='wanted_board_open_popup_btn'>
                  <PlusCircle />
                  <FormattedMessage id='wantedBoard.requestProduct' defaultMessage='Request Product'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </div>
            </div>
          </CustomRowDiv>
        </div>
        <div className='flex stretched' style={{ padding: '10px 0 20px 0' }}>
          <ProdexGrid
            tableName={`wanted_board_${type}_grid`}
            {...datagrid.tableProps}
            rows={rows}
            columns={type === 'product' ? columnsProduct : columnsChemical}
            rowSelection={false}
            showSelectionColumn={false}
            rowActions={[
              {
                text: formatMessage({
                  id: 'wantedBoard.submitOffer',
                  defaultMessage: 'Submit Offer'
                }),
                callback: row => this.props.openSubmitOffer(row)
              }
            ]}
          />
        </div>
      </>
    )
  }

  render() {
    const {
      openSidebar
    } = this.props

    return (
      <>
        <Container fluid style={{ padding: '10px 30px 0 30px' }} className='flex stretched'>
          {this.renderContent()}
        </Container>
        {openSidebar && <DetailSidebar />}
      </>
    )
  }
}

export default injectIntl(Listings)
