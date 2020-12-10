import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getSafe } from '~/utils/functions'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Dropdown } from 'semantic-ui-react'
import { Plus } from 'react-feather'
import { AddBox, Widgets, Inbox, Person, FolderShared, Store } from '@material-ui/icons'
import { openGlobalAddForm } from '~/modules/layout/actions'

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
    const { identity, openGlobalAddForm, openGlobalAddFormName } = this.props

    const {
      isClientCompanyAdmin,
      isClientCompanyManager,
      isCompanyAdmin,
      isMerchant,
      isProductCatalogAdmin,
      isProductOfferManager,
      isUserAdmin
    } = identity

    return (
      <CreateDropdown
        className='ui dropdown-menu pointing'
        icon={null}
        disabled={openGlobalAddFormName !== ''}
        text={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <IconPlus size={18} />
            <FormattedMessage id='createMenu.create' defaultMessage='Create' />
          </span>
        }>
        <Dropdown.Menu data-test='navigation_menu_create_drpdn'>
          {!isClientCompanyAdmin && (isCompanyAdmin || isProductCatalogAdmin) && (
            <Dropdown.Item
              onClick={() => {
                openGlobalAddForm('inventory-my-products')
              }}>
              <AddBox className={'menu-icon'} />
              <FormattedMessage id='createMenu.newProduct' defaultMessage='New Product' />
            </Dropdown.Item>
          )}

          {!isClientCompanyAdmin && (isCompanyAdmin || isMerchant || isProductOfferManager) && (
            <Dropdown.Item
              onClick={() => {
                openGlobalAddForm('inventory-my-listings')
              }}>
              <Widgets className={'menu-icon'} />
              <FormattedMessage id='createMenu.newListing' defaultMessage='New Listing' />
            </Dropdown.Item>
          )}

          {(isCompanyAdmin || isMerchant) && (
            <Dropdown.Item
              onClick={() => {
                openGlobalAddForm('wanted-board-listings')
              }}>
              <Inbox className={'menu-icon'} />
              <FormattedMessage id='createMenu.newWanted' defaultMessage='New Wanted' />
            </Dropdown.Item>
          )}

          {(isCompanyAdmin || isUserAdmin) && (
            <Dropdown.Item
              onClick={async () => {
                openGlobalAddForm('my-account-users')
              }}>
              <Person className={'menu-icon'} />
              <FormattedMessage id='createMenu.newUser' defaultMessage='New User' />
            </Dropdown.Item>
          )}

          {(isCompanyAdmin || isClientCompanyManager) && (
            <Dropdown.Item
              onClick={async () => {
                openGlobalAddForm('manage-guests-guests')
              }}>
              <FolderShared className={'menu-icon'} />
              <FormattedMessage id='createMenu.newGuest' defaultMessage='New Guest' />
            </Dropdown.Item>
          )}

          {isCompanyAdmin && (
            <Dropdown.Item
              onClick={async () => {
                openGlobalAddForm('my-account-locations')
              }}>
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
    openGlobalAddFormName: state.layout.openGlobalAddFormName,
    identity: getSafe(() => state.auth.identity, {})
  }
}

export default injectIntl(
  connect(stateToProps, {
    openGlobalAddForm
  })(CreateMenu)
)
