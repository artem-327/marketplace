import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ModalResolveDispute from './ModalResolveDispute'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  orderId: null,
  open: false,
  disputeReasonComment: '',
  disputeAttachments: [],
  loading: false,
  onClose: () => { },
  actions: {
    resolveDisputeAccept: () => { },
    resolveDisputeCredit: () => { },
    resolveDisputeReject: () => { },
    downloadDisputeAttachment: () => { }
  }
}

/**
 * @test { ModalResolveDispute }
 */
describe('`Orders ModalResolveDispute` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ModalResolveDispute, defaultProps)
  })
})
