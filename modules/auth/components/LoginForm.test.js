import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../test/testUtils'
//Components
import LoginForm from './LoginForm'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  isLoading: false,
  message: '',
  version: '',
  intl: {},
  router: null,
  identity: {},
  loginInit: () => {},
  getVersion: () => {},
  login: () => {},
  resetPasswordRequest: () => {}
}

describe('`Login Form` render component', () => {

  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(LoginForm, defaultProps)
  })

})
