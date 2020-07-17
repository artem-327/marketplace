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
  
  input, .ui.dropdown {
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

  handleFiltersValue = debounce( filter => {
    if (Datagrid.isReady()) Datagrid.setSearch(filter, true, 'searchRow')
    }, 300
  )

  handleFilterChange = (e, { value }) => {
    this.setState({ searchValue: value })
    this.handleFiltersValue({
      searchValue: value,
      switchButtonsValue: this.state.switchButtonsValue
    })
  }

  handleButtonsChange = (value) => {
    this.setState({ switchButtonsValue: value })
    this.handleFiltersValue({
      searchValue: this.state.searchValue,
      switchButtonsValue: value
    })
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props

    const {
      searchValue,
      switchButtonsValue
    } = this.state

    return (
      <CustomDiv>
        <div>
          <div className='column'>
            <Input
              style={{ width: 370 }}
              icon='search'
              value={searchValue}
              placeholder={formatMessage({
                id: 'alerts.searchNotification',
                defaultMessage: 'Search Notification...'
              })}
              onChange={this.handleFilterChange}
            />
          </div>
        </div>
        <div>
          <div className='column'>
            <StyledButtonsGroup>
              <Button
                active={switchButtonsValue === ''}
                onClick={() => this.handleButtonsChange('')}
              >
                {formatMessage({ id: 'alerts.button.all', defaultMessage: 'All' })}
              </Button>
              <Button
                active={switchButtonsValue === 'read'}
                onClick={() => this.handleButtonsChange('read')}
              >
                {formatMessage({ id: 'alerts.button.read', defaultMessage: 'Read' })}
              </Button>
              <Button
                active={switchButtonsValue === 'unread'}
                onClick={() => this.handleButtonsChange('unread')}
              >
                {formatMessage({ id: 'alerts.button.unread', defaultMessage: 'Unread' })}
              </Button>
            </StyledButtonsGroup>
          </div>
        </div>
      </CustomDiv>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))