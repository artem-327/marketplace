import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import AttachmentManager from './AttachmentManager'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  tableProps: {},
  asModal: true,
  selectable: true,
  documentTypesForCertificates: [],
  singleSelection: false,
  lockedFileTypes: false
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<AttachmentManager {...setupProps} />)
}

/**
 * @test { AttachmentManager }
 */
describe('`AttachmentManager` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(AttachmentManager, defaultProps)
  })

  test('renders AttachmentManager component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
