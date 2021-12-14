import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import HeaderRow from './HeaderRow'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  itemsCount: 0
}

/**
 * @test { HeaderRow }
 */
describe('`HeaderRow` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(HeaderRow, defaultProps)
  })
})
