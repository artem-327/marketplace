import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import PurchaseOrderShipping from './PurchaseOrderShipping'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  orderId: 0,
  applicationName: '',
  order: {},
  intl: {},
  shippingQuotes: {},
  isSending: false,
  shippingQuotesAreFetching: false,
  getShippingQuotes: () => { },
  closePopup: () => { },
  purchaseShipmentOrder: () => { },
  getPurchaseOrder: () => { },
  getManualShippingQuote: () => { }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<PurchaseOrderShipping {...setupProps} />)
}

/**
 * @test { PurchaseOrderShipping }
 */
describe('`PurchaseOrderShipping` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(PurchaseOrderShipping, defaultProps)
  })

  test('renders PurchaseOrderShipping component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
