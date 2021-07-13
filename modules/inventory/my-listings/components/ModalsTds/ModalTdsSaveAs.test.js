import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import ModalTdsSaveAs from './ModalTdsSaveAs'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  open: false,
  closeTdsModal: () => {},
  saveTdsAsTemplate: () => {},
  tdsFields: []
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ModalTdsSaveAs {...setupProps} />)
}

/**
 * @test { ModalTdsSaveAs }
 */
describe('`ModalTdsSaveAs` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ModalTdsSaveAs, defaultProps)
  })

  test('renders ModalTdsSaveAs component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
