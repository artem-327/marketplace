import { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getSafe } from '../utils/functions'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Dropdown } from 'semantic-ui-react'
import { Plus, Globe } from 'react-feather'
import { AddBox, Widgets, Inbox, Person, FolderShared, Store } from '@material-ui/icons'
//Actions
import { openGlobalAddForm } from '../modules/layout/actions'
import { triggerModal } from '../modules/my-network/actions'

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
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0);
  font-size: 14px;
  font-weight: 600;

  padding: 10px 20px;

  &:hover {
    background-color: #f8f9fb;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
  }

  &.active {
    background-color: #edeef2;
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0);
  }

  .menu.right &.dropdown-menu > .menu {
    padding-top: 10px !important;
    padding-bottom: 10px !important;

    > .item {
      display: flex !important;
      padding-top: 5px !important;
      padding-bottom: 5px !important;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      color: #20273a;
      line-height: 1.428571;

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

      + .item {
        margin-top: 6px !important;
      }
    }
  }
`

class CreateMenu extends Component {
  render() {
    const { identity, openGlobalAddForm, openGlobalAddFormName, triggerModal } = this.props

    const {
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
          {(isCompanyAdmin || isProductCatalogAdmin) && (
            <Dropdown.Item
              onClick={() => {
                openGlobalAddForm('inventory-my-products')
              }}>
              <AddBox className={'menu-icon'} />
              <FormattedMessage id='createMenu.newProduct' defaultMessage='New Product' />
            </Dropdown.Item>
          )}

          {(isCompanyAdmin || isMerchant || isProductOfferManager) && (
            <Dropdown.Item
              onClick={() => {
                openGlobalAddForm('inventory-my-listings')
              }}>
              <Widgets className={'menu-icon'} />
              <FormattedMessage id='createMenu.newListing' defaultMessage='New Listing' />
            </Dropdown.Item>
          )}
          {/* Temporary comented based on https://bluepallet.atlassian.net/browse/DT-88 */}
          {false && (isCompanyAdmin || isMerchant) && (
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

          {isCompanyAdmin && (
            <>
              <Dropdown.Item
                onClick={async () => {
                  openGlobalAddForm('my-account-locations')
                }}>
                <Store className={'menu-icon'} />
                <FormattedMessage id='createMenu.newWarehouse' defaultMessage='New Warehouse' />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={async () => {
                  openGlobalAddForm('my-network-connection')
                  triggerModal()
                }}>
                <Globe className={'menu-icon'} />
                <FormattedMessage id='createMenu.newConection' defaultMessage='New Connection' />
              </Dropdown.Item>
            </>
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
    openGlobalAddForm,
    triggerModal
  })(CreateMenu)
)
