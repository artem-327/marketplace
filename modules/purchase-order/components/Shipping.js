import React, { Component } from 'react'
import PropTypes, { bool } from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, Segment, GridRow, GridColumn, Divider, Header, Button } from 'semantic-ui-react'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'

import ShippingAddress from './ShippingAddress'


class Shipping extends Component {
  handleToggleChange = (otherAddresses) => {
    if (otherAddresses !== this.props.otherAddresses) {
      let { branches, getBranches, warehouses, getWarehouses } = this.props

      this.props.handleToggleChange(otherAddresses)
        .then(() => {
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

  render() {
    let { deliveryAddresses, branches, warehouses, getAddress, selectedAddress, intl } = this.props
    let { formatMessage } = intl

    let addresses = this.props.otherAddresses ? deliveryAddresses : warehouses // branches

    let dropdownOptions = addresses.map(i => ({
      text: this.props.otherAddresses
        ? `${i.address.streetAddress}, ${i.address.city}`
        : `${i.deliveryAddress.address.streetAddress}, ${i.deliveryAddress.address.city}`,
      value: i.id,
      key: i.id
    }))

    return (
      <>
        <GridRow columns={2} className='header'>
          <GridColumn>
            <Header as='h2'>
              <FormattedMessage
                id='cart.1shipping'
                defaultMessage='1. Shipping'
              />
            </Header>

          </GridColumn>
          {
            this.props.otherAddresses && (
              <GridColumn floated='right'>
                <span
                  className='headerAddtext'
                  onClick={() => this.props.shippingChanged({ isShippingEdit: true, isNewAddress: !selectedAddress })}
                  data-test='purchase_order_edit_address'>
                  <FormattedMessage id='global.edit' defaultMessage='Edit'>{(text) => text}</FormattedMessage>
                </span>
              </GridColumn>
            )
          }
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
                <FormattedMessage id='cart.addresses' defaultMessage='Addresses'>{(text) => text}</FormattedMessage></Button>
              <Button.Or text={formatMessage({ id: 'global.or', defaultMessage: 'or' })} />
              <Button
                type='button'
                disabled={this.props.shippingQuotesAreFetching}
                onClick={() => this.handleToggleChange(false)}
                active={!this.props.otherAddresses}
                data-test='purchase_order_branches_btn'>
                <FormattedMessage id='cart.warehouses' defaultMessage='Warehouses'>{(text) => text}</FormattedMessage></Button>
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
  deliveryAddresses: PropTypes.array,
  otherAddresses: bool,
  dispatch: PropTypes.func,
  getAddress: PropTypes.func,
  selectedAddress: PropTypes.object,
  toggleShippingEdit: PropTypes.func
}

Shipping.defaultProps = {
  otherAddresses: true,
}
