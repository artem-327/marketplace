import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../../test/testUtils'
//Components
import Tabs from './Tabs'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  row: {},
  activeTab: null,
  setActiveTab: () => { }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Tabs {...setupProps} />)
}

/**
 * @test { Tabs }
 */
describe('`Tabs` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Tabs, defaultProps)
  })

  test('renders Tabs component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
