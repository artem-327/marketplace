import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import MyListings from './MyListings'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  myListingsFilters: null,
  advancedFilters: null,
  datagrid: {},
  intl: {},
  broadcastTemplates: [],
  rows: [],
  pricingEditOpenId: null,
  editedId: null,
  focusInput: '',
  applicationName: '',
  datagridFilterUpdate: false,
  isModalDetailOpen: false,
  isOpenImportPopup: false,
  updatingDatagrid: false,
  isProductInfoOpen: false,
  toastManager: null,
  modalDetailTrigger: () => {},
  applyDatagridFilter: () => {},
  getTemplates: () => {},
  setCompanyElligible: () => {},
  handleVariableSave: () => {},
  updateRow: () => {},
  openImportPopup: () => {},
  openPopup: () => {},
  closeModalDetail: () => {},
  deleteProductOffer: () => {},
  setPricingEditOpenId: () => {},
  closePopup: () => {},
  broadcastChange: () => {},
  patchBroadcast: () => {},
  groupOffers: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<MyListings {...setupProps} />)
}

/**
 * @test { MyListings }
 */
describe('`MyListings` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(MyListings, defaultProps)
  })

  test('renders MyListings component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
