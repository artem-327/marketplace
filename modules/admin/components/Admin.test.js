import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import Admin from './Admin'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
    currentEditForm: null,
    currentAddForm: null,
    currentAddDwolla: null,
    currentTab: '',
    closePopup: () => {},
    auth: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Admin {...setupProps} />)
}

/**
 * @test { Admin }
 */
describe('`Admin` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Admin, defaultProps)
  })

  test('renders Admin component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
