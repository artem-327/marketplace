import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
// import { filterTypes } from '../constants/filter'
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../test/testUtils'
//Components
import PhoneNumber from './PhoneNumber'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  setFieldValue: () => console.warn('setFieldValue not supplied in PhoneNumber!'),
  setFieldTouched: () => console.warn('setFieldTouched not supplied in PhoneNumber!'),
  setErrors: () => console.warn('setErrors not supplied in PhoneNumber!'),
  name: '',
  values: null,
  search: true,
  label: {},
  errors: {},
  isSubmitting: false,
  touched: {},
  disabled: false,
  clearable: false,
  placeholder: null,
  background: null,
  width: null,
  maxPhoneNumberLength: 10,
}

describe('`PhoneNumber` render component', () => {

  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(PhoneNumber, defaultProps)
  })

})
