import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Orders from './Orders'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  datagrid: {},
  intl: {},
  datagridFilterUpdate: false,
  isFetching: false,
  orderProcessing: false,
  orderAccountingDocumentsLoading: false,
  documentTypesFetching: false,
  rows: [],
  listDocumentTypes: [],
  orderAccountingDocuments: [],
  router: null,
  getAccountingDocuments: () => { },
  downloadAttachmentPdf: () => { },
  downloadAttachment: () => { },
  clearAccountingDocuments: () => { },
  cancelOrder: () => { },
  getDocumentTypes: () => { },
  openOrderDetail: () => { }
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
 * @test { Orders }
 */
describe('`Orders` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Orders, defaultProps)
  })

  test('renders Orders component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
