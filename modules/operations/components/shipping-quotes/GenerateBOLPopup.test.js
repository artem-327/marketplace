import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import GenerateBOLPopup from './GenerateBOLPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  intl: {}
}

/**
 * @test { GenerateBOLPopup }
 */
describe('`GenerateBOLPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(GenerateBOLPopup, defaultProps)
  })
})
