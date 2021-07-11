import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import AddInventoryForm from './AddInventoryForm'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  searchedOriginsLoading: false,
  poCreated: false,
  loading: false,
  autocompleteDataLoading: false,
  searchedProducts: [],
  documentTypesDropdown: [],
  productConditionsDropdown: [],
  productFormsDropdown: [],
  productGradesDropdown: [],
  searchedOrigins: [],
  warehousesList: [],
  autocompleteData: [],
  initialState: {},
  intl: {},
  applicationName: '',
  id: null,
  searchOrigins: () => {},
  addProductOffer: () => {},
  getAutocompleteData: () => {},
  resetForm: () => {},
  initProductOfferEdit: () => {},
  downloadAttachment: () => {},
  removeAttachment: () => {},
  edit: false,
  toastManager: null
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<AddInventoryForm {...setupProps} />)
}

/**
 * @test { AddInventoryForm }
 */
describe('`AddInventoryForm` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(AddInventoryForm, defaultProps)
  })

  test('renders AddInventoryForm component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
