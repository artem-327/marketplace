import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../../test/testUtils'
//Components
import UploadCSV from './UploadCSV'

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
 * @test { UploadCSV }
 */
describe('`UploadCSV` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(UploadCSV, defaultProps)
  })
})
