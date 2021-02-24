import { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Dropdown, Popup } from 'semantic-ui-react'
import BasicButton from '../../../components/buttons/BasicButton'
import { debounce } from 'lodash'
import styled from 'styled-components'

import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { injectIntl, FormattedMessage } from 'react-intl'
import { getSafe } from '~/utils/functions'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import { Drafts, Mail, DeleteForever } from '@material-ui/icons'
import { Trash2 } from 'react-feather'

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

export const MoreDropdown = styled(Dropdown)`
  height: 40px;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 600;

  padding: 10px 20px;

  &.active {
    background-color: #edeef2;
  }

  .item {
    font-size: 14px;
    color: #20273a;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.57;
    display: flex !important;

    .menu-icon {
      width: 18px;
      height: 20px;
      color: #cecfd4;
      margin-right: 11px;
    }
    &:hover {
      background-color: #edeef2;

      .menu-icon {
        color: #20273a;
      }
    }
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
    const { tableHandlersFilters, datagrid, isAdmin } = this.props
    let { currentTab } = this.props

    if (isAdmin) {
      currentTab = null
      this.handleFiltersValue({ category: currentTab })
    }

    datagrid.clear()

    if (tableHandlersFilters) {
      this.setState(tableHandlersFilters)
      if (currentTab) {
        const filter = tableHandlersFilters[currentTab]
        if (filter) {
          this.handleFiltersValue({ ...filter, category: currentTab })
        } else {
          this.handleFiltersValue({ category: currentTab })
        }
      }
    } else {
      if (currentTab) {
        const filter = this.state[currentTab]
        if (filter) {
          this.handleFiltersValue({ ...filter, category: currentTab })
        } else {
          this.handleFiltersValue({ category: currentTab })
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
    if (this.props.onDatagridUpdate) this.props.onDatagridUpdate([])
  }

  handleMarkAsSeen = async () => {
    const { datagrid, selectedRows, onDatagridUpdate, markSeenArray } = this.props
    try {
      await markSeenArray({ messages: selectedRows })
      if (onDatagridUpdate) onDatagridUpdate([])
      datagrid.loadData()
    } catch (err) {
      console.error(err)
    }
  }

  handleMarkAsUnseen = async () => {
    const { datagrid, selectedRows, onDatagridUpdate, markUnseenArray } = this.props
    try {
      await markUnseenArray({ messages: selectedRows })
      if (onDatagridUpdate) onDatagridUpdate([])
      datagrid.loadData()
    } catch (err) {
      console.error(err)
    }
  }

  handleDelete = async () => {
    const { datagrid, selectedRows, onDatagridUpdate, deleteArray } = this.props
    try {
      await deleteArray({ messages: selectedRows })
      if (onDatagridUpdate) onDatagridUpdate([])
      datagrid.loadData()
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {
      isAdmin,
      intl: { formatMessage },
      currentTab,
      selectedRows
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
          {isAdmin && (
            <div className='column'>
              {filterValue && filterValue.switchButtonsValue === 'unread' ? (
                <BasicButton
                  className='font-medium'
                  active={filterValue && filterValue.switchButtonsValue === 'unread'}
                  onClick={() => this.handleButtonsChange('unread')}>
                  {formatMessage({ id: 'alerts.button.unread', defaultMessage: 'Unread' })}
                </BasicButton>
              ) : (
                <BasicButton
                  active={!filterValue || !filterValue.switchButtonsValue}
                  onClick={() => this.handleButtonsChange('')}>
                  {formatMessage({ id: 'alerts.button.all', defaultMessage: 'All' })}
                </BasicButton>
              )}
            </div>
          )}
        </div>
        <div>
          {isAdmin && (
            <div className='column'>
              <Popup
                content={<FormattedMessage id='alerts.dropdown.markAsRead' defaultMessage='Mark as Read' />}
                trigger={
                  <BasicButton
                    icon={<Mail />}
                    className={!selectedRows.length && 'disabled-style'}
                    onClick={() => selectedRows.length && this.handleMarkAsSeen()}
                  />
                }
                position='top center'
                inverted
                size='tiny'
              />
              <Popup
                content={<FormattedMessage id='alerts.dropdown.delete' defaultMessage='Delete' />}
                trigger={
                  <BasicButton
                    icon={<Trash2 />}
                    className={!selectedRows.length && 'disabled-style'}
                    onClick={() => selectedRows.length && this.handleDelete()}
                  />
                }
                position='top center'
                inverted
                size='tiny'
              />
            </div>
          )}
          {!isAdmin && (
            <>
              <div className='column'>
                <MoreDropdown
                  className='ui dropdown-menu pointing'
                  icon={null}
                  text={formatMessage({ id: 'alerts.dropdown.more', defaultMessage: 'More ...' })}>
                  <Dropdown.Menu data-test='notifications_menu_more_drpdn'>
                    <Dropdown.Item disabled={!selectedRows.length} onClick={() => this.handleMarkAsSeen()}>
                      <Drafts className={'menu-icon'} />
                      <FormattedMessage id='alerts.dropdown.markAsRead' defaultMessage='Mark as Read' />
                    </Dropdown.Item>
                    <Dropdown.Item disabled={!selectedRows.length} onClick={() => this.handleMarkAsUnseen()}>
                      <Drafts className={'menu-icon'} />
                      <FormattedMessage id='alerts.dropdown.markAsUnread' defaultMessage='Mark as Unread' />
                    </Dropdown.Item>
                    <Dropdown.Item disabled={!selectedRows.length} onClick={() => this.handleDelete()}>
                      <Drafts className={'menu-icon'} />
                      <FormattedMessage id='alerts.dropdown.delete' defaultMessage='Delete' />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </MoreDropdown>
              </div>
              <div className='column' style={{ marginRight: '9px' }}>
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
              <ColumnSettingButton divide={true} />
            </>
          )}
        </div>
      </CustomDiv>
    )
  }
}

const mapStateToProps = ({ auth, alerts }) => {
  return {
    ...alerts,
    isAdmin: getSafe(() => auth.identity.isAdmin, false),
    currentTab: alerts.topMenuTab
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
