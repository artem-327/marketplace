/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, formatMessage } from 'react-intl'
import { getSafe } from "~/utils/functions"
import { currency } from '~/constants/index'

// Styles
import {
  DivHandlerWrapper,
  ButtonSwitch,
  InputSearch
} from './ShippingHandler.styles'

const ShippingHandler = props => {

  const {
    intl: { formatMessage },
    warehouseAddressSwitch,
    onSetWarehouseAddressSwitchChange,
    searchValue,
    onSetSearchValueChange
  } = props

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

export default injectIntl(ShippingHandler)