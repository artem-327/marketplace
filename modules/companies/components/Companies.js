import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import TableHandlers from './TableHandlers'
import { withAuth } from '~/hocs'
import { connect } from "react-redux"

import CompaniesTable from './CompaniesTable/Table'
import UsersTable from './UsersTable/Table'

import AddEditCompanySidebar from './CompaniesTable/AddEditCompanySidebar'
import UsersSidebar from './UsersTable/UsersSidebar'

const tables = {
  'companies': <CompaniesTable />,
  'users': <UsersTable />
}

const sidebars = {
  'companies': <AddEditCompanySidebar />,
  'users': <UsersSidebar />
}

class Companies extends Component {
  getApiConfig = () => {
    const { currentTab } = this.props
    const datagridApiMap = {
      'companies': {
        url: '/prodex/api/companies/datagrid',
        searchToFilter: v => {
          return (
            v && v.input
              ? [
                {operator: 'LIKE', path: 'Company.name', values: [`%${v.input}%`]},
                {operator: 'LIKE', path: 'Company.cfDisplayName', values: [`%${v.input}%`]}
              ]
              : []
          )
        }
      },
      'users': {
        url: `/prodex/api/users/datagrid/all`,
        searchToFilter: v => {
          let filters = { or: [], and: [] }
          if (v && v.input) {
            filters.or = [
              {operator: 'LIKE', path: 'User.name', values: [`%${v.input}%`]},
              {
                operator: 'LIKE',
                path: 'User.homeBranch.deliveryAddress.contactName',
                values: [`%${v.input}%`]
              }
            ]
          }
          if (v && v.company) {
            filters.and = [
              {operator: 'EQUALS', path: 'User.homeBranch.company.id', values: [v.company]}
            ]
          }
          return filters
        }
      }
    }

    return datagridApiMap[currentTab.type]
  }

  renderContent = () => {
    const { currentTab } = this.props

    return (
      <>
        {tables[currentTab.type] || <p>This page is still under construction</p>}
      </>
    )
  }

  render() {
    const { currentTab, isOpenSidebar } = this.props
    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          <div style={{ padding: '0 30px' }}>
            <TableHandlers />
          </div>
          <div style={{ padding: '10px 30px 20px 30px' }} className='flex stretched'>
            {this.renderContent()}
          </div>
        </Container>
        {isOpenSidebar && sidebars[currentTab.type]}
      </DatagridProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.companiesAdmin,
    currentTab: state.companiesAdmin.currentTab,
    auth: state.auth
  }
}

export default withAuth(connect(mapStateToProps)(Companies))
