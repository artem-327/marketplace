import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ShippingHandler from './ShippingHandler'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  warehouseAddressSwitch: 'warehouses',
  onSetWarehouseAddressSwitchChange: () => { },
  searchValue: '',
  onSetSearchValueChange: () => { }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ShippingHandler {...setupProps} />)
}

/**
 * @test { ShippingHandler }
 */
describe('`ShippingHandler` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ShippingHandler, defaultProps)
  })

  test('renders ShippingHandler component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
