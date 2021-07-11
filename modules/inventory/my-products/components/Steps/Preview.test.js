import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import Preview from './Preview'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  mappedHeader: [],
  isSaveMapCSV: false,
  productOffer: false,
  companyGenericProduct: false,
  companies: false,
  mapName: '',
  dataHeaderCSV: () => {},
  putCSVMapCompanyGenericProduct: () => {},
  putCSVMapProductOffer: () => {},
  putCSVMapCompanies: () => {},
  postCSVMapCompanyGenericProduct: () => {},
  postCSVMapProductOffer: () => {},
  postCSVMapCompanies: () => {},
  selectedSavedMap: {},
  CSV: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Preview {...setupProps} />)
}

/**
 * @test { Preview }
 */
describe('`Preview` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Preview, defaultProps)
  })

  test('renders Preview component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
