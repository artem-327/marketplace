import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import BidsRowDetail from './BidsRowDetail'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  intl: {},
  popupValues: null,
  initValues: {},
  datagrid: {},
  productOffer: false,
  isSending: false,
  loading: false,
  seller: false,
  listFobPriceUnit: '',
  packagingType: '',
  packagingUnit: '',
  productName: 'N/A',
  packagingSize: 1,
  openPopup: () => {},
  onUnmount: () => {},
  onClose: () => {},
  counterOffer: () => {},
  acceptOffer: () => {},
  rejectOffer: () => {},
  addOfferToCart: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<BidsRowDetail {...setupProps} />)
}

/**
 * @test { BidsRowDetail }
 */
describe('`BidsRowDetail` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(BidsRowDetail, defaultProps)
  })

  test('renders BidsRowDetail component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
