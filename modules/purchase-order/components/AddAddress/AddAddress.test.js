import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import AddAddress from './AddAddress'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  selectedAddress: null,
  savedShippingPreferences: false,
  setIsOpenAddAddress: () => { }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<AddAddress {...setupProps} />)
}

/**
 * @test { AddAddress }
 */
describe('`AddAddress` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(AddAddress, defaultProps)
  })

  test('renders AddAddress component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
