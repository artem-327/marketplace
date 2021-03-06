import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import LogisticsTable from './LogisticsTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  loading: false,
  rows: [],
  filterValue: '',
  openPopup: () => {},
  deleteLogisticsProvider: () => {},
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
  return shallow(<LogisticsTable {...setupProps} />)
}

/**
 * @test {LogisticsTable }
 */
describe('`LogisticsTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(LogisticsTable, defaultProps)
  })

  test('renders LogisticsTable component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
