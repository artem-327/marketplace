import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import ModalTdsList from './ModalTdsList'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  open: false,
  closeTdsModal: () => {},
  setValues: () => {},
  setFieldTouched: () => {},
  deleteTdsTemplate: () => {},
  tdsTemplatesLoading: false,
  tdsTemplates: []
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ModalTdsList {...setupProps} />)
}

/**
 * @test { ModalTdsList }
 */
describe('`ModalTdsList` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ModalTdsList, defaultProps)
  })

  test('renders ModalTdsList component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
