import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ProductCatalogTable from './Table'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  datagrid: {},
  openEditEchoProduct: () => { },
  openEditEchoAltNamesPopup: () => { },
  deleteCompanyGenericProduct: () => { },
  editEchoProductChangeTab: () => { },
  rows: [],
  filterValue: '',
  editedId: null,
  intl: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ProductCatalogTable {...setupProps} />)
}

/**
 * @test { ProductCatalogTable }
 */
describe('`ProductCatalogTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ProductCatalogTable, defaultProps)
  })

  test('renders ProductCatalogTable component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
