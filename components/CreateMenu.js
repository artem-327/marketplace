import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getSafe } from '~/utils/functions'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Dropdown } from 'semantic-ui-react'
import { Plus } from 'react-feather'
import { AddBox, Widgets, Inbox, Person, FolderShared, Store } from '@material-ui/icons'
import Router from 'next/router'

import {
  openPopup as openProductAddForm,
  sidebarDetailTrigger as openListingAddForm
} from '~/modules/inventory/actions'
import { sidebarDetailTrigger as openWantedAddForm } from '~/modules/wanted-board/actions'
import {
  openSidebar as openSettingsAddForm,
  handleLocationsTab,
  tabChanged as settingsTabChanged
} from '~/modules/settings/actions'
import { openPopup as openGuestAddForm, closeCompanyEdit as guestInitState } from '~/modules/manage-guests/actions'


export const IconPlus = styled(Plus)`
  text-align: center;
  vertical-align: middle;
  margin-right: 8px;
`

export const CreateDropdown = styled(Dropdown)`
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

class CreateMenu extends Component {
  render() {

    const {
      openProductAddForm,
      openListingAddForm,
      openWantedAddForm,
      settingsTabChanged,
      openSettingsAddForm,
      openGuestAddForm,
      guestInitState,
      handleLocationsTab,
      identity
    } = this.props

    const {
      isClientCompanyAdmin,
      isClientCompanyManager,
      isCompanyAdmin,
      isMerchant,
      isProductCatalogAdmin,
      isProductOfferManager,
      isUserAdmin,
    } = identity

    return (
      <CreateDropdown
        className='ui dropdown-menu pointing'
        icon={null}
        text={
          <span style={{ display: 'flex', alignItems: 'center'  }}>
            <IconPlus size={18} />
            <FormattedMessage id='createMenu.create' defaultMessage='Create' />
          </span>
        }>
        <Dropdown.Menu data-test='navigation_menu_create_drpdn'>

          {(isCompanyAdmin || isProductCatalogAdmin) && (
            <Dropdown.Item
              onClick={() => {
                Router.push('/inventory/my-products')
                openProductAddForm()
              }}
            >
              <AddBox className={'menu-icon'} />
              <FormattedMessage id='createMenu.newProduct' defaultMessage='New Product' />
            </Dropdown.Item>
          )}

          {(isCompanyAdmin || isMerchant || isProductOfferManager) && (
            <Dropdown.Item
              onClick={() => {
                Router.push('/inventory/my-listings')
                openListingAddForm(null, true, 0)
              }}
            >
              <Widgets className={'menu-icon'} />
              <FormattedMessage id='createMenu.newListing' defaultMessage='New Listing' />
            </Dropdown.Item>
          )}

          {(isCompanyAdmin || isMerchant) && (
            <Dropdown.Item
              onClick={() => {
                Router.push('/wanted-board/listings')
                openWantedAddForm()
              }}
            >
              <Inbox className={'menu-icon'} />
              <FormattedMessage id='createMenu.newWanted' defaultMessage='New Wanted' />
            </Dropdown.Item>
          )}

          {(isCompanyAdmin || isUserAdmin) && (
            <Dropdown.Item
              onClick={async () => {
                Router.push('/settings/users')
                await settingsTabChanged({name: "Users", id: 1, type: "users"}, null)
                openSettingsAddForm()
              }}
            >
              <Person className={'menu-icon'} />
              <FormattedMessage id='createMenu.newUser' defaultMessage='New User' />
            </Dropdown.Item>
          )}

          {(isCompanyAdmin || isClientCompanyManager) && (
            <Dropdown.Item
              onClick={async () => {
                Router.push('/manage-guests/guests')
                await guestInitState()
                openGuestAddForm()
              }}
            >
              <FolderShared className={'menu-icon'} />
              <FormattedMessage id='createMenu.newGuest' defaultMessage='New Guest' />
            </Dropdown.Item>
          )}

          {isCompanyAdmin && (
            <Dropdown.Item
              onClick={async () => {
                Router.push('/settings/locations')
                await settingsTabChanged({name: "Locations", id: 2, type: "locations"}, null)
                await handleLocationsTab('pick-up-locations')
                openSettingsAddForm()
              }}
            >
              <Store className={'menu-icon'} />
              <FormattedMessage id='createMenu.newWarehouse' defaultMessage='New Warehouse' />
            </Dropdown.Item>
          )}

        </Dropdown.Menu>
      </CreateDropdown>
    )
  }
}

const stateToProps = state => {
  return {
    identity: getSafe(() => state.auth.identity, {})
  }
}

export default injectIntl(connect(stateToProps, {
  openProductAddForm,
  openListingAddForm,
  openWantedAddForm,
  settingsTabChanged,
  openSettingsAddForm,
  openGuestAddForm,
  guestInitState,
  handleLocationsTab
})(CreateMenu))