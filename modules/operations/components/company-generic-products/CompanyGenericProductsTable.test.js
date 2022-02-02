import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import CompanyGenericProductsTable from './CompanyGenericProductsTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  datagrid: {},
  intl: {},
  loading: false,
  filterValue: '',
  rows: [],
  markRequestAsProcessed: () => { },
  denyRequest: () => { },
  deleteRequest: () => { },
  downloadAttachmentPdf: () => { },
  downloadAttachment: () => { }
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<CompanyGenericProductsTable {...setupProps} />)
}

/**
 * @test { CompanyGenericProductsTable }
 */
describe('`CompanyGenericProductsTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(CompanyGenericProductsTable, defaultProps)
  })

  test('renders CompanyGenericProductsTable component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
