import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ReviewItems from './ReviewItems'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  itemsCount: 0
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ReviewItems {...setupProps} />)
}

/**
 * @test { ReviewItems }
 */
describe('`ReviewItems` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ReviewItems, defaultProps)
  })

  test('renders ReviewItems component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
