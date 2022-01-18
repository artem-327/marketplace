import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
// import { filterTypes } from '../constants/filter'
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../test/testUtils'
//Components
import TableHandlers from './TableHandlers'

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
  return shallow(<TableHandlers {...setupProps} />)
}

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  openSidebar: () => { },
  openImportPopup: () => { },
  intl: {},
  isOpenImportPopup: false,
  currentTab: 0,
  searchedCompaniesFilterLoading: false,
}

describe('`TableHandlers` render component', () => {

  test('does not throw warning with expected props', () => {
    checkProps(TableHandlers, defaultProps)
  })

  test('renders TableHandlers component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
