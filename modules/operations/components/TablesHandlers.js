import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Menu, Button, Input, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { debounce } from 'lodash'
import styled from 'styled-components'

import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomGridRow = styled(GridRow)`
  padding: 0 !important;
  margin: 10px 0 10px 4px !important;
`

const textsTable = {
  'shipping-quotes': {
    BtnAddText: 'operations.tables.shippingQuotes.buttonAdd',
    SearchText: 'operations.tables.shippingQuotes.search'
  },
  tags: {
    BtnAddText: 'operations.tables.tags.buttonAdd',
    SearchText: 'operations.tables.tags.search'
  },
  'company-product-catalog': {
    SearchText: 'operations.tables.companyProductCatalog.search'
  },
  'company-inventory': {
    SearchText: 'operations.tables.companyInventory.search'
  }
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: ''
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '' })
      this.handleFiltersValue('')
    }
  }

  handleFiltersValue = value => {
    const { handleFiltersValue } = this.props
    //TODO temporary - missing filter path in BE for carrierName (shipment/manual-quotes)
    if (Datagrid.isReady()) Datagrid.setSearch(value)
    else handleFiltersValue(value)
  }

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })
    this.handleFiltersValue(value)
  }

  renderHeader = () => (
    <GridColumn widescreen={2} computer={3} tablet={3}>
      <Header as='h1' size='medium'>
        {this.props.currentTab.name}
      </Header>
    </GridColumn>
  )

  renderHandler = () => {
    const {
      currentTab,
      openPopup,
      intl: { formatMessage }
    } = this.props

    const { filterValue } = this.state

    const item = textsTable[currentTab.type]

    return (
      <>
        {item.SearchText && (
          <GridColumn floated='left' widescreen={7} computer={5} tablet={4}>
            <Input
              style={{ width: 340 }}
              icon='search'
              value={filterValue}
              placeholder={formatMessage({
                id: item.SearchText,
                defaultMessage: 'Select Credit Card'
              })}
              onChange={this.handleFilterChange}
            />
          </GridColumn>
        )}
        {item.BtnAddText && (
          <GridColumn widescreen={4} computer={4} tablet={5}>
            <Button fluid primary onClick={() => openPopup()} data-test='operations_open_popup_btn'>
              <FormattedMessage id={item.BtnAddText}>{text => text}</FormattedMessage>
            </Button>
          </GridColumn>
        )}
      </>
    )
  }

  render() {
    return (
      <PositionHeaderSettings>
        <Grid as={Menu} secondary verticalAlign='middle' className='page-part'>
          <CustomGridRow>{this.renderHandler()}</CustomGridRow>
        </Grid>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.operations.currentTab,
    filterValue: state.operations.filterValue
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
