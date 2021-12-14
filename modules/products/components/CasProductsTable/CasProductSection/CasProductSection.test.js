import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import CasProductSection from './CasProductSection'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  items: [],
  toggle: '',
  hazardClasses: [],
  hazardClassesLoading: false,
  formikProps: {},
  label: ''
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<CasProductSection {...setupProps} />)
}

/**
 * @test { CasProductSection }
 */
describe('`CasProductSection` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(CasProductSection, defaultProps)
  })

  test('renders CasProductSection component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
