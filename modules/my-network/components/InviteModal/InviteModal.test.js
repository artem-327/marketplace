import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import InviteModal from './InviteModal'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  className: '',
  content: '',
  files: [],
  type: '',
  uploadClass: '',
  uploadedClass: '',
  acceptFiles: '',
  listDocumentTypes: [],
  noWrapperStyles: false
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
 * @test { InviteModal }
 */
describe('`InviteModal` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(InviteModal, defaultProps)
  })

  test('renders InviteModal component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
