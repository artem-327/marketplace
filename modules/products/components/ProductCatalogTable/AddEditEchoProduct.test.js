import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import AddEditEchoProduct from './AddEditEchoProduct'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  loadFile: () => { },
  addAttachment: () => { },
  linkAttachment: () => { },
  removeAttachment: () => { },
  removeAttachmentLink: () => { },
  closePopup: () => { },
  searchCasProduct: () => { },
  putCompanyGenericProducts: () => { },
  postCompanyGenericProducts: () => { },
  searchManufacturers: () => { },
  editEchoProductChangeTab: () => { },
  loadEditEchoProduct: () => { },
  getHazardClasses: () => { },
  getPackagingGroups: () => { },
  getUnNumbersByString: () => { },
  searchProductGroups: () => { },
  getDocumentTypes: () => { },
  searchCompany: () => { },
  addForm: null,
  editForm: null,
  popupValues: null,
  editTab: 0,
  editInitTrig: false,
  packagingGroups: [],
  hazardClasses: [],
  searchedManufacturersLoading: false,
  searchedManufacturers: [],
  searchedCasProducts: [],
  isLoading: false,
  unNumbersFiltered: [],
  unNumbersFetching: false,
  listDocumentTypes: [],
  searchedProductGroups: [],
  searchedProductGroupsLoading: false,
  searchedCompany: [],
  searchedCompanyLoading: false,
  datagrid: {},
  intl: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<AddEditEchoProduct {...setupProps} />)
}

/**
 * @test { AddEditEchoProduct }
 */
describe('`AddEditEchoProduct` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(AddEditEchoProduct, defaultProps)
  })

  test('renders AddEditEchoProduct component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
