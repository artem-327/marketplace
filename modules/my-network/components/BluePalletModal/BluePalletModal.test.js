import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import BluePalletModal from './BluePalletModal'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  open: true,
  onClose: () => { }
}

/**
 * @test {BluePalletModal }
 */
describe('`BluePalletModal` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(BluePalletModal, defaultProps)
  })
})
