import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../test/testUtils'
//Components
import BasicButton from './BasicButton'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  noBorder: false,
  children: null,
  textcolor: '#20273a !important',
  floatright: null,
  background: '#ffffff !important',
  margin: null,
  type: 'button',
  disabled: false,
  onClick: () => {}
}
/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<BasicButton {...setupProps} />)
}

/**
 * @test {BasicButton }
 */
describe('BasicButton: (props: any): JSX.Element', () => {
  test('does not throw warning with expected props', () => {
    checkProps(BasicButton, defaultProps)
  })

  test('renders BasicButton component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })

  test('renders BasicButton component without error', () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, 'component-basicbutton')
    expect(button.length).toBe(1)
  })

  test('clicking on button', () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, 'component-basicbutton')
    button.simulate('click')
  })
})
