import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Detail from './Detail'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  order: {},
  intl: {},
  echoSupportPhone: 'N/A',
  isDetailFetching: false,
  isOpenPopup: false,
  loading: false,
  isCancelable: false,
  closePopup: () => { },
  openPopup: () => { },
  resolveDisputeReject: () => { },
  resolveDisputeCredit: () => { },
  resolveDisputeAccept: () => { },
  downloadDisputeAttachment: () => { },
  openOrderDetail: () => { },
  downloadPdf: () => { },
  downloadAttachment: () => { }
}

/**
 * @test { Detail }
 */
describe('`Orders Detail` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Detail, defaultProps)
  })
})
