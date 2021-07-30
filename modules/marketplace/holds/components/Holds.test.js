import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Holds from './Holds'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  tableHandlersFiltersHolds: {},
  datagrid: {},
  intl: {},
  rows: [],
  handleVariableSave: () => {},
  toggleHolds: () => {},
  openPopup: () => {},
  approveHold: () => {},
  rejectHold: () => {},
  cancelHold: () => {},
  toCartHold: () => {},
  isMerchant: false,
  isCompanyAdmin: false,
  isProductOfferManager: false
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Holds {...setupProps} />)
}

/**
 * @test { Holds }
 */
describe('`Holds` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Holds, defaultProps)
  })

  test('renders Holds component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
