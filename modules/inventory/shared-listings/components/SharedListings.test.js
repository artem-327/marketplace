import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import SharedListings from './SharedListings'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  rows: [],
  broadcastTemplates: [],
  isOpenPriceBookModal: false,
  setActiveTab: () => {},
  getTemplates: () => {},
  triggerPriceBookModal: () => {},
  getMarkUp: () => {},
  broadcastChange: () => {},
  rowPriceBook: null,
  datagrid: {},
  intl: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<SharedListings {...setupProps} />)
}

/**
 * @test { SharedListings }
 */
describe('`SharedListings` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(SharedListings, defaultProps)
  })

  test('renders SharedListings component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
