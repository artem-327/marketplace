import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import Detail from './Detail'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
    router: {}, 
  order: {},
  toastManager: {},
  intl: {},
  appInfo: {},
  isDetailFetching: false,
  openedAssignLots: false,
  openedReinitiateTransfer: false,
  openedEnterTrackingIdShip: false,
  openedEnterTrackingIdReturnShip: false,
  openedPurchaseRejectDelivery: false,
  openedPurchaseRequestCreditDelivery: false,
  openedPurchaseReviewCreditRequest: false,
  openedSaleReturnShipping: false,
  openedSaleReviewCreditRequest: false,
  openedPurchaseOrderShipping: false,
  opendSaleAttachingProductOffer: false,
  loadingRelatedDocuments: false,
  isPaymentCancellable: false,
  isOrderProcessing: false,
  isCompanyAdmin: false,
  isAdmin: false,
  openedDisputedRequest: false,
  isSending: false,
  echoSupportPhone: [],
  listDocumentTypes: [], 
  cancelPayment: () => {},
  editTrackingCode: () => {},
  editReturnTrackingCode: () => {},
  orderResolutionAccept: () => {},
  orderResolutionReopen: () => {},
  closePopup: () => {},
  linkAttachmentToOrder: () => {}, 
  getPurchaseOrder: () => {},
  unlinkAttachmentToOrder: () => {},
  downloadAttachment: () => {},
  getSaleOrder: () => {},
  loadDetail: () => {}, 
  getDocumentTypes: () => {}, 
  clearOrderDetail: () => {},
  linkAttachmentToOrderItem: () => {}
}
/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Detail {...setupProps} />)
}

/**
 * @test {BasicButton }
 */
describe('`BasicButton` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Detail, defaultProps)
  })

  test('renders BasicButton component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
