import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import ConfirmationPopup from './ConfirmationPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  onClose: () => { }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ConfirmationPopup {...setupProps} />)
}

/**
 * @test { ConfirmationPopup }
 */
describe('`ConfirmationPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ConfirmationPopup, defaultProps)
  })

  test('renders ConfirmationPopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
