import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ProductGroupsTable from './ProductGroupsTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  loading: false,
  rows: [],
  datagrid: {},
  filterValue: '',
  openPopup: () => {},
  deleteProductGroups: () => {},
  editedId: null,
  intl: {}
}

/**
 * @test { ProductGroupsTable }
 */
describe('`ProductGroupsTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ProductGroupsTable, defaultProps)
  })
})
