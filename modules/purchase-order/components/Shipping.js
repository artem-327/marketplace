import React, { Component } from 'react'
import { array, func, object, bool } from 'prop-types'

import { FormattedMessage, injectIntl } from 'react-intl'

import { GridRow, GridColumn, Header, Button, Icon, Grid, Modal, Radio } from 'semantic-ui-react'
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
import { Edit2, RefreshCcw } from 'react-feather'

const StyledButton = styled(Button)`
  ${props =>
    props.basic &&
    `
    border-radius: 4px !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06) !important;
    border: solid 1px #dee2e6 !important;
  `}
`

const ButtonAddNew = styled(Button)`
  padding: 0 !important;
  height: 28px !important;
`

const DropdownAddress = styled(Dropdown)`
  z-index: 600;
`

const DivIcon = styled.div`
  display: flex;
  align-self: center;
  margin-right: 8px;
`

const RectangleAddress = styled.div`
  height: 100px;
  border-radius: 4px;
  background-color: #f8f9fb;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  ${props =>
    props.active
      ? 'border: solid 1px #2599d5; background-color: rgba(37, 153, 213, 0.1);'
      : 'border: solid 1px #dee2e6; background-color: #f8f9fb;'}
  .ui.radio.checkbox input:focus:checked ~ label:after,
  .ui.radio.checkbox input:checked ~ label:after {
    background-color: #2599d5;
  }
`

const DivTitleAddress = styled.div`
  font-weight: bold;
`

const RadioAddress = styled(Radio)`
  align-self: center;
`

class Shipping extends Component {
  state = {
    isOpenModalAddress: false,
    activeIdAddress: null
  }

  componentDidMount() {
    if (this.props.selectedAddress && this.props.formikProps) {
      this.props.formikProps.setFieldValue('address', this.props.selectedAddress.id)
    }
    this.props.getWarehouses()
  }

  componentDidUpdate(prevProps) {
    const { selectedAddress } = this.props
    if (
      this.props.formikProps &&
      getSafe(() => prevProps.selectedAddress.id, '') !== getSafe(() => selectedAddress.id, '')
    ) {
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

  renderModalAddress = () => {
    const { activeIdAddress } = this.state
    const { deliveryAddresses, warehouses, getAddress } = this.props

    let addresses = []
    if (deliveryAddresses.length) {
      addresses = deliveryAddresses
    }
    if (warehouses.length) {
      addresses = addresses.concat(warehouses.map(warehous => ({ ...warehous.deliveryAddress, id: warehous.id })))
    }

    return (
      <>
        <Modal.Header>
          <FormattedMessage id='cart.changeAddress' defaultMessage='CHANGE ADDRESS' />
        </Modal.Header>
        <Modal.Content>
          <Grid>
            {addresses.map((address, index) => {
              const title = getSafe(() => address.cfName, '')
              const street = getSafe(() => address.address.streetAddress, '')
              const city = getSafe(() => address.address.city, '')
              const state = getSafe(() => address.address.province, '')
                ? getSafe(() => address.address.province.name, '')
                : getSafe(() => address.address.country.name, '')
              const zip = getSafe(() => address.address.zip.zip, '')
              return (
                <Grid.Row>
                  <Grid.Column width={16}>
                    <RectangleAddress
                      key={address.id}
                      active={activeIdAddress === address.id}
                      onClick={() => {
                        this.setState({ activeIdAddress: address.id })
                      }}>
                      <div>
                        <DivTitleAddress>{title}</DivTitleAddress>
                        <div>{street}</div>
                        <div>{`${city}, ${state}, ${zip}`}</div>
                      </div>
                      <RadioAddress checked={activeIdAddress === address.id} />
                    </RectangleAddress>
                  </Grid.Column>
                </Grid.Row>
              )
            })}
          </Grid>
        </Modal.Content>

        <Modal.Actions>
          <Button
            type='button'
            basic
            onClick={() => {
              this.setState({ isOpenModalAddress: false })
            }}
            data-test='cart_modal_address_cancel'>
            <FormattedMessage id='global.close' defaultMessage='Close'>
              {text => text}
            </FormattedMessage>
          </Button>
          <Button
            type='button'
            color='blue'
            onClick={() => {
              getAddress(activeIdAddress)
              this.setState({ isOpenModalAddress: false })
            }}
            data-test='cart_modal_address_save'>
            <FormattedMessage id='global.save'>{text => text}</FormattedMessage>
          </Button>
        </Modal.Actions>
      </>
    )
  }

  render() {
    let {
      deliveryAddresses,
      /* branches, */ warehouses,
      getAddress,
      selectedAddress,
      intl,
      handleNewAddress,
      openSidebar
    } = this.props
    let { formatMessage } = intl

    let addresses = []
    if (deliveryAddresses.length) {
      addresses = deliveryAddresses
    }
    if (warehouses.length) {
      addresses = addresses.concat(warehouses)
    }

    let dropdownOptions = addresses.map(i => {
      const address = i.warehouse ? getSafe(() => i.deliveryAddress.address, '') : getSafe(() => i.address, '')

      return {
        searchText: !i.warehouse
          ? `${getSafe(() => i.addressName, '')}, ${this.getFullAddress(address)}  `
          : `${getSafe(() => i.deliveryAddress.cfName, '')}, ${this.getFullAddress(address)} `,
        text: !i.warehouse
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
        <StyledRow paddingChange verticalAlign='middle' columns={2} bottomShadow>
          <VerticalUnpaddedColumn>
            <Header as='h2'>
              <FormattedMessage id='cart.1shipping' defaultMessage='1. SHIPPING' />
            </Header>
          </VerticalUnpaddedColumn>

          <UnpaddedColumn textAlign='right'>
            <ButtonAddNew
              type='button'
              data-test='purchase_order_edit_address'
              color='blue'
              size='tiny'
              onClick={() => {
                openSidebar()
                handleNewAddress({ isNewAddress: true })
              }}>
              <Icon name='plus circle' />
              <FormattedMessage id='global.addNew' defaultMessage='Add New'>
                {text => text}
              </FormattedMessage>
            </ButtonAddNew>
          </UnpaddedColumn>
        </StyledRow>

        <GridColumn computer={8}>
          <Grid>
            <RightUnpaddedRow>
              <UnpaddedColumn computer={16}>
                <DropdownAddress
                  name='address'
                  fluid
                  selection
                  inputProps={{
                    icon: 'search',
                    search: (options, query) => {
                      return options.filter(opt => opt.searchText.toLowerCase().includes(query.trim().toLowerCase()))
                    },
                    style: { 'z-index': '501' },
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
          <ShippingAddress
            header={<FormattedMessage id='cart.shippingAddress' defaultMessage='Shipping Address' />}
            billingInfo={selectedAddress}
            companyName={this.props.companyName}
            additionalContent={
              <GridRow>
                <TopUnpaddedColumn width={8}>
                  <Button
                    style={{ display: 'flex' }}
                    type='button'
                    onClick={() => {
                      openSidebar()
                      handleNewAddress({ isNewAddress: false })
                    }}
                    basic>
                    <DivIcon>
                      <Edit2 size={16} />
                    </DivIcon>
                    <FormattedMessage id='global.edit' defaultMessage='Edit'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </TopUnpaddedColumn>
                <TopUnpaddedColumn width={8}>
                  <Modal
                    open={this.state.isOpenModalAddress}
                    closeIcon
                    size='tiny'
                    onClose={() => {
                      this.setState({ isOpenModalAddress: false })
                    }}
                    trigger={
                      <Button
                        style={{ display: 'flex' }}
                        type='button'
                        onClick={() => {
                          this.setState({ isOpenModalAddress: true })
                        }}
                        basic>
                        <DivIcon>
                          <RefreshCcw size={16} />
                        </DivIcon>
                        <FormattedMessage id='global.change' defaultMessage='Change'>
                          {text => text}
                        </FormattedMessage>
                      </Button>
                    }>
                    {this.renderModalAddress()}
                  </Modal>
                </TopUnpaddedColumn>
              </GridRow>
            }
          />
        </GridColumn>
      </>
    )
  }
}

export default injectIntl(Shipping)

Shipping.propTypes = {
  deliveryAddresses: array,
  getAddress: func,
  selectedAddress: object
}
