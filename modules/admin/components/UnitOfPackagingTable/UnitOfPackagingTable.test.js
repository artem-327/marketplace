import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import UnitOfPackagingTable from './UnitOfPackagingTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  getUnits: () => {},
  deleteUnitOfPackaging: () => {},
  getMeasureTypes: () => {},
  openEditPopup: () => {},
  deleteUnit: () => {},
  rows: [],
  filterValue: null,
  loading: false,
  config: {},
  datagrid: {},
  intl: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<UnitOfPackagingTable {...setupProps} />)
}

/**
 * @test {BasicButton }
 */
describe('`BasicButton` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(UnitOfPackagingTable, defaultProps)
  })

  test('renders BasicButton component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
