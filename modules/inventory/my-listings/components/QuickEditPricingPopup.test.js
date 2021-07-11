import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import QuickEditPricingPopup from './QuickEditPricingPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  focusInput: '',
  intl: {},
  rawData: {},
  datagrid: {},
  closePricingEditPopup: () => {},
  handlechange: () => {},
  addProductOffer: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<QuickEditPricingPopup {...setupProps} />)
}

/**
 * @test { QuickEditPricingPopup }
 */
describe('`QuickEditPricingPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(QuickEditPricingPopup, defaultProps)
  })

  test('renders QuickEditPricingPopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
