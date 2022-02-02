import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import InviteModal from './InviteModal'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  open: false,
  isError: false,
  loading: false,
  updating: false,
  onClose: () => { },
  search: () => { },
  detailCompany: null,
  buttonActionsDetailRow: () => { },
  openGlobalAddForm: null,
  intl: { formatMessage: () => { } }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<InviteModal {...setupProps} />)
}

/**
 * @test {InviteModal }
 */
describe('`My network InviteModal` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(InviteModal, defaultProps)
  })

  test('renders My network InviteModal component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
