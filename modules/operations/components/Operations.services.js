// Components
import ShippingQuotesTable from './shipping-quotes/ShippingQuotesTableContainer'
import ShippingQuotesPopup from './shipping-quotes/ShippingQuotesPopupContainer'
import ShippingQuoteRequestsTable from './shipping-quote-requests/ShippingQuoteRequestsTableContainer'
import TagsTable from './tags/TagsTableContainer'
import TagsPopup from './tags/TagsPopupContainer'
import CompanyProductTable from './company-product-catalog/CompanyProductTableContainer'
import CompanyInventoryTable from './company-inventory/CompanyInventoryTableContainer'
import Orders from './orders/OrdersContainer'
import OrderDetail from './orders/DetailContainer'
import CompanyGenericProductsTable from './company-generic-products/CompanyGenericProductsTableContainer'

/**
 * Operations Render Content
 * @category Operations
 * @services
 */
export const renderContent = (props) => {
    const { currentTab, isOpenPopup, orderDetailData } = props

    const tables = {
      'shipping-quotes': <ShippingQuotesTable />,
      'shipping-quote-requests': <ShippingQuoteRequestsTable />,
      tags: <TagsTable />,
      'company-product-catalog': <CompanyProductTable />,
      'company-inventory': <CompanyInventoryTable />,
      orders: orderDetailData ? <OrderDetail /> : <Orders />,
      'company-generic-products': <CompanyGenericProductsTable />
    }

    const popupForm = {
      'shipping-quotes': <ShippingQuotesPopup />,
      tags: <TagsPopup />
    }

    return (
      <>
        {isOpenPopup && popupForm[currentTab]}
        {tables[currentTab] || <p>This page is still under construction</p>}
      </>
    )
}
