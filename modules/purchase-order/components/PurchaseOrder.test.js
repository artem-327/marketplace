import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import PurchaseOrder from './PurchaseOrder'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  cartItem: {},
  deliveryAddresses: [],
  dispatch: () => { },
  getCart: () => { },
  getDeliveryAddresses: () => { },
  postPurchaseOrder: () => { },
  deleteCart: () => { },
  selectedAddressId: 0,
  shippingQuotes: []
}

/**
 * @test { PurchaseOrder }
 */
describe('`PurchaseOrder` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(PurchaseOrder, defaultProps)
  })
})
