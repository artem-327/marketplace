import { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import TableHandlers from './TableHandlers'
import Table from './Table'
import AddEditPopup from './AddEditPopup'

import * as Actions from '../actions'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'

class DocumentTypes extends Component {
  state = {
    gaSearch: ''
  }

  componentWillUnmount() {
    const { isOpenPopup, closePopup } = this.props
    if (isOpenPopup) closePopup()
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
      <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
        <Container fluid className='flex stretched'>
          <div style={{ padding: '20px 30px' }}>
            <TableHandlers />
          </div>
          <div style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
            {this.props.isOpenPopup && <AddEditPopup />}
            <Table />
          </div>
        </Container>
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => ({
  isOpenPopup: state.documentTypes.isOpenPopup,
  auth: state.auth
})

export default connect(mapStateToProps, Actions)(DocumentTypes)
