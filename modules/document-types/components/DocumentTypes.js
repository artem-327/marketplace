import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import TableHandlers from './TableHandlers'
import Table from './Table'
import EditPopup1Parameter from './EditPopup1Parameter'
import AddNewPopup1Parameter from './AddNewPopup1Parameter'

class DocumentTypes extends Component {
  getApiConfig = () => ({
    url: 'prodex/api/document-types/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'DocumentType.name', values: [`%${v}%`] }] : [])
  })

  render() {
    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          <div style={{ padding: '20px 30px' }}>
            <TableHandlers />
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

const mapStateToProps = ({ documentTypes }) => ({
  currentEditForm: documentTypes.currentEditForm,
  currentAddForm: documentTypes.currentAddForm
})

export default connect(mapStateToProps)(DocumentTypes)
