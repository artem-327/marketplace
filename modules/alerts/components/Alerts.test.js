import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import Alerts from './Alerts'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */

/**
 * @test { Alerts }
 */
describe('`Alerts` render component', () => {
  test('does not throw warning with expected props', () => {
    // checkProps(Alerts, defaultProps)
  })

  // test('renders Alerts component to be there', () => {
  //   const wrapper = setup()
  //   expect(wrapper.exists()).toBe(true)
  // })
})