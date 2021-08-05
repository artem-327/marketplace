import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { withDatagrid, DatagridProvider } from '../../datagrid'
import { getSafe } from '../../../utils/functions'
import TableHandler from './TableHandler'
import Table from './Table'
import EditPopup1Parameter from './EditPopup1Parameter'
import AddNewPopup1Parameter from './AddNewPopup1Parameter'
import * as Actions from '../actions'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'

const MarketSegments = props => {
  const [gaSearch, setGaSearch] = useState('')
  useEffect(() => {
    return () => {
      const { currentEditForm, currentAddForm, closeAddPopup } = props
      if (currentEditForm || currentAddForm) return closeAddPopup()
    }
  }, [])

  const getApiConfig = () => ({
    url: `/prodex/api/market-segments/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
    searchToFilter: v => {
      setGaSearch(getSafe(() => v.searchInput, ''))
      return v && v.searchInput ? [{ operator: 'LIKE', path: 'MarketSegment.name', values: [`%${v.searchInput}%`] }] : []
    }
  })


  if (!getSafe(() => props.auth.identity.isAdmin, false))
    return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

  return (
    <DatagridProvider apiConfig={getApiConfig()} preserveFilters skipInitLoad>
      <Container fluid className='flex stretched'>
        <div style={{ padding: '20px 30px' }}>
          <TableHandler />
        </div>
        <div style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
          {props.currentEditForm && <EditPopup1Parameter />}
          {props.currentAddForm && <AddNewPopup1Parameter />}
          <Table />
        </div>
      </Container>
    </DatagridProvider>
  )
}

const mapStateToProps = state => ({
  currentEditForm: state.marketSegments.currentEditForm,
  currentAddForm: state.marketSegments.currentAddForm,
  auth: state.auth
})

export default connect(mapStateToProps, Actions)(MarketSegments)
