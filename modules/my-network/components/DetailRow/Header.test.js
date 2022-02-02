import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import Header from './Header'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  logo: null,
  transactions: 0,
  averageValue: 0,
  id: null,
  buttonsProps: [
    {
      textId: '',
      color: '',
      background: '',
      action: ''
    }
  ],
  buttonActionsDetailRow: () => { },
  openGlobalAddForm: null,
  address: '',
  connectionCriteria: null,
  enableButtons: true
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Header {...setupProps} />)
}

/**
 * @test {Header }
 */
describe('`My network Header` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Header, defaultProps)
  })

  test('renders My network Header component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
