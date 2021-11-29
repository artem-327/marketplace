import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { checkProps } from '../../../test/testUtils'
//Components
import Products from './Products'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  currentTab: '',
  currentEdit2Form: null,
  currentAddForm: null,
  currentEditForm: null,
  isOpenImportPopup: false,
  closeAddPopup: () => { },
  auth: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Products {...setupProps} />)
}

/**
 * @test { Products }
 */
describe('`Products` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Products, defaultProps)
  })

  test('renders Products component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
