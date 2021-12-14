import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import CompanyInventoryTable from './CompanyInventoryTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  datagrid: {},
  intl: {},
  loading: false,
  filterValue: '',
  rows: []
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<CompanyInventoryTable {...setupProps} />)
}

/**
 * @test { CompanyInventoryTable }
 */
describe('`CompanyInventoryTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(CompanyInventoryTable, defaultProps)
  })

  test('renders CompanyInventoryTable component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
