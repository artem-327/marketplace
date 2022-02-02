import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import RowComponent from './RowComponent'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  bottomLeftContent: null,
  submitButtonDisabled: false,
  itemsCount: 0
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<RowComponent {...setupProps} />)
}

/**
 * @test { RowComponent }
 */
describe('`RowComponent` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(RowComponent, defaultProps)
  })

  test('renders RowComponent component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
