import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Listings from './Listings'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  tableHandlersFiltersListings: {},
  advancedFilters: {},
  datagrid: {},
  intl: {},
  sidebar: {},
  datagridFilter: {},
  selectedSellerOption: {},
  datagridFilterUpdate: false,
  datagridFilterReload: false,
  isOpenPopup: false,
  buyEligible: false,
  searchedCompaniesLoading: false,
  isProductInfoOpen: false,
  searchedCompaniesDropdown: [],
  rows: [],
  applyDatagridFilter: () => {},
  sidebarChanged: () => {},
  handleVariableSave: () => {},
  saveSellerOption: () => {},
  searchCompanies: () => {},
  getProductOffer: () => {},
  closePopup: () => {},
  openPopup: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Listings {...setupProps} />)
}

/**
 * @test { Listings }
 */
describe('`Listings` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Listings, defaultProps)
  })

  test('renders Listings component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
