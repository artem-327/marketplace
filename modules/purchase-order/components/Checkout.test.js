import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import Checkout from './Checkout'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  loading: false
}

/**
 * @test { Checkout }
 */
describe('`Checkout` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Checkout, defaultProps)
  })
})
