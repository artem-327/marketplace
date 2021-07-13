import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import ListingDetail from './ListingDetail'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  row: {},
  values: {},
  parentState: {},
  datagrid: {},
  onChange: () => {},
  downloadAttachment: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ListingDetail {...setupProps} />)
}

/**
 * @test { ListingDetail }
 */
describe('`ListingDetail` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ListingDetail, defaultProps)
  })

  test('renders ListingDetail component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
