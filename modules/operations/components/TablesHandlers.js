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

const textsTable = {
  'shipping-quotes': {
    BtnAddText: 'operations.tables.shippingQuotes.buttonAdd',
    SearchText: 'operations.tables.shippingQuotes.search'
  },
  tags: {
    BtnAddText: 'operations.tables.tags.buttonAdd',
    SearchText: 'operations.tables.tags.search'
  }
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterValue: ''
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 250)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      this.setState({ filterValue: '' })
      this.handleFiltersValue('')
    }
  }

  handleFiltersValue = value => {
    const { handleFiltersValue } = this.props
    //if (Datagrid.isReady()) Datagrid.setSearch(value) // temporary - missing filter path in BE
    //else handleFiltersValue(value)
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

    return (
      <>
        <GridColumn floated='left' widescreen={7} computer={5} tablet={4}>
          <Input
            fluid
            icon='search'
            value={filterValue}
            placeholder={formatMessage({
              id: textsTable[currentTab.type].SearchText,
              defaultMessage: 'Select Credit Card'
            })}
            onChange={this.handleFilterChange}
          />
        </GridColumn>
        {!currentTab.hideButtons && (
          <GridColumn widescreen={4} computer={4} tablet={5}>
            <Button fluid primary onClick={() => openPopup()} data-test='operations_open_popup_btn'>
              <FormattedMessage id={textsTable[currentTab.type].BtnAddText}>{text => text}</FormattedMessage>
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
          <GridRow>{this.renderHandler()}</GridRow>
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
