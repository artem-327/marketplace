import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ItemComponent from './ItemComponent'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  onClickDelete: () => { },
  onValueChange: () => { },
  value: {},
  index: 0,
  item: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ItemComponent {...setupProps} />)
}

/**
 * @test { ItemComponent }
 */
describe('`ItemComponent` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ItemComponent, defaultProps)
  })

  test('renders ItemComponent component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
