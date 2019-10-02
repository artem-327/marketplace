import React, { Component } from 'react'
import { Container, Menu, Header, Button, MenuItem, Popup, List } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { ShippingQuotes } from '~/modules/shipping'
import SubMenu from '~/src/components/SubMenu'
import { Filter } from '~/modules/filter'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'

//import { UnitOfPackaging } from '~/components/formatted-messages'
import styled from "styled-components";

const CapitalizedText = styled.span`
  text-transform: capitalize;
`

class Marketplace extends Component {
  state = {
    columns: [
      { name: 'productName', disabled: true },
      { name: 'productNumber', disabled: true },
      // { name: 'merchant', title: 'Merchant', width: 250 },
      { name: 'available', title: <FormattedMessage id='marketplace.available' defaultMessage='Available PKGs'>{(text) => text}</FormattedMessage>, width: 140 },
      { name: 'packaging', title: <FormattedMessage id='marketplace.packaging' defaultMessage='Packaging'>{(text) => text}</FormattedMessage>, width: 140 },
      { name: 'quantity', title: <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity'>{(text) => text}</FormattedMessage>, width: 140 },
      { name: 'fobPrice', title: <FormattedMessage id='marketplace.fobPrice' defaultMessage='FOB Price'>{(text) => text}</FormattedMessage>, width: 160 },
      //{ name: 'tradeName', title: <FormattedMessage id='marketplace.tradeName' defaultMessage='Trade Name'>{(text) => text}</FormattedMessage>, width: 140 },
      { name: 'manufacturer', title: <FormattedMessage id='marketplace.mfr' defaultMessage='MFR.'>{(text) => text}</FormattedMessage>, width: 120 },
      { name: 'origin', title: <FormattedMessage id='marketplace.origin' defaultMessage='Origin'>{(text) => text}</FormattedMessage>, width: 120 },
      { name: 'expiration', title: <FormattedMessage id='marketplace.expiration' defaultMessage='Expiration'>{(text) => text}</FormattedMessage>, width: 120 },
      { name: 'assay', title: <FormattedMessage id='marketplace.assay' defaultMessage='Assay'>{(text) => text}</FormattedMessage>, width: 80 },
      { name: 'condition', title: <FormattedMessage id='marketplace.condition' defaultMessage='Condition'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'form', title: <FormattedMessage id='marketplace.form' defaultMessage='Form'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'location', title: <FormattedMessage id='marketplace.location' defaultMessage='Location'>{(text) => text}</FormattedMessage>, width: 160 }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false
  }

  initData = () => {
    const { datagrid } = this.props
    datagrid.loadData()
  }

  componentDidMount() {
    //this.initData()
  }

  getRows = () => {
    const { rows } = this.props

    return rows.map(r => ({
      ...r,
      //packaging: <UnitOfPackaging value={r.packagingType} />, TODO: delete
      packaging: <>{`${r.packagingSize} ${r.packagingUnit} `}<CapitalizedText>{r.packagingType}</CapitalizedText> </>,
    }))
  }

  tableRowClicked = (clickedId) => {
    const { getProductOffer, sidebarChanged } = this.props
    let { isOpen, id } = this.props.sidebar
    getProductOffer(clickedId)

    if (id !== clickedId && id) sidebarChanged({ isOpen: true, id: clickedId, quantity: 1 })
    else sidebarChanged({ isOpen: !isOpen, id: clickedId, quantity: 1 })

  }

  handleFilterApply = filter => {
    this.props.datagrid.setFilter(filter)
  }


  handleFilterClear = () => {
    this.props.applyFilter({ filters: [] })
    this.props.datagrid.setFilter({ filters: [] })
  }

  removeFilter = (indexes) => {
    let { datagrid, appliedFilter } = this.props

    indexes.forEach((index, i) => {
      datagrid.filters.splice(index - i, 1)
      appliedFilter.filters.splice(index - i, 1)
    })


    this.props.applyFilter(appliedFilter)
    datagrid.setFilter(datagrid.filters)
  }



  render() {
    const { datagrid, intl, getAutocompleteData, autocompleteData, autocompleteDataLoading } = this.props
    const { columns, selectedRows } = this.state
    const rows = this.getRows()

    let { formatMessage } = intl

    return (
      <>
        <Container fluid style={{ padding: '0 32px' }}>

          <ShippingQuotes
            modalProps={{
              open: this.state.open,
              closeModal: () => this.setState({ open: false })
            }}
            productOfferIds={rows.reduce(function (filtered, row, rowIndex) {
              if (selectedRows.includes(rowIndex)) {
                filtered.push(row.id)
              }
              return filtered
            }, [])}
            removePopup={this.props.removePopup}
            {...this.props}
          />

          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id='allInventory.marketplace' defaultMessage='MARKETPLACE' />
              </Header>
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
                <FilterTags filters={datagrid.filters} onClick={this.removeFilter} data-test='marketplace_remove_filter' />
              </Menu.Item>
              {selectedRows.length === 0 ? null :
                <Button primary onClick={() => this.setState({ open: true })} data-test='marketplace_shipping_quote_btn'>
                  <FormattedMessage id='allInventory.shippingQuote' defaultMessage='Shipping Quote'>{(text) => text}</FormattedMessage>
                </Button>

              }
              <Menu.Item>
                <SubMenu />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
        <div class='flex stretched' style={{ padding: '10px 32px' }}>
          <ProdexGrid
            tableName='marketplace_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            rowSelection
            groupBy={['productNumber']}
            sameGroupSelectionOnly
            getChildGroups={rows =>
              _(rows)
                .groupBy('productName')
                .map(v => ({
                  key: `${v[0].productName}_${v[0].productNumber}_${v.length}`,
                  childRows: v
                }))
                .value()
            }
            renderGroupLabel={({ row: { value } }) => {
              const [name, number, count] = value.split('_')
              const numberArray = number.split(' & ')
              return (
                <span>
                  <span style={{ color: '#2599d5' }}>{numberArray.length > 1 ? (<Popup content={<List items={numberArray.map(n => { return n })} />} trigger={<span>Blend</span>} />) : number}</span>&nbsp;&nbsp; {name} <span className='right'>Product offerings: {count}</span>
                </span>
              )
            }}
            onSelectionChange={selectedRows => this.setState({ selectedRows })}
            /* COMMENTED #30916
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label') {
                this.tableRowClicked(row.id)
              }
            }}*/
            data-test='marketplace_row_action'
            rowActions={[
              { text: formatMessage({ id: 'marketplace.buy', defaultMessage: 'Buy Product Offer' }), callback: (row) => this.tableRowClicked(row.id) }
            ]}
          />
        </div>
        <Filter
          filterType={filterTypes.MARKETPLACE}
          getAutocompleteData={getAutocompleteData}
          autocompleteData={autocompleteData}
          autocompleteDataLoading={autocompleteDataLoading}
          onApply={this.handleFilterApply}
          onClear={this.handleFilterClear}
          savedUrl='/prodex/api/product-offers/broadcasted/datagrid/saved-filters'
          searchUrl={(text) => `/prodex/api/company-products/broadcasted/search?pattern=${text}&onlyMapped=true`}
          apiUrl={datagrid.apiUrl}
          filters={datagrid.filters}
        />
        <AddCart />
      </>
    )
  }
}

export default injectIntl(Marketplace)
