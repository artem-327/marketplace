import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Carriers from './Carriers'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  rows: [],
  filterValue: '',
  openPopup: () => {},
  deleteCarrier: () => {},
  loading: false,
  updating: false,
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
  return shallow(<Carriers {...setupProps} />)
}

/**
 * @test {Carriers }
 */
describe('`Carriers` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Carriers, defaultProps)
  })

  test('renders Carriers component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
