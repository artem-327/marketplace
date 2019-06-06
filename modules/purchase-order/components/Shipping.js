import React, { Component } from 'react'
import PropTypes, { bool } from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Grid, Segment, GridRow, GridColumn, Dropdown, Divider, Header, Button } from 'semantic-ui-react'
import ShippingAddress from './ShippingAddress'


class Shipping extends Component {
  handleToggleChange = (otherAddresses) => {
    if (otherAddresses !== this.props.otherAddresses) {
      let { branches, getBranches } = this.props

      this.props.handleToggleChange(otherAddresses)
        .then(() => {
          if (branches.length === 0 && !this.props.otherAddresses) getBranches()
        })

    }
  }

  render() {
    let { deliveryAddresses, branches, getAddress, selectedAddress, intl } = this.props
    let { formatMessage } = intl

    let addresses = this.props.otherAddresses ? deliveryAddresses : branches

    let dropdownOptions = addresses.map(i => ({
      text: `${i.address.streetAddress}, ${i.address.city}`,
      value: i.id,
      key: i.id
    }))


    return (
      <Segment>
        <Grid className='bottom-padded'>
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
                    onClick={() => this.props.shippingChanged({ isShippingEdit: true, isNewAddress: !!selectedAddress })}>
                    <FormattedMessage
                      id='global.edit'
                      defaultMessage='Edit'
                    />
                  </span>
                </GridColumn>
              )
            }
          </GridRow>
          <GridRow>
            <GridColumn textAlign='center' computer={8}>
              <Button.Group>
                <Button disabled={this.props.shippingQuotesAreFetching} onClick={() => this.handleToggleChange(true)} active={this.props.otherAddresses}><FormattedMessage id='cart.addresses' defaultMessage='Addresses' /></Button>
                <Button.Or text={formatMessage({ id: 'global.or', defaultMessage: 'or' })} />
                <Button disabled={this.props.shippingQuotesAreFetching} onClick={() => this.handleToggleChange(false)} active={!this.props.otherAddresses}><FormattedMessage id='cart.branches' defaultMessage='Branches' /></Button>
              </Button.Group>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn computer={8}>
              <Dropdown
                fluid
                selection
                disabled={this.props.shippingQuotesAreFetching}
                options={dropdownOptions}
                onChange={(e, { value }) => getAddress(value)}
                value={selectedAddress ? selectedAddress.id : null}
                placeholder={<FormattedMessage id='global.selectLocation' defaultMessage='Select Location' />}
              />
            </GridColumn>
          </GridRow>
          {selectedAddress && <Divider />}

          <ShippingAddress selectedAddress={selectedAddress} />
        </Grid>
      </Segment>

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
