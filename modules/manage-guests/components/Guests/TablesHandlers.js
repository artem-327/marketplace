import React, { Component } from 'react'
import { connect } from 'react-redux'
import get from 'lodash/get'
import {
  Header,
  Menu,
  Button,
  Checkbox,
  Input,
  Dropdown,
  Grid,
  GridRow,
  GridColumn,
  Container,
  List
} from 'semantic-ui-react'
import { debounce } from 'lodash'
import Router from 'next/router'
import styled from 'styled-components'
import TreeModel from 'tree-model'
import { withToastManager } from 'react-toast-notifications'

import { FormattedPhone } from '~/components/formatted-messages/'
import * as Actions from '../../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedNumber, FormattedMessage, injectIntl } from 'react-intl'
import { currency } from '~/constants/index'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { PlusCircle, ArrowLeft, DownloadCloud } from 'react-feather'
import { StyledSwitch } from '../../constants'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const TopRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
`

const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 -5px;
  flex-wrap: wrap;

  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 10px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }
`

export const CustomList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: flex-end;
    margin: 0 0 0 15px;

    > .item:nth-child(n) {
      flex-grow: 1;
      //max-width: 185px;
      border-left: 1px solid rgba(34, 36, 38, 0.15) !important;
      padding: 13px 15px !important;

      .header {
        margin: 0;
        padding: 0 0 3px;
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: 1.1666667;
      }

      .description {
        font-size: 14px;
        font-weight: bold;
        color: #20273a;
        line-height: 1.2142857;
      }
    }
  }
`

const textsTable = {
  users: {
    SearchText: 'manageGuests.searchClient',
    BtnAddText: 'manageGuests.addClient'
  },
  'document-manager': {
    SearchText: 'manageGuests.searchDocuments',
    ChooseText: 'manageGuests.chooseDocumentType',
    BtnDownloadAllText: 'manageGuests.downloadAll',
    BtnAddText: 'manageGuests.addDocument'
  },
  quote: {
    SearchText: 'manageGuests.searchQuote'
  }
}

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      documentTypeOptions: [],
      filterValue: {
        users: {
          searchInput: ''
        },
        'document-manager': {
          searchInput: '',
          documentType: '',
          documentManagerDocumentFilter: false
        },
        quote: {
          searchInput: ''
        }
      }
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidMount = async () => {
    const { tableHandlersCompanyEditFilters, currentTab, documentTypes, getDocumentTypes } = this.props

    if (!documentTypes || documentTypes.length === 0) {
      try {
        const { value } = await getDocumentTypes()
      } catch (err) {
        console.error(err)
      }
    }

    this.setState({
      documentTypeOptions: [
        {
          key: 'All document types',
          text: (
            <FormattedMessage id='manageGuests.allDocumentTypes' defaultMessage='All Document Types'>
              {text => text}
            </FormattedMessage>
          ),
          values: 'All document types'
        },
        ...this.props.documentTypes.map(document => ({
          key: document.id,
          text: document.name,
          value: document.id
        }))
      ]
    })

    if (tableHandlersCompanyEditFilters) {
      this.initFilterValues(tableHandlersCompanyEditFilters)
    } else {
      if (currentTab === '' || currentTab === 'company-info') return
      let filterValue = this.state.filterValue[currentTab]
      this.handleFiltersValue(filterValue)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      const { currentTab } = this.props
      if (currentTab === '' || currentTab === 'company-info') return

      let filterValue = this.state.filterValue[currentTab]
      this.handleFiltersValue(filterValue)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersCompanyEditFilters', this.state.filterValue)
  }

  initFilterValues = tableHandlersFilters => {
    const { currentTab } = this.props

    this.setState({ filterValue: tableHandlersFilters })
    if (currentTab === '' || currentTab === 'company-info') return
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
      filterValue: {
        ...this.state.filterValue,
        [currentTab]: {
          ...this.state.filterValue[currentTab],
          [data.name]: data.value
        }
      }
    })

    const filter = {
      ...this.state.filterValue[currentTab],
      [data.name]: data.value
    }
    this.handleFiltersValue(filter)
  }

  handleDocumentManagerButtonFilter = value => {
    this.props.handleVariableSave('documentManagerDatagridSharedWithMe', value)
    this.handleFilterChangeInputSearch(null, {
      name: 'documentManagerDocumentFilter',
      value
    })
  }

  tabSwitch(tab) {
    if (this.props.datagrid.clear) this.props.datagrid.clear()
    this.props.handleCompanyEditTab(tab)
  }

  renderHandler = () => {
    const {
      currentTab,
      openPopup,
      intl: { formatMessage }
    } = this.props

    const filterValue = this.state.filterValue[currentTab]
    const fieldsConfig = textsTable[currentTab]

    switch (currentTab) {
      case 'users':
        return (
          <CustomRowDiv>
            <div>
              <div className='column'>
                <Input
                  style={{ width: '370px' }}
                  name='searchInput'
                  icon='search'
                  value={filterValue.searchInput}
                  placeholder={formatMessage({
                    id: fieldsConfig.SearchText,
                    defaultMessage: 'Search guest'
                  })}
                  onChange={this.handleFilterChangeInputSearch}
                />
              </div>
            </div>

            <div>
              <div className='column'>
                <Button primary onClick={() => openPopup()} data-test='settings_open_popup_btn'>
                  <PlusCircle />
                  <FormattedMessage id={fieldsConfig.BtnAddText}>{text => text}</FormattedMessage>
                </Button>
              </div>
            </div>
          </CustomRowDiv>
        )

      case 'document-manager':
        return (
          <>
            <CustomRowDiv>
              <div className='column'>
                <StyledSwitch className={filterValue.documentManagerDocumentFilter ? 'true' : 'false'}>
                  <Button
                    attached='left'
                    onClick={() => this.handleDocumentManagerButtonFilter(false)}
                    data-test='wanted_board_product_switch_btn'>
                    <FormattedMessage id='manageGuests.myDocuments' defaultMessage='My Documents'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                  <Button
                    attached='right'
                    onClick={() => this.handleDocumentManagerButtonFilter(true)}
                    data-test='wanted_board_chemical_switch_btn'>
                    <FormattedMessage id='manageGuests.sharedWithMe' defaultMessage='Shared With Me'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </StyledSwitch>
              </div>
            </CustomRowDiv>
            <CustomRowDiv>
              <div>
                <div className='column'>
                  <Input
                    style={{ width: '370px' }}
                    name='searchInput'
                    icon='search'
                    value={filterValue.searchInput}
                    placeholder={formatMessage({
                      id: fieldsConfig.SearchText,
                      defaultMessage: 'Search guest'
                    })}
                    onChange={this.handleFilterChangeInputSearch}
                  />
                </div>
                <div className='column'>
                  <Dropdown
                    style={{ width: '200px' }}
                    name='documentType'
                    value={filterValue.documentType}
                    placeholder={formatMessage({
                      id: 'manageGuests.chooseDocumentType',
                      defaultMessage: 'Choose Document Type'
                    })}
                    selection
                    options={this.state.documentTypeOptions}
                    onChange={this.handleFilterChangeInputSearch}
                  />
                </div>
              </div>

              <div>
                {false && (
                  <div className='column'>
                    <Button onClick={() => {}} data-test='settings_open_popup_btn'>
                      <DownloadCloud />
                      <FormattedMessage id={fieldsConfig.BtnDownloadAllText}>{text => text}</FormattedMessage>
                    </Button>
                  </div>
                )}
                <div className='column'>
                  <Button primary onClick={() => openPopup()} data-test='settings_open_popup_btn'>
                    <PlusCircle />
                    <FormattedMessage id={fieldsConfig.BtnAddText}>{text => text}</FormattedMessage>
                  </Button>
                </div>
              </div>
            </CustomRowDiv>
          </>
        )

      case 'quote':
        return (
          <CustomRowDiv>
            <div>
              <div className='column'>
                <Input
                  style={{ width: '370px' }}
                  name='searchInput'
                  icon='search'
                  value={filterValue.searchInput}
                  placeholder={formatMessage({
                    id: fieldsConfig.SearchText,
                    defaultMessage: 'Search guest'
                  })}
                  onChange={this.handleFilterChangeInputSearch}
                />
              </div>
            </div>
          </CustomRowDiv>
        )
    }
  }

  render() {
    const {
      openPopup,
      closeCompanyEdit,
      companyEditValues,
      intl: { formatMessage },
      cfDisplayName,
      companyAdmin,
      adminEmail,
      phoneNumber,
      currentTab
    } = this.props

    return (
      <PositionHeaderSettings>
        <TopRowDiv>
          <div style={{ margin: '10px 0' }}>
            <Button fluid onClick={() => closeCompanyEdit()} data-test='settings_open_popup_btn'>
              <ArrowLeft />
              <FormattedMessage id='manageGuests.backToGuests' defaultMessage='Back To Guests'>
                {text => text}
              </FormattedMessage>
            </Button>
          </div>
          <CustomList divided relaxed horizontal size='large'>
            <List.Item>
              <List.Content>
                <List.Header as='label'>
                  <FormattedMessage id='global.companyName' defaultMessage='Company Name' />
                </List.Header>
                <List.Description as='span'>{cfDisplayName}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as='label'>
                  <FormattedMessage id='global.companyAdmin' defaultMessage='Company Admin' />
                </List.Header>
                <List.Description as='span'>{companyAdmin}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as='label'>
                  <FormattedMessage id='global.adminEmail' defaultMessage='Admin Email' />
                </List.Header>
                <List.Description as='span'>{adminEmail}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as='label'>
                  <FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' />
                </List.Header>
                <List.Description as='span'>{phoneNumber}</List.Description>
              </List.Content>
            </List.Item>
          </CustomList>
        </TopRowDiv>

        <Container fluid style={{ padding: '0 30px' }}>
          <Menu pointing secondary horizontal>
            <Menu.Item
              style={{ textTransform: 'uppercase' }}
              name={formatMessage({
                id: 'manageGuests.companyEdit.tab.guestCompanyInfo',
                defaultMessage: 'Guest Company Info'
              })}
              onClick={() => this.tabSwitch('company-info')}
              active={currentTab === 'company-info'}
              data-test='menu_guests_edit_company_guest_company_info'
            />
            <Menu.Item
              style={{ textTransform: 'uppercase' }}
              name={formatMessage({
                id: 'manageGuests.companyEdit.tab.users',
                defaultMessage: 'Users'
              })}
              onClick={() => this.tabSwitch('users')}
              active={currentTab === 'users'}
              data-test='menu_guests_edit_company_guest_company_info'
            />
            <Menu.Item
              style={{ textTransform: 'uppercase' }}
              name={formatMessage({
                id: 'manageGuests.companyEdit.tab.documentManager',
                defaultMessage: 'Document Manager'
              })}
              onClick={() => this.tabSwitch('document-manager')}
              active={currentTab === 'document-manager'}
              data-test='menu_guests_edit_company_guest_company_info'
            />
            {false && (
              <Menu.Item
                style={{ textTransform: 'uppercase' }}
                name={formatMessage({
                  id: 'manageGuests.companyEdit.tab.quote',
                  defaultMessage: 'Quote'
                })}
                onClick={() => this.tabSwitch('quote')}
                active={currentTab === 'quote'}
                data-test='menu_guests_edit_company_guest_company_info'
              />
            )}
          </Menu>
        </Container>

        <Container fluid style={{ padding: '10px 30px' }}>
          {this.renderHandler()}
        </Container>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  const { manageGuests } = state
  return {
    //...state,
    currentTab: manageGuests.guestsTab,
    tableHandlersCompanyEditFilters: manageGuests.tableHandlersCompanyEditFilters,
    cfDisplayName: getSafe(() => manageGuests.companyEditValues.cfDisplayName, ''),
    companyAdmin: getSafe(() => manageGuests.companyEditValues.primaryUser.name, ''),
    adminEmail: getSafe(() => manageGuests.companyEditValues.primaryUser.email, ''),
    phoneNumber: <FormattedPhone value={getSafe(() => manageGuests.companyEditValues.phone, '')} />,
    companyEditValues: manageGuests.companyEditValues,
    documentTypes: manageGuests.documentTypes
  }
}

export default withDatagrid(withToastManager(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers))))
