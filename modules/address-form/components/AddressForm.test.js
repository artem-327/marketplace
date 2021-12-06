import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../test/testUtils'
//Components
import AddressForm from './AddressForm'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  setFieldValue: () => { },
  onChange: () => { },
  prefix: null,

  datalistName: 'addresses',
  countries: [],
  displayHeader: true,
  streetAddress: {
    name: 'streetAddress'
  },
  city: {
    name: 'city'
  },
  country: {
    name: 'country'
  },
  zip: {
    name: 'zip'
  },
  province: {
    name: 'province'
  },
  countryPopup: {
    disabled: true,
    content: ''
  },

  initialZipCodes: [],
  values: null,
  additionalCountryInputProps: {},
  fixedCountries: [],
  handleChange: () => console.error('handleChange function not provided in AddressForm.jsx!'),
  required: false,
  searchEnabled: true,
  customHeader: '',
  backgroundColor: '#f8f9fb !important',
  disableCountry: false,
  disableProvince: false,
  countryHint: null,
  provinceHint: null
}

describe('`Addres Form` render component', () => {

  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(AddressForm, defaultProps)
  })

})
