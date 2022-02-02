import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ShippingTerms from './ShippingTerms'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  isExpanded: false,
  allAccepted: false,
  sectionState: {},
  onValueChange: () => { },
  setSummaryButtonCaption: () => { },
  value: {},
  warehousesFetching: false,
  isFetching: false,
  isOpenModal: false,
  setIsOpenAddAddress: () => { },
  deliveryAddresses: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ShippingTerms {...setupProps} />)
}

/**
 * @test { ShippingTerms }
 */
describe('`ShippingTerms` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ShippingTerms, defaultProps)
  })

  test('renders ShippingTerms component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
