import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ProductPopup from './ProductPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  packagingTypesAll: [],
  packagingType: [],
  unitsAll: [],
  hazardClasses: [],
  packagingGroups: [],
  documentTypes: [],
  attachments: [],
  productsUnitsType: [],
  freightClasses: [],
  companyGenericProduct: [],
  nmfcNumbersFiltered: [],
  packageWeightUnits: [],
  popupValues: {},
  intl: {},
  datagrid: {},
  toastManager: null,
  companyGenericProductFetching: false,
  nmfcNumbersFetching: false,
  loading: false,
  palletWeightInitFromSettings: '',
  palletHeightInitFromSettings: '',
  palletWidthInitFromSettings: '',
  palletLengthInitFromSettings: '',
  palletWeightUnitInitFromSettings: '',
  getPackagingTypes: () => {},
  getUnits: () => {},
  getHazardClasses: () => {},
  getPackagingGroups: () => {},
  getDocumentTypes: () => {},
  addNmfcNumber: () => {},
  closePopup: () => {},
  openGlobalAddForm: () => {},
  removeAttachmentLinkCompanyProduct: () => {},
  removeAttachment: () => {},
  handleSubmitProductEditPopup: () => {},
  handleSubmitProductAddPopup: () => {},
  searchCompanyGenericProduct: () => {},
  getNmfcNumbersByString: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ProductPopup {...setupProps} />)
}

/**
 * @test { ProductPopup }
 */
describe('`ProductPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ProductPopup, defaultProps)
  })

  test('renders ProductPopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
