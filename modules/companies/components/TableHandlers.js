import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import { Header, Menu, Button, Input, Dropdown, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'

import { openSidebar, handleFiltersValue } from '../actions'
import { openImportPopup } from '~/modules/settings/actions'
import { Datagrid } from '~/modules/datagrid'
import ProductImportPopup from '~/modules/settings/components/ProductCatalogTable/ProductImportPopup'

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

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterFieldCurrentValue: 'None',
      filterValue: ''
    }

    this.handleChange = debounce(this.handleChange, 300)
  }

  handleChangeSelectField = (event, value) => {
    this.setState({
      filterFieldCurrentValue: value
    })
  }

  handleChangeFieldsCurrentValue = fieldStateName => event => {
    this.setState({
      [fieldStateName]: event.target.value
    })
  }

  handleChange = value => {
    Datagrid.setSearch(value)
    // if (Datagrid.isReady()) Datagrid.setSearch(value)
    // else this.props.handleFiltersValue(this.props, value)
  }

  render() {
    const { openSidebar, openImportPopup, intl, isOpenImportPopup } = this.props

    const { formatMessage } = intl

    // if (currentTab === 'Manufactures' || currentTab === 'CAS Products' || currentTab === 'Companies') var onChange = this.debouncedOnChange
    // else var onChange = this.handleChange

    return (
      <PositionHeaderSettings>
        {isOpenImportPopup && <ProductImportPopup companies={true} />}
        <CustomGrid as={Menu} secondary verticalAlign='middle' className='page-part'>
          <CustomMenuItemLeft position='left' data-test='admin_table_search_inp'>
            <Input
              style={{ width: 340 }}
              icon='search'
              placeholder={formatMessage({ id: 'admin.searchCompany' })}
              onChange={(e, { value }) => {
                this.setState({ filterValue: value })
                this.handleChange(value)
              }}
              value={this.state.filterValue}
            />
          </CustomMenuItemLeft>
          <CustomMenuItemRight position='right'>
            <Button size='large' data-test='admin_table_add_btn' primary onClick={() => openSidebar()}>
              <FormattedMessage id='global.add' defaultMessage='Add'>
                {text => `${text} `}
              </FormattedMessage>
              <FormattedMessage id='admin.company' defaultMessage='Company'>
                {text => text}
              </FormattedMessage>
            </Button>
          </CustomMenuItemRight>

          <CustomMenuItemRight>
            <Button size='large' primary onClick={() => openImportPopup()} data-test='admin_import_btn'>
              {formatMessage({ id: 'myInventory.import', defaultMessage: 'Import' })}
            </Button>
          </CustomMenuItemRight>
        </CustomGrid>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    casListDataRequest: state.admin.casListDataRequest,
    companyListDataRequest: state.admin.companyListDataRequest,
    isOpenImportPopup: state.settings.isOpenImportPopup
  }
}

const mapDispatchToProps = {
  openSidebar,
  openImportPopup,
  handleFiltersValue
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TablesHandlers))
