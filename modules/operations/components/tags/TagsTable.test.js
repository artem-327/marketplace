import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import TagsTable from './TagsTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  datagrid: {},
  loading: false,
  filterValue: '',
  rows: []
}

/**
 * @test { TagsTable }
 */
describe('`TagsTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(TagsTable, defaultProps)
  })
})
