import React, { Component } from 'react'

import { array, bool, objectOf, string } from 'prop-types'
import { RelaxedRow } from '~/components/summary/styledComponents'
import { GridColumn, Header } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

export default class ShippingAddress extends Component {
  getAddress = () => {
    let { selectedAddress } = this.props
    return (
      selectedAddress["phone number"] &&
      <>
        <RelaxedRow>
          <GridColumn>
            {selectedAddress["phone number"]}
          </GridColumn>
        </RelaxedRow>

        <RelaxedRow>
          <GridColumn>
            {selectedAddress.email}
          </GridColumn>
        </RelaxedRow>
      </>
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
                <FormattedMessage
                  {...header}
                />
              </Header>
            </GridColumn>
          </RelaxedRow>

          {selectedAddress["firstName"] && selectedAddress["lastName"] &&
            <RelaxedRow>
              <GridColumn>
                {selectedAddress["firstName"]} {selectedAddress["lastName"]}
              </GridColumn>
            </RelaxedRow>}

          <RelaxedRow>
            <GridColumn>
              {selectedAddress.address.streetAddress}
            </GridColumn>
          </RelaxedRow>

          <RelaxedRow>
            <GridColumn>
              {selectedAddress.address.city}{selectedAddress.address.province && `, ${selectedAddress.address.province.name}`}, {selectedAddress.address.zip.zip}
            </GridColumn>
          </RelaxedRow>

          {!addressOnly && this.getAddress()}
        </>
      )
    )
  }
}


ShippingAddress.propTypes = {
  selectedAddress: array,
  addressOnly: bool,
  header: objectOf({
    id: string,
    defaultMessage: string
  })
}

ShippingAddress.defaultProps = {
  selectedAddress: [],
  addressOnly: false,
  header: {
    id: 'cart.shippingAddress',
    defaultMessage: 'Shipping Address'
  }
}