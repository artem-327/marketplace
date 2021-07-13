import { Container } from 'semantic-ui-react'
import { useEffect } from 'react'
import { withDatagrid, DatagridProvider } from '../../datagrid'
import TableHandlers from './TableHandlers'
import { withAuth } from '../../../hocs'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import CompaniesTable from './CompaniesTable/Table'
import UsersTable from './UsersTable/Table'
import * as Actions from '../actions'
import AddEditCompanySidebar from './CompaniesTable/AddEditCompanySidebar'
import UsersSidebar from './UsersTable/UsersSidebar'
// Services
import { getSafe } from '../../../utils/functions'

const tables = {
  companies: <CompaniesTable />,
  users: <UsersTable />
}

const sidebars = {
  companies: <AddEditCompanySidebar />,
  users: <UsersSidebar />
}

const Companies = props => {
  useEffect(() => {
    const { isOpenSidebar, closePopup } = props
    if (isOpenSidebar) return closePopup()
  }, [])

  const getApiConfig = () => {
    const { currentTab } = props
    const datagridApiMap = {
      companies: {
        url: '/prodex/api/companies/datagrid',
        searchToFilter: v => {
          return v && v.searchInput
            ? [
                { operator: 'LIKE', path: 'Company.name', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'Company.cfDisplayName', values: [`%${v.searchInput}%`] },
                { operator: 'LIKE', path: 'Company.dba', values: [`%${v.searchInput}%`] }
              ]
            : []
        }
      },
      users: {
        url: `/prodex/api/users/datagrid/all`,
        searchToFilter: v => {
          let filters = { or: [], and: [] }
          if (v && v.searchInput) {
            filters.or = [
              { operator: 'LIKE', path: 'User.name', values: [`%${v.searchInput}%`] },
              { operator: 'LIKE', path: 'User.email', values: [`%${v.searchInput}%`] },
              {
                operator: 'LIKE',
                path: 'User.homeBranch.deliveryAddress.contactName',
                values: [`%${v.searchInput}%`]
              }
            ]
          }
          if (v && v.company) {
            filters.and = [{ operator: 'EQUALS', path: 'User.homeBranch.company.id', values: [v.company] }]
          }
          return filters
        }
      }
    }

    return datagridApiMap[currentTab]
  }

  const renderContent = () => {
    const { currentTab } = props

    return <>{tables[currentTab] || <p>This page is still under construction</p>}</>
  }

  const { currentTab, isOpenSidebar } = props

  if (!getSafe(() => props.auth.identity.isAdmin, false))
    return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />
  
  return (
    <DatagridProvider apiConfig={getApiConfig()} preserveFilters={true} skipInitLoad>
      <Container fluid className='flex stretched'>
        <div style={{ padding: '20px 30px 0' }}>
          <TableHandlers currentTab={currentTab} />
        </div>
        <div style={{ padding: '20px 30px' }} className='flex stretched'>
          {renderContent()}
        </div>
      </Container>
      {isOpenSidebar && sidebars[currentTab]}
    </DatagridProvider>
  )
}

const mapStateToProps = state => {
  return {
    ...state.companiesAdmin,
    auth: state.auth
  }
}

export default withAuth(connect(mapStateToProps, Actions)(Companies))
