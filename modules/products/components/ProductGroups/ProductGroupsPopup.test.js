import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import ProductGroupsPopup from './ProductGroupsPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  closePopup: () => { },
  popupValues: null,
  rowId: null,
  putProductGroups: () => { },
  postProductGroups: () => { },
  datagrid: {},
  searchedTags: [],
  searchedTagsLoading: false,
  searchedMarketSegmentsLoading: false,
  intl: {}
}

/**
 * Factory function to creaste a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, props }
  return shallow(<ProductGroupsPopup {...setupProps} />)
}

/**
 * @test { ProductGroupsPopup }
 */
describe('`ProductGroupsPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ProductGroupsPopup, defaultProps)
  })

  test('renders ProductGroupsPopup component to be there', () => {
    const wrapper = setup()
    expect(wrapper.exists()).toBe(true)
  })
})
