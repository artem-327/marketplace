import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Payment from './Payment'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  isExpanded: false,
  allAccepted: false,
  sectionState: {},
  onValueChange: () => { },
  setSummaryButtonCaption: () => { },
  value: {},
  isThirdPartyConnectionException: false,
  getPayments: () => { },
  isFetching: false,
  isHideInactiveAccounts: false
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Payment {...setupProps} />)
}

/**
 * @test { Payment }
 */
describe('`Payment` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Payment, defaultProps)
  })

  test('renders Payment component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
