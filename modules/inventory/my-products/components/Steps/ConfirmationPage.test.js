import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import ConfirmationPage from './ConfirmationPage'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  myProductsFilters: null,
  datagrid: {},
  intl: {},
  action: '',
  rows: [],
  actionId: null,
  editedId: null,
  loaded: false,
  loading: false,
  isOpenPopup: false,
  isOpenImportPopup: false,
  openPopup: () => {},
  openImportPopup: () => {},
  handleVariableSave: () => {},
  handleProductCatalogUnmappedValue: () => {},
  deleteProduct: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ConfirmationPage {...setupProps} />)
}

/**
 * @test { ConfirmationPage }
 */
describe('`ConfirmationPage` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ConfirmationPage, defaultProps)
  })

  test('renders ConfirmationPage component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
