import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../test/testUtils'
//Components
import Dashboard from './Dashboard'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
    companiesCount: 0,
    broadcastedProductOffersValue: 0,
    companyProductsCount: 0,
    productOffersValue: 0,
    usersCount: 0,
    top10ProductGroups: [],
    top10CompaniesByUsers: [],
    top10CompaniesByCompanyProducts: [],
    top10CompaniesBySalesInLastYear: [],
    top10CompanyProductsByQuantitySales: [],
    top10CompanyProductsByValueSales: [],
    companySumOfPurchasesMonthly: [],
    companySumOfSalesMonthly: [],
    top10Buyers: [],
    totalSumOfSalesMonthly: [],
    isAdmin: false,
    takeover: false,
    totalCompanyPartners: 0
}

describe('`My Network` renders InviteModal', () => {
  
  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(Dashboard, defaultProps)
  })

})
