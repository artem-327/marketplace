import React, { Component } from 'react'

import { array, bool, objectOf, string, object } from 'prop-types'
import { RelaxedRow } from '~/components/summary/styledComponents'
import { GridColumn, Header } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

export default class ShippingAddress extends Component {
  getAddress = () => {
    let { selectedAddress } = this.props
    return (
      selectedAddress['phone number'] && (
        <>
          <RelaxedRow>
            <GridColumn>{selectedAddress['phone number']}</GridColumn>
          </RelaxedRow>

          <RelaxedRow>
            <GridColumn>{selectedAddress.email}</GridColumn>
          </RelaxedRow>
        </>
      )
    )
  }

  render() {
    let { selectedAddress, addressOnly, header } = this.props

    return (
      selectedAddress && (
        <>
          <RelaxedRow>
            <GridColumn>
              <Header as='h3'>
                <FormattedMessage {...header} />
              </Header>
            </GridColumn>
          </RelaxedRow>

          <RelaxedRow>
            <GridColumn>
              <strong>{this.props.companyName}</strong>
            </GridColumn>
          </RelaxedRow>

          {selectedAddress['firstName'] && selectedAddress['lastName'] && (
            <RelaxedRow>
              <GridColumn>
                {selectedAddress['firstName']} {selectedAddress['lastName']}
              </GridColumn>
            </RelaxedRow>
          )}

          <RelaxedRow>
            <GridColumn computer={16}>{selectedAddress.address.streetAddress}</GridColumn>
            <GridColumn computer={16}>
              {selectedAddress.address.city}
              {selectedAddress.address.province && `, ${selectedAddress.address.province.name}`},{' '}
              {selectedAddress.address.zip.zip}
            </GridColumn>
          </RelaxedRow>

          {!addressOnly && this.getAddress()}
        </>
      )
    )
  }
}

ShippingAddress.propTypes = {
  selectedAddress: object,
  addressOnly: bool,
  header: objectOf({
    id: string,
    defaultMessage: string
  })
}

ShippingAddress.defaultProps = {
  selectedAddress: null,
  addressOnly: false,
  header: {
    id: 'cart.shippingAddress',
    defaultMessage: 'Shipping Address'
  }
}
