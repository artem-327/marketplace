import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
//Components
import BasicButton from './BasicButton'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * @test {BasicButton }
 */
describe('BasicButton: (props: any): JSX.Element', () => {
  test('renders BasicButton component without error', () => {
    const wrapper = shallow(<BasicButton />)
    expect(wrapper.exists()).toBe(true)
    console.log(wrapper.debug()) // see what is exactly rendered

    const button = wrapper.find("[data-test='components-basicbutton']")
    expect(button.length).toBe(1)
  })
})
