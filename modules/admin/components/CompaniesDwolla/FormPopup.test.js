import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import FormPopup from './FormPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  countries: [],
  getCountries: () => {},
  closeRegisterDwollaAccount: () => {},
  postDwollaAccount: () => {},
  popupValues: null
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<FormPopup {...setupProps} />)
}

/**
 * @test {FormPopup }
 */
describe('`FormPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(FormPopup, defaultProps)
  })

  test('renders FormPopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
