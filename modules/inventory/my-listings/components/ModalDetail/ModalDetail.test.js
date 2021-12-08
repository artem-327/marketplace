import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import ModalDetail from './ModalDetail'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  detailValues: {},
  intl: {},
  datagrid: {},
  modalActiveTab: 0,
  editProductOfferInitTrig: false,
  loading: false,
  isLoadingBroadcast: false,
  autocompleteDataLoading: false,
  tdsTemplatesLoading: false,
  productFormsDropdown: [],
  productGradesDropdown: [],
  warehousesList: [],
  documentTypesDropdown: [],
  broadcastTemplates: [],
  tdsTemplates: [],
  autocompleteData: [],
  toastManager: null,
  applicationName: '',
  currencySymbol: '$',
  loadFile: () => {},
  addAttachment: () => {},
  removeAttachmentLinkProductOffer: () => {},
  removeAttachment: () => {},
  broadcastChange: () => {},
  getProductForms: () => {},
  getProductGrades: () => {},
  getWarehouses: () => {},
  closeModalDetail: () => {},
  deleteTdsTemplate: () => {},
  getTdsTemplates: () => {},
  saveTdsAsTemplate: () => {},
  getAutocompleteData: () => {},
  addProductOffer: () => {},
  openBroadcast: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ModalDetail {...setupProps} />)
}

/**
 * @test { ModalDetail }
 */
describe('`ModalDetail` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ModalDetail, defaultProps)
  })

  test('renders ModalDetail component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
