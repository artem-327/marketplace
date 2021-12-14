import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import FreightSelection from './FreightSelection'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  intl: {
    formatMessage: () => { }
  },
  isExpanded: false,
  allAccepted: false,
  sectionState: {},
  shippingQuotes: {},
  onValueChange: () => { },
  setSummaryButtonCaption: () => { },
  value: {},
  orderTotal: '',
  fixedFreightId: 0,
  cart: {},
  shippingQuotesAreFetching: false,
  shipmentQuoteId: 0,
  setShipmentQuoteId: 0
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<FreightSelection {...setupProps} />)
}

/**
 * @test { FreightSelection }
 */
describe('`FreightSelection` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(FreightSelection, defaultProps)
  })

  test('renders FreightSelection component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
