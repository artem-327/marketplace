import React, { Component } from 'react'
import { array, func, object, bool } from 'prop-types'

import { FormattedMessage, injectIntl } from 'react-intl'

import { GridRow, GridColumn, Divider, Header, Button } from 'semantic-ui-react'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'

import ShippingAddress from './ShippingAddress'
import { getSafe } from '~/utils/functions'

class Shipping extends Component {
  handleToggleChange = otherAddresses => {
    if (otherAddresses !== this.props.otherAddresses) {
      let { branches, getBranches, warehouses, getWarehouses } = this.props

      this.props.handleToggleChange(otherAddresses).then(() => {
        // if (branches.length === 0 && !this.props.otherAddresses) getBranches()
        if (warehouses.length === 0 && !this.props.otherAddresses) getWarehouses()
      })
    }
  }

  componentDidMount() {
    if (this.props.selectedAddress && this.props.formikProps) {
      this.props.formikProps.setFieldValue('address', this.props.selectedAddress.id)
    }
  }

  getFullAddress = address => {
    let fullAddress = ''
    if (getSafe(() => address.streetAddress, false)) {
      fullAddress = address.streetAddress
    }
    if (getSafe(() => address.city, false)) {
      fullAddress ? (fullAddress += `, ${address.city}`) : (fullAddress = address.city)
    }
    if (getSafe(() => address.province.abbreviation, false)) {
      fullAddress
        ? (fullAddress += `, ${address.province.abbreviation}`)
        : (fullAddress = address.province.abbreviation)
    }
    if (getSafe(() => address.country.code, false)) {
      fullAddress ? (fullAddress += `, ${address.country.code}`) : (fullAddress = i.address.country.code)
    }

    return fullAddress
  }

  render() {
    let { deliveryAddresses, /* branches, */ warehouses, getAddress, selectedAddress, intl } = this.props
    let { formatMessage } = intl

    let addresses = this.props.otherAddresses ? deliveryAddresses : warehouses // branches

    let dropdownOptions = addresses.map(i => {
      const address = i.warehouse ? getSafe(() => i.deliveryAddress.address, '') : getSafe(() => i.address, '')

      return {
        text: this.props.otherAddresses
          ? `${this.getFullAddress(address)} ${getSafe(() => i.addressName, '')} `
          : `${getSafe(() => i.deliveryAddress.cfName, '')}`,
        value: i.id,
        key: i.id,
        content: (
          <Header
            key={i.id}
            content={
              <div
                style={{
                  fontSize: '14px'
                }}>
                {this.getFullAddress(address)}
              </div>
            }
            subheader={
              <div style={{ fontSize: '12px', color: 'gray', fontWeight: '100' }}>
                {i.warehouse
                  ? !i.deliveryAddress.addressName
                    ? getSafe(() => i.deliveryAddress.cfName, '')
                    : getSafe(() => i.deliveryAddress.addressName, '')
                  : !i.addressName
                  ? getSafe(() => i.cfName, '')
                  : getSafe(() => i.addressName, '')}
              </div>
            }
          />
        )
      }
    })

    const editOrAddMessage = selectedAddress ? 'Edit' : 'Add New'
    const editOrAddId = selectedAddress ? 'global.edit' : 'global.addNew'

    return (
      <>
        <GridRow columns={2} className='header'>
          <GridColumn>
            <Header as='h2'>
              <FormattedMessage id='cart.1shipping' defaultMessage='1. Shipping' />
            </Header>
          </GridColumn>

          <GridColumn floated='right'>
            <span
              className='headerAddtext'
              onClick={() => this.props.shippingChanged({ isShippingEdit: true, isNewAddress: !selectedAddress })}
              data-test='purchase_order_edit_address'>
              <FormattedMessage id={editOrAddId} defaultMessage={editOrAddMessage}>
                {text => text}
              </FormattedMessage>
            </span>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn textAlign='center' tablet={16} computer={8}>
            <Button.Group>
              <Button
                type='button'
                disabled={this.props.shippingQuotesAreFetching}
                onClick={() => this.handleToggleChange(true)}
                active={this.props.otherAddresses}
                data-test='purchase_order_address_btn'>
                <FormattedMessage id='cart.addresses' defaultMessage='Addresses'>
                  {text => text}
                </FormattedMessage>
              </Button>
              <Button.Or text={formatMessage({ id: 'global.or', defaultMessage: 'or' })} />
              <Button
                type='button'
                disabled={this.props.shippingQuotesAreFetching}
                onClick={() => this.handleToggleChange(false)}
                active={!this.props.otherAddresses}
                data-test='purchase_order_branches_btn'>
                <FormattedMessage id='cart.warehouses' defaultMessage='Warehouses'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </Button.Group>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn tablet={16} computer={8}>
            <Dropdown
              name='address'
              fluid
              selection
              inputProps={{
                minCharacters: 1,
                icon: 'search',
                search: true,
                disabled: this.props.shippingQuotesAreFetching,
                placeholder: <FormattedMessage id='global.selectLocation' defaultMessage='Select Location' />,
                onChange: (_, { value }) => getAddress(value)
              }}
              options={dropdownOptions}
              value={selectedAddress ? selectedAddress.id : null}
              data-test='purchase_order_location_drpdn'
            />
          </GridColumn>
        </GridRow>
        {selectedAddress && <Divider />}

        <ShippingAddress selectedAddress={selectedAddress} />
      </>
    )
  }
}

export default injectIntl(Shipping)

Shipping.propTypes = {
  deliveryAddresses: array,
  otherAddresses: bool,
  dispatch: func,
  getAddress: func,
  selectedAddress: object,
  toggleShippingEdit: func
}

Shipping.defaultProps = {
  otherAddresses: true
}
