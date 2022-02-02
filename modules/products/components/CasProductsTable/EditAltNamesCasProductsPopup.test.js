import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import EditAltNamesCasProductsPopup from './EditAltNamesCasProductsPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  closeEditPopup: () => { },
  getAlternativeProductNames: () => { },
  postNewProductName: () => { },
  updateProductName: () => { },
  deleteProductName: () => { },
  popupValues: {},
  altCasNamesRows: [],
  loading: false
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<EditAltNamesCasProductsPopup {...setupProps} />)
}

/**
 * @test { EditAltNamesCasProductsPopup }
 */
describe('`EditAltNamesCasProductsPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(EditAltNamesCasProductsPopup, defaultProps)
  })

  test('renders EditAltNamesCasProductsPopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
