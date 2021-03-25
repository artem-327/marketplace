import { Component } from 'react'
import { Container, Menu, Header, Button, Popup, List, Icon, Tab, Grid, Input } from 'semantic-ui-react'
import { MoreVertical, Sliders } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import { number, boolean } from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import { Warning } from '@material-ui/icons'
import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import AddCart from '~/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import Tutorial from '~/modules/tutorial/Tutorial'
import { Datagrid } from '~/modules/datagrid'
import { debounce } from 'lodash'
import { ArrayToFirstItem } from '~/components/formatted-messages/'
import SearchByNamesAndTags from '~/modules/search'
import { getSafe } from '~/utils/functions'
import { Filter } from '~/modules/filter'
import { CustomRowDiv } from '~/modules/inventory/constants/layout'
import MakeOfferPopup from './MakeOfferPopup'

const defaultHiddenColumns = [
  'origin',
  'expiration',
  'condition',
  'form',
  'manufacturer',
  'association',
  'notes',
  'leadTime'
]

const CapitalizedText = styled.span`
  text-transform: capitalize;
`

const CustomDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CustomSearchNameTags = styled.div`
  .column {
    width: 370px;
    padding-top: 0 !important;
  }
`

const FiltersRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -5px;
`

const FlexContainerSmall = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  padding: 10px 0;
`

class Listings extends Component {
  constructor(props) {
    super(props)
    //this.getRowActions = this.getRowActions.bind(this)
    this.state = {
      columns: [
        { name: 'productGroupName', disabled: true },
        { name: 'productNumber', disabled: true },
        // { name: 'merchant', title: <FormattedMessage id='marketplace.merchant' defaultMessage='Merchant'>{(text) => text}</FormattedMessage>, width: 250 },
        {
          name: 'intProductName',
          title: (
            <FormattedMessage id='global.productName' defaultMessage='Product Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 430,
          sortPath: 'ProductOffer.companyProduct.intProductName',
          allowReordering: false
        },
        {
          name: 'packaging',
          title: (
            <FormattedMessage id='marketplace.packaging' defaultMessage='Packaging'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140
        },
        {
          name: 'available',
          title: (
            <FormattedMessage id='marketplace.available' defaultMessage='Avail PKGs'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140,
          align: 'right',
          sortPath: 'ProductOffer.pkgAvailable'
        },
        {
          name: 'quantity',
          title: (
            <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140,
          align: 'right',
          sortPath: 'ProductOffer.quantity'
        },
        {
          name: 'location',
          title: (
            <FormattedMessage id='marketplace.location' defaultMessage='Location'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        {
          name: 'fobPrice',
          title: (
            <FormattedMessage id='marketplace.fobPrice' defaultMessage='FOB Price'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160,
          align: 'right',
          sortPath: 'ProductOffer.cfPricePerUOM'
        },
        {
          name: 'manufacturer',
          title: (
            <FormattedMessage id='marketplace.manufacturer' defaultMessage='Manufacturer'>
              {text => text}
            </FormattedMessage>
          ),
          width: 220,
          sortPath: 'ProductOffer.companyProduct.companyGenericProduct.manufacturer.name'
        },
        {
          name: 'origin',
          title: (
            <FormattedMessage id='marketplace.origin' defaultMessage='Origin'>
              {text => text}
            </FormattedMessage>
          ),
          width: 120,
          sortPath: 'ProductOffer.origin.name'
        },
        {
          name: 'expiration',
          title: (
            <FormattedMessage id='marketplace.expirationDate' defaultMessage='Expiration Date'>
              {text => text}
            </FormattedMessage>
          ),
          width: 120,
          sortPath: 'ProductOffer.lotExpirationDate'
        },
        {
          name: 'condition',
          title: (
            <FormattedMessage id='marketplace.condition' defaultMessage='Condition'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          sortPath: 'ProductOffer.condition.name'
        },
        {
          name: 'form',
          title: (
            <FormattedMessage id='marketplace.form' defaultMessage='Form'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          sortPath: 'ProductOffer.form.name'
        },
        {
          name: 'association',
          title: (
            <FormattedMessage id='marketplace.association' defaultMessage='Association'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        {
          name: 'notes',
          title: (
            <FormattedMessage id='marketplace.notes' defaultMessage='Notes'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        {
          name: 'leadTime',
          title: (
            <FormattedMessage id='marketplace.leadTime' defaultMessage='Lead Time (days)'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        }
      ],
      //pageNumber: 0,
      filterValues: {
        SearchByNamesAndTags: null
      }
    }
  }

  componentDidMount() {
    const { tableHandlersFiltersListings, advancedFilters, datagrid, applyDatagridFilter } = this.props

    if (tableHandlersFiltersListings) {
      this.setState({ filterValues: tableHandlersFiltersListings }, () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags && {
            ...this.state.filterValues.SearchByNamesAndTags.filters
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
    const { sidebarChanged } = this.props
    let { isOpen, isHoldRequest } = this.props.sidebar

    this.props.handleVariableSave('tableHandlersFiltersListings', this.state.filterValues)
    if (isOpen || isHoldRequest) sidebarChanged({ isHoldRequest: false, isOpen: false })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilterReload, datagridFilter, datagrid } = this.props
    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter, datagridFilterReload, 'marketplace')
    }
  }

  toDatagridFilter = savedFilter => {
    let { filters, ...rest } = savedFilter

    return {
      filters: filters.map(filter => ({
        operator: filter.operator,
        path: filter.path,
        values: filter.values.map(val => val.value)
      })),
      //pageNumber: savedFilter.pageNumber,
      pageSize: 50
    }
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  SearchByNamesAndTagsChanged = data => {
    this.setState(
      {
        filterValues: {
          ...this.state.filterValues,
          SearchByNamesAndTags: data
        }
      },
      () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags && {
            ...this.state.filterValues.SearchByNamesAndTags.filters
          })
        }
        this.handleFiltersValue(filter)
      }
    )
  }

  getRows = () => {
    const {
      rows,
      intl: { formatMessage }
    } = this.props

    return rows.map(r => ({
      ...r,
      clsName: r.condition ? 'non-conforming' : '',
      intProductName: (
        <ActionCell
          row={r}
          getActions={this.getActions}
          content={r.intProductName}
          onContentClick={e => {
            e.stopPropagation()
            e.preventDefault()
            this.tableRowClicked(r.id)
          }}
          rightAlignedContent={
            r.expired || r.condition ? (
              <Popup
                size='small'
                inverted
                style={{
                  fontSize: '12px',
                  color: '#cecfd4',
                  opacity: '0.9'
                }}
                header={
                  <div>
                    {r.expired && (
                      <div>
                        <FormattedMessage id='global.expiredProduct.tooltip' defaultMessage='Expired Product' />
                      </div>
                    )}
                    {r.condition && (
                      <div>
                        <FormattedMessage
                          id='global.nonConforming.tooltip'
                          defaultMessage='This is a non-conforming product.'
                        />
                      </div>
                    )}
                  </div>
                }
                trigger={
                  <div>
                    <Warning className='title-icon' style={{ fontSize: '16px', color: '#f16844' }} />
                  </div>
                } // <div> has to be there otherwise popup will be not shown
              />
            ) : null
          }
        />
      ),
      condition: r.condition ? (
        <Popup
          content={r.conditionNotes}
          trigger={
            <div className='dashed-underline'>
              <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
            </div>
          } // <div> has to be there otherwise popup will be not shown
        />
      ) : (
        <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
      ),
      packaging: (
        <>
          {`${r.packagingSize} ${r.packagingUnit} `}
          <CapitalizedText>{r.packagingType}</CapitalizedText>{' '}
        </>
      ),
      notes: r.notes ? (
        <Popup
          content={r.notes}
          trigger={<CustomDiv>{r.notes}</CustomDiv>} // <div> has to be there otherwise popup will be not shown
        />
      ) : null,
      association: <ArrayToFirstItem values={r.association} rowItems={1} />
    }))
  }

  tableRowClicked = (clickedId, isHoldRequest = false, openInfo = false) => {
    const poId = parseInt(clickedId.split('_')[0])
    const { getProductOffer, sidebarChanged, isProductInfoOpen, closePopup } = this.props
    getProductOffer(poId)

    if (isProductInfoOpen) closePopup()
    sidebarChanged({ isOpen: true, id: poId, quantity: 1, isHoldRequest: isHoldRequest, openInfo: openInfo })
  }

  getActions = row => {
    const {
      isMerchant,
      isCompanyAdmin,
      openPopup,
      intl: { formatMessage }
    } = this.props
    const rowActions = []
    const buttonInfo = {
      text: formatMessage({
        id: 'marketplace.info',
        defaultMessage: 'Info'
      }),
      callback: () => this.tableRowClicked(row.id, false, true)
    }
    const buttonRequestHold = {
      text: formatMessage({
        id: 'hold.requestHold',
        defaultMessage: 'Request Hold'
      }),
      callback: () => this.tableRowClicked(row.id, true)
    }
    const buttonBuy = {
      text: formatMessage({
        id: 'marketplace.buy',
        defaultMessage: 'Buy Product Offer'
      }),
      callback: () => this.tableRowClicked(row.id)
    }
    const buttonMakeAnOffer = {
      text: formatMessage({
        id: 'marketplace.makeAnOffer',
        defaultMessage: 'Make an Offer'
      }),
      callback: () => openPopup(row.rawData)
    }
    if (isMerchant || isCompanyAdmin) {
      rowActions.push(buttonInfo)
      rowActions.push(buttonBuy)
      /* DT-293 temporary disabled rowActions.push(buttonRequestHold) */
      rowActions.push(buttonMakeAnOffer)
    } else {
      rowActions.push(buttonInfo)
      rowActions.push(buttonBuy)
      rowActions.push(buttonMakeAnOffer)
    }
    return rowActions
  }

  render = () => {
    const {
      datagrid,
      intl,
      isMerchant,
      tutorialCompleted,
      isCompanyAdmin,
      sidebar: { openInfo },
      tableHandlersFiltersListings,
      activeMarketplaceFilter,
      isOpenPopup
    } = this.props
    const { columns, openFilterPopup } = this.state
    let { formatMessage } = intl
    const rows = this.getRows()

    return (
      <Container fluid style={{ padding: '10px 25px' }} className='flex stretched'>
        {<Tutorial marginMarketplace isTutorial={false} isBusinessVerification={true} />}
        <FlexContainerSmall>
          <CustomRowDiv>
            <div>
              <div className='column'>
                <CustomSearchNameTags>
                  <SearchByNamesAndTags
                    onChange={this.SearchByNamesAndTagsChanged}
                    initFilterState={getSafe(() => tableHandlersFiltersListings.SearchByNamesAndTags, null)}
                    filterApply={false}
                    isMarketplace={true}
                  />
                </CustomSearchNameTags>
              </div>
              <div className='column'>
                <Button
                  className='light'
                  size='large'
                  primary
                  onClick={() => this.setState({ openFilterPopup: true })}
                  data-test='my_inventory_advanced_filters_btn'>
                  <Sliders />
                  {formatMessage({
                    id: 'global.filters',
                    defaultMessage: 'Filters'
                  })}
                </Button>
              </div>
              <FiltersRow>
                <FilterTags filterType='marketplace' datagrid={datagrid} />
              </FiltersRow>
            </div>

            <ColumnSettingButton />
          </CustomRowDiv>
        </FlexContainerSmall>

        <div className='flex stretched marketplace-wrapper' style={{ padding: '10px 5px' }}>
          <ProdexGrid
            defaultHiddenColumns={defaultHiddenColumns}
            tableName='marketplace_listings_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            groupBy={['productNumber']}
            getChildGroups={rows =>
              _(rows)
                .groupBy('productGroupName')
                .map(v => ({
                  key: `${v[0].productGroupName}_${v[0].productNumber}_${v[0].companyProduct.id}_${v[0].tagsNames}`,
                  groupLength: v.length,
                  childRows: v
                }))
                .value()
            }
            renderGroupLabel={
              ({ row: { value }, groupLength }) => null
              /* #35127
              {
                const [name, number, id, tagsNames] = value.split('_')
                // const numberArray = number.split(' & ')
                const tagNames = tagsNames ? tagsNames.split(',') : []
                return (
                  <span>
                    <span className='flex row right'>
                      <span>
                        {tagNames.length ? <ArrayToFirstItem values={tagNames} rowItems={5} tags={true} /> : ''}
                      </span>
                    </span>
                  </span>
                )
              }
              */
            }
            /*onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label') {
                this.tableRowClicked(row.id, false, true)
              }
            }}*/
            data-test='marketplace_listings_row_action'
          />
        </div>
        <AddCart openInfo={openInfo} />
        {openFilterPopup && <Filter onClose={() => this.setState({ openFilterPopup: false })} />}
        {isOpenPopup && <MakeOfferPopup />}
      </Container>
    )
  }
}

export default injectIntl(Listings)
