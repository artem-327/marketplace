import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import BidsSent from './BidsSent'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  datagrid: {},
  intl: {},
  tableHandlersFiltersBidsReceived: {},
  isOpenPopup: false,
  loading: false,
  rows: [],
  closePopup: () => {},
  handleVariableSave: () => {},
  acceptOffer: () => {},
  rejectOffer: () => {},
  addOfferToCart: () => {},
  deleteOffer: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<BidsSent {...setupProps} />)
}

/**
 * @test { BidsSent }
 */
describe('`BidsSent` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(BidsSent, defaultProps)
  })

  test('renders BidsSent component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
