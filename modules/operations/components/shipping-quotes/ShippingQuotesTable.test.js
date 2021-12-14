import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ShippingQuotesTable from './ShippingQuotesTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  datagrid: {},
  intl: {},
  loading: false,
  filterValue: '',
  rows: [],
  deleteShippingQuote: () => { },
  downloadAttachment: () => { },
  generateBOL: () => { }
}

/**
 * @test { ShippingQuotesTable }
 */
describe('`ShippingQuotesTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ShippingQuotesTable, defaultProps)
  })
})
