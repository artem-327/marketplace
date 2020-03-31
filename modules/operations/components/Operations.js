import React, { Component } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'
import Tabs from './Tabs'
import { withAuth } from '~/hocs'
import { FormattedMessage } from 'react-intl'

import ShippingQuotesTable from './shipping-quotes/ShippingQuotesTable'
import ShippingQuotesPopup from './shipping-quotes/ShippingQuotesPopup'
import TagsTable from './tags/TagsTable'
import TagsPopup from './tags/TagsPopup'

import { getSafe } from '~/utils/functions'
import { DatagridProvider } from '~/modules/datagrid'
import { tabChanged } from '../actions'

class Operations extends Component {
  renderContent = () => {
    const { currentTab, isOpenPopup } = this.props

    const tables = {
      'shipping-quotes': <ShippingQuotesTable />,
      tags: <TagsTable />
    }

    const popupForm = {
      'shipping-quotes': <ShippingQuotesPopup />,
      tags: <TagsPopup />
    }

    return (
      <>
        {isOpenPopup && popupForm[currentTab.type]}
        {tables[currentTab.type] || <p>This page is still under construction</p>}
      </>
    )
  }

  getApiConfig = () => {
    const { currentTab } = this.props

    const datagridApiMap = {
      'shipping-quotes': {
        url: '/prodex/api/shipment/manual-quotes/datagrid'
        /*
        searchToFilter: v =>
          v
            ? [
              {
                operator: 'LIKE',
                path: '',
                values: [`%${v}%`]
              }
            ]
            : []
        */
      },
      //TODO when exist endpoints for Tags then change
      tags: {
        url: 'prodex/api/associations/datagrid',
        searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'Association.name', values: [`%${v}%`] }] : [])
      }
    }

    return datagridApiMap[currentTab.type]
  }

  render() {
    const { currentTab } = this.props

    //! ! Temporary commented
    //if (!(getSafe(() => this.props.auth.identity.isAdmin, false) || getSafe(() => this.props.auth.identity.isEchoOperator, false)))
    //      return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          <Container fluid style={{ padding: '0 1.5vh' }}>
            {<TablesHandlers currentTab={currentTab} />}
          </Container>
          <Grid columns='equal' className='flex stretched' style={{ padding: '0 1.5vh' }}>
            <Grid.Row>
              <Grid.Column className='flex stretched' style={{ marginTop: '10px' }}>
                {this.renderContent()}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.operations,
    currentTab: state.operations.currentTab,
    auth: state.auth
  }
}

export default withAuth(
  connect(mapStateToProps, {
    tabChanged
  })(Operations)
)
