import { Component } from 'react'
import { connect } from 'react-redux'
import { config } from '../config'
import { debounce } from 'lodash'

import { Button, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'

import { openPopup, handleFiltersValue, handleVariableSave } from '../actions'
import { Datagrid } from '~/modules/datagrid'
import styled from 'styled-components'
import { withDatagrid } from '~/modules/datagrid'
import { CustomRowDiv } from '~/modules/companies/constants'
import { PlusCircle } from 'react-feather'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { tableHandlersFilters, currentTab, datagrid } = this.props

    datagrid.clear()
    if (tableHandlersFilters) {
      this.setState(tableHandlersFilters)
      if (currentTab) {
        const filter = tableHandlersFilters[currentTab]
        if (filter) {
          this.handleFiltersValue(filter)
        } else {
          this.handleFiltersValue(null)
        }
      }
    } else {
      if (currentTab) {
        const filter = this.state[currentTab]
        if (filter) {
          this.handleFiltersValue(filter)
        } else {
          this.handleFiltersValue(null)
        }
      }
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFilters', this.state)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentTab !== prevProps.currentTab) {
      const { currentTab } = this.props
      this.props.datagrid.clear()
      const filter = this.state[currentTab]
      if (filter) {
        this.handleFiltersValue(filter)
      } else {
        this.handleFiltersValue(null)
      }
    }
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
    }
    this.setState({ [currentTab]: filter })
    this.handleFiltersValue(filter)
  }

  render() {
    const { currentTab, openPopup, intl } = this.props

    const { formatMessage } = intl
    const filterValue = this.state[currentTab]

    return (
      <PositionHeaderSettings>
        <CustomRowDiv>
          <div>
            <div className='column'>
              <Input
                style={{ width: 340 }}
                icon='search'
                name='searchInput'
                placeholder={formatMessage({ id: config[currentTab].searchText })}
                onChange={this.handleFilterChangeInputSearch}
                value={filterValue && filterValue.searchInput ? filterValue.searchInput : ''}
              />
            </div>
          </div>
          <div>
            <div className='column'>
              <Button size='large' data-test='admin_table_add_btn' primary onClick={() => openPopup()}>
                <PlusCircle />
                <FormattedMessage id='global.add' defaultMessage='Add'>
                  {text => `${text} `}
                </FormattedMessage>
                {config[currentTab].addEditText}
              </Button>
            </div>
            <ColumnSettingButton divide={true} />
          </div>
        </CustomRowDiv>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    tableHandlersFilters: state.admin.tableHandlersFilters,
    casListDataRequest: state.admin.casListDataRequest,
    companyListDataRequest: state.admin.companyListDataRequest
  }
}

const mapDispatchToProps = {
  openPopup,
  handleFiltersValue,
  handleVariableSave
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)))
