import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import CasProductsTable from './CasProductsTable'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  openPopup: () => { },
  openEditAltNamesCasPopup: () => { },
  closeConfirmPopup: () => { },
  getHazardClasses: () => { },
  getPackagingGroups: () => { },
  deleteCasProduct: () => { },
  editedId: null,
  rows: [],
  datagrid: [],
  intl: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<CasProductsTable {...setupProps} />)
}

/**
 * @test { CasProductsTable }
 */
describe('`CasProductsTable` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(CasProductsTable, defaultProps)
  })

  test('renders CasProductsTable component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
