import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import CasProductsSidebarContent from './CasProductsSidebarContent'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  getHazardClasses: () => {},
  intl: {},
  formikProps: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<CasProductsSidebarContent {...setupProps} />)
}

/**
 * @test { CasProductsSidebarContent }
 */
describe('`CasProductsSidebarContent` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(CasProductsSidebarContent, defaultProps)
  })

  test('renders CasProductsSidebarContent component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
