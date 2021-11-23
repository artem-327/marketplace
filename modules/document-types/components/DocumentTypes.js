import { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import TableHandlers from './TableHandlers'
import Table from './Table'
import EditPopup1Parameter from './EditPopup1Parameter'
import AddNewPopup1Parameter from './AddNewPopup1Parameter'
import * as Actions from '../actions'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'

class DocumentTypes extends Component {
  state = {
    gaSearch: ''
  }

  componentWillUnmount() {
    const { currentEditForm, currentAddForm, closeAddPopup } = this.props
    if (currentEditForm || currentAddForm) closeAddPopup()
  }

  getApiConfig = () => ({
    url: this.state.gaSearch ? `prodex/api/document-types/datagrid?${GA_TRACK_QUERY}=${this.state.gaSearch}` : `prodex/api/document-types/datagrid`,
    searchToFilter: v => {
      this.setState({ gaSearch: getSafe(() => v.searchInput, '') })
      return v && v.searchInput ? [{ operator: 'LIKE', path: 'DocumentType.name', values: [`%${v.searchInput}%`] }] : []
    }
  })

  render() {

    if (!getSafe(() => this.props.auth.identity.isAdmin, false))
      return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />
  
    return (
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad defaultSort='DocumentType.name'>
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

const mapStateToProps = state => ({
  currentEditForm: state.documentTypes.currentEditForm,
  currentAddForm: state.documentTypes.currentAddForm,
  auth: state.auth
})

export default connect(mapStateToProps, Actions)(DocumentTypes)
