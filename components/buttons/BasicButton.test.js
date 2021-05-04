import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
//Components
import BasicButton from './BasicButton'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<BasicButton />)

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

/**
 * @test {BasicButton }
 */
describe('BasicButton: (props: any): JSX.Element', () => {
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
