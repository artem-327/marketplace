import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import Map from './MapContainer'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  intl: {},
  CSV: {},
  selectedSavedMap: {},
  productOffer: false,
  companyGenericProduct: false,
  companies: false,
  csvWithoutHeader: false,
  mappedHeader: [],
  maps: [],
  toastManager: null,
  mapName: '',
  changeHeadersCSV: () => {},
  selectSavedMap: () => {},
  handleChangeMapCSVName: () => {},
  deleteCSVMapCompanyGenericProduct: () => {},
  deleteCSVMapProductOffer: () => {},
  deleteCSVMapCompanies: () => {},
  putCSVMapCompanyGenericProduct: () => {},
  postCSVMapCompanyGenericProduct: () => {},
  getCSVMapCompanyGenericProduct: () => {},
  putCSVMapProductOffer: () => {},
  postCSVMapProductOffer: () => {},
  getCSVMapProductOffer: () => {},
  putCSVMapCompanies: () => {},
  postCSVMapCompanies: () => {},
  getCSVMapCompanies: () => {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<Map {...setupProps} />)
}

/**
 * @test { Map }
 */
describe('`Map` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(Map, defaultProps)
  })

  test('renders Map component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
