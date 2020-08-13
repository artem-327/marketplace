import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import TableHandler from './TableHandler'
import Table from './Table'
import EditPopup1Parameter from './EditPopup1Parameter'
import AddNewPopup1Parameter from './AddNewPopup1Parameter'
import * as Actions from '../actions'

class MarketSegments extends Component {
  componentWillUnmount() {
    const { currentEditForm, currentAddForm, closeAddPopup } = this.props
    if (currentEditForm || currentAddForm) closeAddPopup()
  }

  getApiConfig = () => ({
    url: '/prodex/api/market-segments/datagrid',
    searchToFilter: v => (v && v.searchInput
        ? [{ operator: 'LIKE', path: 'MarketSegment.name', values: [`%${v.searchInput}%`] }]
        : []
    )
  })

  render() {
    return (
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
        <Container fluid className='flex stretched'>
          <div style={{ padding: '20px 30px' }}>
            <TableHandler />
          </div>
          <div style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
            {this.props.currentEditForm && <EditPopup1Parameter />}
            {this.props.currentAddForm && <AddNewPopup1Parameter />}
            <Table />
          </div>
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = ({ marketSegments }) => ({
  currentEditForm: marketSegments.currentEditForm,
  currentAddForm: marketSegments.currentAddForm
})

export default connect(mapStateToProps, Actions)(MarketSegments)
