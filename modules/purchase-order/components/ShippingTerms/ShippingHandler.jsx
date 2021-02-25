/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from "~/utils/functions"
import { currency } from '~/constants/index'
import {
  getDeliveryAddresses,
  getWarehouses,
  searchDeliveryAddresses,
  searchWarehouses
} from '../../actions'

// Styles
import {
  DivHandlerWrapper,
  ButtonSwitch,
  InputSearch
} from './ShippingHandler.styles'

// Services
import {
  searchAddress
} from './ShippingHandler.services'

const ShippingHandler = props => {
  const {
    intl: { formatMessage },
    warehouseAddressSwitch,
    onSetWarehouseAddressSwitchChange,
    searchValue,
    onSetSearchValueChange
  } = props

  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {
    searchAddress(props)
  }, [searchValue])

  return (
    <DivHandlerWrapper>
      <ButtonSwitch
        active={warehouseAddressSwitch === 'warehouses'}
        attached='left'
        onClick={() => onSetWarehouseAddressSwitchChange('warehouses')}
      >
        <FormattedMessage id='checkout.button.myWarehouses' defaultMessage='My Warehouses'>
          {text => text}
        </FormattedMessage>
      </ButtonSwitch>
      <ButtonSwitch
        active={warehouseAddressSwitch !== 'warehouses'}
        attached='right'
        onClick={() => onSetWarehouseAddressSwitchChange('addresses')}
      >
        <FormattedMessage id='checkout.button.deliveryAddresses' defaultMessage='Delivery Addresses'>
          {text => text}
        </FormattedMessage>
      </ButtonSwitch>
      <InputSearch
        name='searchInput'
        icon='search'
        value={searchValue}
        onChange={(e, data) => onSetSearchValueChange(data.value)}
        placeholder={
          formatMessage({ id: 'checkout.shipping.searchInput', defaultMessage: 'Search by Name or Address' })
        }
      />
    </DivHandlerWrapper>
  )
}

ShippingHandler.propTypes = {
  warehouseAddressSwitch: PropTypes.string,
  onSetWarehouseAddressSwitchChange: PropTypes.func,
  searchValue: PropTypes.string,
  onSetSearchValueChange: PropTypes.func
}

ShippingHandler.defaultProps = {
  warehouseAddressSwitch: 'warehouses',
  onSetWarehouseAddressSwitchChange: () => {},
  searchValue: '',
  onSetSearchValueChange: () => {}
}

function mapStateToProps(store) {
  return {

  }
}

export default injectIntl(connect(mapStateToProps, {
  getDeliveryAddresses, getWarehouses, searchDeliveryAddresses, searchWarehouses
})(ShippingHandler))