import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import Orders from './Orders'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
    tableHandlersFilters: {},
    rows: {},
    intl: {},
    datagrid: {},
    getDocumentTypes: () => {},
    saveFilters: () => {},
    getRelatedOrders: () => {},
    downloadAttachmentPdf: () => {},
    downloadAttachment: () => {},
    clearRelatedOrders: () => {}, 
    unlinkAttachmentToOrder: () => {},
    removeLinkAttachmentToOrderItem: () => {},
    linkAttachmentToOrder: () => {},
    linkAttachmentToOrderItem: () => {},
    currentTab: '',
    relatedOrders: [],
    router: [],
    listDocumentTypes: [],
    loadRelatedOrders: false,
    documentTypesFetching: false,
    isFetching: false,
    loadingRelatedDocuments: false
}
/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Orders {...setupProps} />)
}

/**
 * @test {BasicButton }
 */
describe('`BasicButton` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Orders, defaultProps)
  })

  test('renders BasicButton component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
