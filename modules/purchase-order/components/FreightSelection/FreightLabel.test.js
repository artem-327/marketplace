import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import FreightLabel from './FreightLabel'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  isOwn: false,
  onChange: () => { }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<FreightLabel {...setupProps} />)
}

/**
 * @test { FreightLabel }
 */
describe('`FreightLabel` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(FreightLabel, defaultProps)
  })

  test('renders FreightLabel component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
