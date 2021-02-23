import { useState } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Container, Input, Grid, Dropdown } from 'semantic-ui-react'
//Components
import Table from './components/Table'
import { withDatagrid, DatagridProvider } from '../datagrid'
import Tutorial from '../tutorial/Tutorial'
//Services
import { getSafe } from '../../utils/functions'
//Constants
import { NETWORK_TYPES } from './constants'
//Styles
import { ContainerCustom, InputSearch, DropdownType } from './MyNetwork.styles'

const MyNetwork = props => {
  const [searchValue, setSearchValue] = useState('')
  const [networkStatus, setNetworkStatus] = useState('')

  const getApiConfig = () => ({
    url: '/prodex/api/tradepass/connections', //tradepass/connections
    searchToFilter: v => {
      let filters = { or: [], and: [] }
      if (v && v.searchInput) {
        filters.or.push({
          operator: 'LIKE',
          path: 'Message.text',
          values: [`%${v.searchInput}%`]
        })
      }
      if (v && v.switchButtonsValue !== '') {
        switch (v.switchButtonsValue) {
          case 'read':
            filters.and.push({
              operator: 'EQUALS',
              path: 'Message.isRead',
              values: ['TRUE']
            })
            break
          case 'unread':
            filters.and.push({
              operator: 'EQUALS',
              path: 'Message.isRead',
              values: ['FALSE']
            })
            break
        }
      }
      if (v && v.category) {
        filters.and.push({
          operator: 'EQUALS',
          path: 'Message.category',
          values: [v.category]
        })
      }
      return filters
    }
  })

  return (
    <>
      {<Tutorial isTutorial={false} isBusinessVerification={true} />}
      <DatagridProvider apiConfig={getApiConfig()} preserveFilters skipInitLoad>
        <div id='page' className='flex stretched scrolling'>
          <ContainerCustom fluid>
            <InputSearch
              fluid
              icon='search'
              name='searchInput'
              value={searchValue}
              placeholder={props.intl.formatMessage({
                id: 'myNetworks.search',
                defaultMessage: 'Search your connection'
              })}
              onChange={(event, data) => {
                setSearchValue(data.value)
                props.datagrid.setSearch(data.value, true)
              }}
            />

            <DropdownType
              name='networkStatus'
              value={networkStatus}
              placeholder={props.intl.formatMessage({
                id: 'myNetworks.filterByType',
                defaultMessage: 'Filter by type'
              })}
              selection
              options={NETWORK_TYPES}
              onChange={(event, data) => {
                setNetworkStatus(data.value)
                props.datagrid.setSearch(data.value, true)
              }}
            />
          </ContainerCustom>

          <ContainerCustom fluid paddingTop={0} className='flex stretched'>
            <Table
              loading={false} //TODO
            />
          </ContainerCustom>
        </div>
      </DatagridProvider>
    </>
  )
}

const mapStateToProps = ({ myNetwork }) => ({
  myNetwork
})

MyNetwork.propTypes = {}

MyNetwork.defaultProps = {}

export default withDatagrid(connect(mapStateToProps)(injectIntl(MyNetwork)))
