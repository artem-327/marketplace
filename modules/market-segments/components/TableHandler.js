import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { Menu, Button, Input, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'

import { openPopup, handleFiltersValue } from '../actions'
import { Datagrid } from '~/modules/datagrid'
import styled from 'styled-components'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomMenuItemLeft = styled(Menu.Item)`
  margin-left: 0px !important;
  padding-left: 0px !important;
`

const CustomMenuItemRight = styled(Menu.Item)`
  margin-right: 0px !important;
  padding-right: 0px !important;
`

const CustomGrid = styled(Grid)`
  margin-top: 10px !important;
`

class TableHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterFieldCurrentValue: 'None',
      filterValue: ''
    }

    this.handleChange = debounce(this.handleChange, 300)
  }

  handleChange = value => {
    Datagrid.setSearch(value)
    // if (Datagrid.isReady()) Datagrid.setSearch(value)
    // else this.props.handleFiltersValue(this.props, value)
  }

  render() {
    const { openPopup, intl } = this.props

    const { formatMessage } = intl

    return (
      <PositionHeaderSettings>
        <CustomGrid as={Menu} secondary verticalAlign='middle' className='page-part'>
          <CustomMenuItemLeft position='left' data-test='admin_table_search_inp'>
            <Input
              style={{ width: 340 }}
              icon='search'
              placeholder={formatMessage({ id: 'admin.searchMarketSegment' })}
              onChange={(e, { value }) => {
                this.setState({ filterValue: value })
                this.handleChange(value)
              }}
              value={this.state.filterValue}
            />
          </CustomMenuItemLeft>
          <CustomMenuItemRight position='right'>
            <Button size='large' data-test='admin_table_add_btn' primary onClick={() => openPopup()}>
              <FormattedMessage id='global.add' defaultMessage='Add'>
                {text => `${text} `}
              </FormattedMessage>
              <FormattedMessage id='admin.marketSegment' defaultMessage='Market Segment'>
                {text => text}
              </FormattedMessage>
            </Button>
          </CustomMenuItemRight>
        </CustomGrid>
      </PositionHeaderSettings>
    )
  }
}

const mapDispatchToProps = {
  openPopup,
  handleFiltersValue
}

export default injectIntl(connect(null, mapDispatchToProps)(TableHandlers))
