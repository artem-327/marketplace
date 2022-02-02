import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import DeliveryDatePopup from './DeliveryDatePopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  onClose: () => { },
  onSubmit: () => { },
  manualShipmentPending: false,
  cart: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<DeliveryDatePopup {...setupProps} />)
}

/**
 * @test { DeliveryDatePopup }
 */
describe('`DeliveryDatePopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(DeliveryDatePopup, defaultProps)
  })

  test('renders DeliveryDatePopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
