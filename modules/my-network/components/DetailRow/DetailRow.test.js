import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import DetailRow from './DetailRow'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  row: null,
  expandRow: null,
  buttonActionsDetailRow: null,
  openGlobalAddForm: null,
  loadingDetailRow: false,
  updating: false,
  enableButtons: true
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<DetailRow {...setupProps} />)
}

/**
 * @test {DetailRow }
 */
describe('`My network DetailRow` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(DetailRow, defaultProps)
  })

  test('renders My network DetailRow component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
