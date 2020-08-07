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
`

const DivTitleAddress = styled.div`
  font-weight: bold;
`

const RadioAddress = styled(Radio)`
  align-self: center;
  .ui.radio.checkbox input:focus:checked ~ label:after,
  .ui.radio.checkbox input:checked ~ label:after {
    background-color: #2599d5;
  }
`

class Shipping extends Component {
  state = {
    isOpenModalAddress: false,
    active: null
  }

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

  renderModalAddress = () => {
    const { active } = this.state

    const addresses = [
      { title: 'Title 1', street: 'Street 1', state: 'State 1' },
      { title: 'Title 2', street: 'Street 2', state: 'State 2' },
      { title: 'Title 3', street: 'Street 3', state: 'State 3' }
    ]

    return (
      <>
        <Modal.Header>
          <FormattedMessage id='cart.changeAddress' defaultMessage='CHANGE ADDRESS' />
        </Modal.Header>
        <Modal.Content>
          <Grid>
            {addresses.map((address, index) => (
              <Grid.Row>
                <Grid.Column width={16}>
                  <RectangleAddress
                    key={index}
                    active={active === index}
                    onClick={() => this.setState({ active: index })}>
                    <div>
                      <DivTitleAddress>{address.title}</DivTitleAddress>
                      <div>{address.street}</div>
                      <div>{address.state}</div>
                    </div>
                    <RadioAddress checked={active === index} />
                  </RectangleAddress>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        </Modal.Content>

        <Modal.Actions>
          <Button
            type='button'
            basic
            onClick={() => {
              //TODO function for fetch adresses. Maybe it is not necessery because onClose is in Modal
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
              //TODO
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
                <Button.Group fluid>
                  <StyledButton
                    type='button'
                    disabled={this.props.shippingQuotesAreFetching}
                    onClick={() => this.handleToggleChange(true)}
                    active={this.props.otherAddresses}
                    {...(this.props.otherAddresses ? { color: 'blue' } : { basic: true })}
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
                    {...(!this.props.otherAddresses ? { color: 'blue' } : { basic: true })}
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
                      //TODO function for fetch adresses
                      this.setState({ isOpenModalAddress: false })
                    }}
                    trigger={
                      <Button
                        style={{ display: 'flex' }}
                        type='button'
                        onClick={() => {
                          //TODO function for fetch other adresses
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
  otherAddresses: bool,
  getAddress: func,
  selectedAddress: object
}

Shipping.defaultProps = {
  otherAddresses: true
}
