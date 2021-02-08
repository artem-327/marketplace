import { Component } from 'react'
import { Container, Input, Button, Dropdown } from 'semantic-ui-react'
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
import { PlusCircle, Sliders, MoreVertical } from 'react-feather'
import Tutorial from '~/modules/tutorial/Tutorial'
import { CustomRowDiv } from '../../constants/layout'
import ActionCell from '~/components/table/ActionCell'
import { getSafe } from '~/utils/functions'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import SearchInput from '../../components/SearchInput'
import styled from 'styled-components'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { WantedBoardFilter } from '~/modules/filter'

const FiltersRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -5px;
`

const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
`

class Listings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'product',
          title: (
            <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
              {text => text}
            </FormattedMessage>
          ),
          width: 290,
          allowReordering: false
          //align: 'right',
          //sortPath: 'ProductOffer.pkgAvailable'
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
          sortPath: 'PurchaseRequest.createdAt'
        }
      ],
      selectedRows: [],
      pageNumber: 0,
      open: false,
      popupValues: null,
      filterValues: {
        searchByNamesAndCas: null
      },
      openFilterPopup: false
    }
  }

  componentDidMount() {
    const { tableHandlersFiltersListings, advancedFilters, applyDatagridFilter, datagrid } = this.props

    if (tableHandlersFiltersListings) {
      this.setState({ filterValues: tableHandlersFiltersListings }, () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.searchByNamesAndCas && {
            ...this.state.filterValues.searchByNamesAndCas.filters
          })
        }
        datagrid.setSearch(filter, !advancedFilters.filters, 'pageFilters')
      })
    } else {
      datagrid.setSearch(this.state.filterValues, !advancedFilters.filters, 'pageFilters')
    }

    if (advancedFilters.filters) {
      let datagridFilter = this.toDatagridFilter(advancedFilters)
      applyDatagridFilter(datagridFilter, true)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersListings', this.state.filterValues)
    if (this.props.openSidebar && this.props.activeTab === 'listings') this.props.closeDetailSidebar()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilterReload, datagridFilter, datagrid } = this.props
    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter, datagridFilterReload, 'wantedBoardListings')
    }
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid && datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  SearchByNamesAndCasChanged = data => {
    this.setState(
      {
        filterValues: {
          ...this.state.filterValues,
          searchByNamesAndCas: data
        }
      },
      () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.searchByNamesAndCas && {
            ...this.state.filterValues.searchByNamesAndCas.filters
          })
        }
        this.handleFiltersValue(filter)
      }
    )
  }

  toDatagridFilter = savedFilter => {
    let { filters, ...rest } = savedFilter

    return {
      filters: filters.map(filter => ({
        operator: filter.operator,
        path: filter.path,
        values: filter.values.map(val => val.value)
      })),
      pageNumber: 0,
      pageSize: 50
    }
  }

  getActions = () => {
    const { intl } = this.props
    let { formatMessage } = intl
    return [
      {
        text: formatMessage({
          id: 'wantedBoard.submitOffer',
          defaultMessage: 'Submit Offer'
        }),
        callback: async row => {
          try {
            this.props.openSubmitOffer(row)
          } catch (e) {
            console.error(e)
          }
        }
      }
    ]
  }

  getRows = rows => {
    return rows.map(r => {
      return {
        ...r,
        product: <ActionCell row={r} getActions={this.getActions} content={r.product} />
      }
    })
  }

  renderContent = () => {
    const {
      datagrid,
      intl,
      rows,
      editedId,
      sidebarDetailTrigger,
      openedSubmitOfferPopup,
      popupValues,
      tutorialCompleted,
      tableHandlersFiltersListings
    } = this.props
    const { columns, filterValues, openFilterPopup } = this.state
    let { formatMessage } = intl

    return (
      <>
        {<Tutorial marginWantedBoard isTutorial={false} isBusinessVerification={true} />}
        {openedSubmitOfferPopup && <SubmitOffer {...popupValues} />}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column' style={{ width: '340px' }}>
                <SearchInput
                  onChange={this.SearchByNamesAndCasChanged}
                  initFilterState={getSafe(() => tableHandlersFiltersListings.searchByNamesAndCas, null)}
                  filterApply={false}
                />
              </div>
              <div className='column'>
                <Button
                  className='light'
                  size='large'
                  primary
                  onClick={() => this.setState({ openFilterPopup: true })}
                  data-test='wanted_board_advanced_filters_btn'>
                  <Sliders />
                  {formatMessage({
                    id: 'global.filters',
                    defaultMessage: 'Filters'
                  })}
                </Button>
              </div>
              <FiltersRow>
                <FilterTags filterType='wantedBoardListings' datagrid={datagrid} />
              </FiltersRow>
            </div>
            <div>
              <div className='column'>
                <Button
                  className='secondary'
                  primary
                  onClick={() => sidebarDetailTrigger(null, 'listings')}
                  data-test='wanted_board_open_popup_btn'>
                  <PlusCircle />
                  <FormattedMessage id='wantedBoard.requestProduct' defaultMessage='Request Product'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </div>
              <ColumnSettingButton divide={true} />
            </div>
          </CustomRowDiv>
        </div>
        <div className='flex stretched listings-wrapper' style={{ padding: '10px 0 20px 0' }}>
          <ProdexGrid
            tableName={'wanted_board_listings_grid'}
            {...datagrid.tableProps}
            rows={this.getRows(rows)}
            columns={columns}
            rowSelection={false}
            showSelectionColumn={false}
          />
        </div>
        {openFilterPopup && <WantedBoardFilter onClose={() => this.setState({ openFilterPopup: false })} />}
      </>
    )
  }

  render() {
    const { openSidebar } = this.props

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
