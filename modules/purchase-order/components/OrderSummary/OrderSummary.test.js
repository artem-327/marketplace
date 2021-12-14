import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import OrderSummary from './OrderSummary'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  buttonText: 'Missing buttonText value!',
  onButtonClick: () => { },
  loading: false
}

/**
 * @test { OrderSummary }
 */
describe('`OrderSummary` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(OrderSummary, defaultProps)
  })
})
