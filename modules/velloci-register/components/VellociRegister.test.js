import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../test/testUtils'
//Components
import VellociRegister from './VellociRegister'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  nextStep: () => { },
  prevStep: () => { },
  activeStep: 0,
  finalStep: 8,
  countBeneficialOwners: () => { },
  numberBeneficialOwners: 0,
  isLoadingSubmitButton: false,
  initialValues: {},
  openEmailPopup: () => { },
  emailPopup: {},
  businessTypes: {},
  getBusinessTypes: () => { },
  naicsCodes: {},
  getNaicsCodes: () => { },
  enumsBusinessMarkets: {},
  getEnumsBusinessMarkets: () => { },
  enumsBusinessTypes: {},
  getEnumsBusinessTypes: () => { },
  businessRoles: {},
  getBusinessRoles: () => { },
  entityDocuments: {},
  getEntityDocuments: () => { },
  politicallyExposedPersons: {},
  getPoliticallyExposedPersons: () => { },
  cleareActiveStep: () => { },
  postRegisterVelloci: () => { },
  getIdentity: () => { },
  loadSubmitButton: () => { },
  mainContainer: {},
  naicsCode: false,
  companyRequestBody: null,
  updateCompany: () => { }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<VellociRegister {...setupProps} />)
}

/**
 * @test { VellociRegister }
 */
describe('`VellociRegister` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(VellociRegister, defaultProps)
  })

  test('renders VellociRegister component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
