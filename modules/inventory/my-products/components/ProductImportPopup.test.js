import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ProductImportPopup from './ProductImportPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  csvFileId: null,
  productOffer: false,
  companyGenericProduct: false,
  companies: false,
  csvWithoutHeader: false,
  loading: false,
  isSaveMapCSV: false,
  broadcastTemplates: [],
  mappedHeaders: [],
  missingRequired: [],
  csvImportError: {},
  reloadFilter: null,
  mappedDataHeaderCSV: null,
  selectedSavedMap: null,
  intl: {},
  CSV: null,
  toastManager: null,
  applicationName: '',
  broadcastOption: '',
  closeImportPopupCancel: () => {},
  closeImportPopup: () => {},
  getStoredCSV: () => {},
  clearDataOfCSV: () => {},
  getTemplates: () => {},
  postImportProductOfferMap: () => {},
  postImportCompanyGenericProductMap: () => {},
  postImportCompaniesMap: () => {},
  postImportProductMap: () => {},
  postImportProductOfferCSV: () => {},
  postImportCompanyGenericProductCSV: () => {},
  postImportCompaniesCSV: () => {},
  postImportProductCSV: () => {},
  changeCsvHeader: () => {},
  changeBroadcast: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ProductImportPopup {...setupProps} />)
}

/**
 * @test { ProductImportPopup }
 */
describe('`ProductImportPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ProductImportPopup, defaultProps)
  })

  test('renders ProductImportPopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
