import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import MyProducts from './MyProducts'

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
  return shallow(<MyProducts {...setupProps} />)
}

/**
 * @test { MyProducts }
 */
describe('`MyProducts` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(MyProducts, defaultProps)
  })

  test('renders MyProducts component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
