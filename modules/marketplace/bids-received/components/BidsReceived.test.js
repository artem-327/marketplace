import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import BidsReceived from './BidsReceived'

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
  rejectOffer: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<BidsReceived {...setupProps} />)
}

/**
 * @test { BidsReceived }
 */
describe('`BidsReceived` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(BidsReceived, defaultProps)
  })

  test('renders BidsReceived component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
