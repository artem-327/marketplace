import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import MyNetworkTable from './Table'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  loadingDatagrid: false,
  rows: [],
  connectionsStatuses: () => { },
  getConnection: () => { },
  loadingDetailRow: false,
  showBluePallet: () => { },
  query: {},
  isCompanyAdmin: false
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<MyNetworkTable {...setupProps} />)
}

/**
 * @test {MyNetworkTable }
 */
describe('`MyNetworkTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(MyNetworkTable, defaultProps)
  })

  test('renders MyNetworkTable component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
