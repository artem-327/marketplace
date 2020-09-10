import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'semantic-ui-react'
import { debounce } from 'lodash'
import styled from 'styled-components'

import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

const CustomDiv = styled.div`
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

const StyledButtonsGroup = styled(Button.Group)`
  flex-wrap: wrap;
  .ui.button {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6 !important;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    color: #848893;
  }

  .ui.button.active {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
    border: solid 1px #dee2e6;
    background-color: #edeef2;
    color: #20273a;
  }
`

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
      switchButtonsValue: ''
    }
  }

  componentDidMount() {
    const { tableHandlersFilters, currentTab, datagrid } = this.props

    datagrid.clear()

    if (tableHandlersFilters) {
      this.setState(tableHandlersFilters)
      if (currentTab) {
        const filter = tableHandlersFilters[currentTab]
        if (filter) {
          this.handleFiltersValue({...filter, category: currentTab})
        } else {
          this.handleFiltersValue({category: currentTab})
        }
      }
    } else {
      if (currentTab) {
        const filter = this.state[currentTab]
        if (filter) {
          this.handleFiltersValue({...filter, category: currentTab})
        } else {
          this.handleFiltersValue({category: currentTab})
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
        this.handleFiltersValue({ ...filter, category: currentTab })
      } else {
        this.handleFiltersValue({ category: currentTab })
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
    this.handleFiltersValue({ ...filter, category: currentTab })
  }

  handleButtonsChange = value => {
    this.handleFilterChangeInputSearch(null, {
      name: 'switchButtonsValue',
      value
    })
  }

  render() {
    const {
      intl: { formatMessage },
      currentTab
    } = this.props

    const filterValue = this.state[currentTab]

    return (
      <CustomDiv>
        <div>
          <div className='column'>
            <Input
              style={{ width: 370 }}
              icon='search'
              name='searchInput'
              value={filterValue && filterValue.searchInput ? filterValue.searchInput : ''}
              placeholder={formatMessage({
                id: 'alerts.searchNotification',
                defaultMessage: 'Search Notification'
              })}
              onChange={this.handleFilterChangeInputSearch}
            />
          </div>
        </div>
        <div>
          <div className='column'>
            <StyledButtonsGroup>
              <Button
                active={!filterValue || !filterValue.switchButtonsValue}
                onClick={() => this.handleButtonsChange('')}>
                {formatMessage({ id: 'alerts.button.all', defaultMessage: 'All' })}
              </Button>
              <Button
                active={filterValue && filterValue.switchButtonsValue === 'read'}
                onClick={() => this.handleButtonsChange('read')}>
                {formatMessage({ id: 'alerts.button.read', defaultMessage: 'Read' })}
              </Button>
              <Button
                active={filterValue && filterValue.switchButtonsValue === 'unread'}
                onClick={() => this.handleButtonsChange('unread')}>
                {formatMessage({ id: 'alerts.button.unread', defaultMessage: 'Unread' })}
              </Button>
            </StyledButtonsGroup>
          </div>
        </div>
      </CustomDiv>
    )
  }
}

const mapStateToProps = ({ alerts }) => {
  return {
    ...alerts,
    currentTab: alerts.topMenuTab
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
