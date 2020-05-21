import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import TableHandler from './TableHandler'
import Table from './Table'
import EditPopup1Parameter from './EditPopup1Parameter'
import AddNewPopup1Parameter from './AddNewPopup1Parameter'

class MarketSegments extends Component {
  getApiConfig = () => ({
    url: '/prodex/api/market-segments/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'MarketSegment.name', values: [`%${v}%`] }] : [])
  })

  render() {
    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
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

export default connect(mapStateToProps)(MarketSegments)
