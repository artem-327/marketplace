import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { filterTypes } from '../constants/filter'
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../test/testUtils'
//Components
import Filter from './Filter'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  isOpen: false,
  width: 'very wide',
  direction: 'right',
  animation: 'overlay',
  filters: [],
  autocompleteData: [],
  autocompleteWarehouse: [],
  savedFilters: [],
  savedFiltersLoading: false,
  layout: '',
  filterType: filterTypes.MARKETPLACE,
  savedUrl: '/prodex/api/product-offers/broadcasted/datagrid/saved-filters',
  searchUrl: text => `/prodex/api/company-products/broadcasted/search?pattern=${encodeURIComponent(text)}&onlyMapped=true`,
  searchWarehouseUrl: text => `/prodex/api/branches/warehouses/search?pattern=${encodeURIComponent(text)}`,
  onApply: filter => {},
  onClear: () => {},
  onClose: () => {}
}

describe('`Filter` render component', () => {

  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(Filter, defaultProps)
  })

})
