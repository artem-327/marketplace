import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
// import { filterTypes } from '../constants/filter'
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../../test/testUtils'
//Components
import UsersSidebar from './UsersSidebar'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */
/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<UsersSidebar {...setupProps} />)
}
Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  closePopup: () => { },
  postNewUserRequest: () => { },
  submitUserEdit: () => { },
  searchCompany: () => { },
  initSearchCompany: () => { },
  getUser: () => { },
  searchSellMarketSegments: () => { },
  searchBuyMarketSegments: () => { },
  getCompanyUserRoles: () => { },
  getAdminRoles: () => { },
}

describe('`UsersSidebar` render component', () => {

  test('does not throw warning with expected props', () => {
    checkProps(UsersSidebar, defaultProps)
  })

  test('renders UsersSidebar component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })

})
