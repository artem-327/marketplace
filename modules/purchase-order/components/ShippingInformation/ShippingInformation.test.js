import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ShippingInformation from './ShippingInformation'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  itemsCount: 0
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ShippingInformation {...setupProps} />)
}

/**
 * @test { ShippingInformation }
 */
describe('`ShippingInformation` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ShippingInformation, defaultProps)
  })

  test('renders ShippingInformation component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
