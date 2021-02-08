import { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { Button, Input, Dropdown } from 'semantic-ui-react'
import { debounce } from 'lodash'
import Router from 'next/router'
import styled from 'styled-components'
import TreeModel from 'tree-model'
import { withToastManager } from 'react-toast-notifications'

import * as Actions from '../actions'
import { saveRules, initGlobalBroadcast } from '~/modules/broadcast/actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedNumber, FormattedMessage, injectIntl } from 'react-intl'
import { currency } from '~/constants/index'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { PlusCircle, UploadCloud, CornerLeftDown } from 'react-feather'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 5px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }
`

const CustomLabel = styled.div`
  height: 32px;
  border-radius: 16px;
  background-color: #e5efd8;
  font-size: 14px;
  text-align: center;
  color: #84c225;
  padding: 0 17px;
  display: flex;
  align-items: center;
`

const textsTable = {
  guests: {
    BtnAddText: 'manageGuests.addCompany',
    SearchText: 'manageGuests.searchGuest'
  }
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      guests: {
        searchInput: ''
      }
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidMount() {
    const { tableHandlersFilters, currentTab } = this.props
    if (currentTab === '') return
    if (tableHandlersFilters) {
      this.initFilterValues(tableHandlersFilters)
    } else {
      let filterValue = this.state[currentTab]
      this.handleFiltersValue(filterValue)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      const { currentTab } = this.props
      if (currentTab === '') return

      let filterValue = this.state[currentTab]
      this.handleFiltersValue(filterValue)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFilters', this.state)
  }

  initFilterValues = tableHandlersFilters => {
    const { currentTab } = this.props
    if (currentTab === '') return

    this.setState(tableHandlersFilters)
    this.handleFiltersValue(tableHandlersFilters[currentTab])
  }

  handleFiltersValue = value => {
    const { datagrid } = this.props
    datagrid.setSearch(value, true, 'pageFilters')
  }

  handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    this.setState({
      [currentTab]: {
        ...this.state[currentTab],
        [data.name]: data.value
      }
    })

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
    }
    this.handleFiltersValue(filter)
  }

  renderHandler = () => {
    const {
      currentTab,
      openPopup,
      intl: { formatMessage }
    } = this.props

    const filterValue = this.state[currentTab]

    return (
      <>
        <div>
          <div className='column'>
            <Input
              style={{ width: '370px' }}
              name='searchInput'
              icon='search'
              value={filterValue.searchInput}
              placeholder={formatMessage({
                id: textsTable[currentTab].SearchText,
                defaultMessage: 'Search guest'
              })}
              onChange={this.handleFilterChangeInputSearch}
            />
          </div>
        </div>
        <div className='column'>
          <Button primary onClick={() => openPopup()} data-test='settings_open_popup_btn'>
            <PlusCircle />
            <FormattedMessage id={textsTable[currentTab].BtnAddText}>{text => text}</FormattedMessage>
          </Button>
        </div>
      </>
    )
  }

  render() {
    return (
      <PositionHeaderSettings>
        <CustomRowDiv>{this.renderHandler()}</CustomRowDiv>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    tableHandlersFilters: state.manageGuests.tableHandlersFilters
  }
}

export default withDatagrid(withToastManager(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers))))
