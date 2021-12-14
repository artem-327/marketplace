import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ShippingQuotesPopup from './ShippingQuotesPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  updateDatagrid: true,
  searchedManQuotRequestsLoading: false,
  popupValues: null,
  intl: {},
  datagrid: {},
  searchedManQuotRequests: [],
  toastManager: null,
  createShippingQuote: () => { },
  closePopup: () => { },
  searchManualQuoteRequest: () => { }
}

/**
 * @test { ShippingQuotesPopup }
 */
describe('`ShippingQuotesPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ShippingQuotesPopup, defaultProps)
  })
})
