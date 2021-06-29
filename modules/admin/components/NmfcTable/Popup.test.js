import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Popup from './Popup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  addNmfcNumber: () => {},
  editNmfcNumber: () => {},
  closeAddPopup: () => {},
  popupValues: null,
  config: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Popup {...setupProps} />)
}

/**
 * @test {BasicButton }
 */
describe('`BasicButton` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Popup, defaultProps)
  })

  test('renders BasicButton component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
