import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import UnitOfMeasureTable from './UnitOfMeasureTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
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
  return shallow(<UnitOfMeasureTable {...setupProps} />)
}

/**
 * @test { UnitOfMeasureTable }
 */
describe('`UnitOfMeasureTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(UnitOfMeasureTable, defaultProps)
  })

  test('renders UnitOfMeasureTable component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
