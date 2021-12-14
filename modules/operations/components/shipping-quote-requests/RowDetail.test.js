import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import RowDetail from './RowDetail'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  rows: []
}

/**
 * @test { RowDetail }
 */
describe('`Shipping Quote Request RowDetail` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(RowDetail, defaultProps)
  })
})
