import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import CasProductsSidebar from './CasProductsSidebar'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  closeAddPopup: () => { },
  postNewCasProductRequest: () => { },
  updateCasProductRequest: () => { },
  popupValues: null,
  updating: false
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<CasProductsSidebar {...setupProps} />)
}

/**
 * @test { CasProductsSidebar }
 */
describe('`CasProductsSidebar` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(CasProductsSidebar, defaultProps)
  })

  test('renders CasProductsSidebar component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
