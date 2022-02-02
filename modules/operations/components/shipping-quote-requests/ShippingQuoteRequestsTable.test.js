import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ShippingQuoteRequestsTable from './ShippingQuoteRequestsTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  rows: [],
  intl: {},
  datagrid: {}
}

/**
 * @test { ShippingQuoteRequestsTable }
 */
describe('`Shipping Quote Request ShippingQuoteRequestsTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ShippingQuoteRequestsTable, defaultProps)
  })
})
