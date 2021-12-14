import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import EditAltNamesEchoProductPopup from './EditAltNamesEchoProductPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  closePopup: () => { },
  getAlternativeCompanyGenericProductsNames: () => { },
  postNewCompanyGenericProductsAltName: () => { },
  updateCompanyGenericProductsAltName: () => { },
  deleteCompanyGenericProductsAltName: () => { },
  popupValues: {},
  productAltNames: [],
  loading: false
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<EditAltNamesEchoProductPopup {...setupProps} />)
}

/**
 * @test { EditAltNamesEchoProductPopup }
 */
describe('`EditAltNamesEchoProductPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(EditAltNamesEchoProductPopup, defaultProps)
  })

  test('renders EditAltNamesEchoProductPopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
