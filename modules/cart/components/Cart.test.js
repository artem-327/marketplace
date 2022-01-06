import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import Cart from './Cart'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  getCart: () => { },
  cartIsFetching: false,
  cart: {},
  intl: {
    formatMessage: () => {  }
  },
  sidebar: {},
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Cart {...setupProps} />)
}
/**
 * @test { Cart }
 */
describe('`Cart` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Cart, defaultProps)
  })

  test('renders Cart component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
