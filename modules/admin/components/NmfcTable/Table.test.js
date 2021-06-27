import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Table from './Table'

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
  return shallow(<Table {...setupProps} />)
}

/**
 * @test {BasicButton }
 */
describe('`BasicButton` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Table, defaultProps)
  })

  test('renders BasicButton component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
