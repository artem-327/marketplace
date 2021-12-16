import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import CartItem from './CartItem'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  intl: '',
  cart: {},
  deleteCartItem: () => { },
  item: {},
  index: 0,
  sidebarChanged: () => { },
  getProductOffer: () => { },
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<CartItem {...setupProps} />)
}

/**
 * @test { CartItem }
 */
describe('`CartItem` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(CartItem, defaultProps)
  })

  test('renders CartItem component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
