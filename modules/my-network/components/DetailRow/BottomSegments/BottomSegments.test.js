import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import BottomSegments from './BottomSegments'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  legalData: null,
  marketingData: null,
  verifiedData: null
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<BottomSegments {...setupProps} />)
}

/**
 * @test { BottomSegments }
 */
describe('`BottomSegments` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(BottomSegments, defaultProps)
  })

  test('renders BottomSegments component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
