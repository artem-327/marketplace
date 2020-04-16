import React, { Component } from 'react'
import { array, func, object, bool } from 'prop-types'

import { FormattedMessage, injectIntl } from 'react-intl'

import { GridRow, GridColumn, Header, Button, Icon, Grid } from 'semantic-ui-react'
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'

import ShippingAddress from './ShippingAddress'
import { getSafe } from '~/utils/functions'

import {
  VerticalUnpaddedColumn,
  StyledRow,
  UnpaddedColumn,
  RightUnpaddedRow,
  TopUnpaddedColumn
} from '~/modules/cart/components/StyledComponents'

const StyledButton = styled(Button)`
  ${props => props.basic &&
    `
    border-radius: 4px !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
    border: solid 1px #dee2e6 !important;
  `
  }
`

class Shipping extends Component {
  handleToggleChange = otherAddresses => {
    this.props.formikProps.setFieldValue('address', null)
    if (otherAddresses !== this.props.otherAddresses) {
      let { warehouses, getWarehouses } = this.props

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
    let { deliveryAddresses, /* branches, */ warehouses, getAddress, selectedAddress, intl, handleOpen } = this.props
    let { formatMessage } = intl

    let addresses = this.props.otherAddresses ? deliveryAddresses : warehouses // branches

    let dropdownOptions = addresses.map(i => {
      const address = i.warehouse ? getSafe(() => i.deliveryAddress.address, '') : getSafe(() => i.address, '')

      return {
        searchText: this.props.otherAddresses
          ? `${getSafe(() => i.addressName, '')}, ${this.getFullAddress(address)}  `
          : `${getSafe(() => i.deliveryAddress.cfName, '')}, ${this.getFullAddress(address)} `,
        text: this.props.otherAddresses
          ? `${getSafe(() => i.addressName, '') ? getSafe(() => i.addressName, '') : getSafe(() => i.cfName, '')} `
          : `${
          getSafe(() => i.deliveryAddress.cfName, '')
            ? getSafe(() => i.deliveryAddress.cfName, '')
            : getSafe(() => i.deliveryAddress.addressName, '')
          } `,
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
                {i.warehouse
                  ? !i.deliveryAddress.addressName
                    ? getSafe(() => i.deliveryAddress.cfName, '')
                    : getSafe(() => i.deliveryAddress.addressName, '')
                  : !i.addressName
                    ? getSafe(() => i.cfName, '')
                    : getSafe(() => i.addressName, '')}
              </div>
            }
            subheader={
              <div style={{ fontSize: '12px', color: 'gray', fontWeight: '100' }}>{this.getFullAddress(address)}</div>
            }
          />
        )
      }
    })


    return (
      <>

        <StyledRow verticalAlign='middle' columns={2} bottomShadow>
          <VerticalUnpaddedColumn>
            <Header as='h2'>
              <FormattedMessage id='cart.1shipping' defaultMessage='1. Shipping' />
            </Header>
          </VerticalUnpaddedColumn>

          <UnpaddedColumn textAlign='right'>
            <Button
              type='button'
              data-test='purchase_order_edit_address'
              color='blue'
              size='tiny'
              onClick={() => handleOpen({ modalOpen: true, isNewAddress: true })}>
              <Icon name='plus circle' />
              <FormattedMessage id='global.addNew' defaultMessage='Add New'>
                {text => text}
              </FormattedMessage>
            </Button>
          </UnpaddedColumn>
        </StyledRow>

        <GridColumn computer={8}>
          <Grid>
            <RightUnpaddedRow>
              <UnpaddedColumn computer={16}>
                <Button.Group fluid>
                  <StyledButton
                    type='button'
                    disabled={this.props.shippingQuotesAreFetching}
                    onClick={() => this.handleToggleChange(true)}
                    active={this.props.otherAddresses}
                    {...this.props.otherAddresses ? { color: 'blue' } : { basic: true }}
                    data-test='purchase_order_address_btn'>
                    <FormattedMessage id='cart.addresses' defaultMessage='Addresses'>
                      {text => text}
                    </FormattedMessage>
                  </StyledButton>
                  <Button.Or text={formatMessage({ id: 'global.or', defaultMessage: 'or' })} />
                  <StyledButton
                    type='button'
                    disabled={this.props.shippingQuotesAreFetching}
                    onClick={() => this.handleToggleChange(false)}
                    active={!this.props.otherAddresses}
                    {...!this.props.otherAddresses ? { color: 'blue' } : { basic: true }}
                    data-test='purchase_order_branches_btn'>
                    <FormattedMessage id='cart.warehouses' defaultMessage='Warehouses'>
                      {text => text}
                    </FormattedMessage>
                  </StyledButton>
                </Button.Group>
              </UnpaddedColumn>
            </RightUnpaddedRow>

            <RightUnpaddedRow>
              <UnpaddedColumn computer={16}>
                <Dropdown
                  name='address'
                  fluid
                  selection
                  inputProps={{
                    icon: 'search',
                    search: (options, query) => {
                      return options.filter(opt => opt.searchText.toLowerCase().includes(query.trim().toLowerCase()))
                    },
                    disabled: this.props.shippingQuotesAreFetching,
                    onChange: (_, { value }) => getAddress(value),
                    placeholder: <FormattedMessage id='global.selectLocation' defaultMessage='Select Location' />
                  }}
                  options={dropdownOptions}
                  value={selectedAddress ? selectedAddress.id : null}
                  data-test='purchase_order_location_drpdn'
                />
              </UnpaddedColumn>
            </RightUnpaddedRow>
          </Grid>
        </GridColumn>

        <GridColumn computer={8}>
          <ShippingAddress billingInfo={selectedAddress} companyName={this.props.companyName} additionalContent={
            <GridRow>
              <TopUnpaddedColumn computer={16}>
                <Button type='button' onClick={() => handleOpen({ modalOpen: true, isNewAddress: false })} fluid basic>
                  <Icon name='edit outline' />
                  <FormattedMessage id='global.edit' defaultMessage='Edit'>{text => text}</FormattedMessage>
                </Button>
              </TopUnpaddedColumn>
            </GridRow>
          } />
        </GridColumn>
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
