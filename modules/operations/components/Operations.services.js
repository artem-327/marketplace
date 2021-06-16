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

export const getApiConfig = (props) => {
    const { currentTab, companyProductUnmappedOnly } = props
    const datagridApiMap = {
      'shipping-quotes': {
        url: '/prodex/api/shipment/manual-quotes/datagrid',
        searchToFilter: v => {
          let filter = { or: [], and: [] }
          if (v && v.searchInput)
            filter.or = [
              {
                operator: 'LIKE',
                path: 'ShippingQuote.quoteId',
                values: [`%${v.searchInput}%`]
              }
            ]
          return filter
        }
      },
      'shipping-quote-requests': {
        url: '/prodex/api/messaging-center/datagrid',
        searchToFilter: v => {
          let filters = {
            or: [],
            and: [
              {
                operator: 'EQUALS',
                path: 'Message.category',
                values: ['Shipping_Quote_Request']
              }
            ]
          }
          if (v && v.searchInput) {
            filters.or.push({
              operator: 'LIKE',
              path: 'Message.text',
              values: [`%${v.searchInput}%`]
            })
          }
          return filters
        }
      },
      tags: {
        url: '/prodex/api/tags/datagrid',
        searchToFilter: v =>
          v && v.searchInput ? [{ operator: 'LIKE', path: 'Tag.name', values: [`%${v.searchInput}%`] }] : []
      },
      'company-product-catalog': {
        url: `/prodex/api/company-products/admin/datagrid?type=${companyProductUnmappedOnly}`,
        searchToFilter: v => {
          let filter = { or: [], and: [] }
          if (v && v.searchInput)
            filter.or = [
              {
                operator: 'LIKE',
                path: 'CompanyProduct.intProductName',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.intProductCode',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.companyGenericProduct.name',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'CompanyProduct.companyGenericProduct.code',
                values: [`%${v.searchInput}%`]
              }
            ]

          if (v && v.company) {
            const company = JSON.parse(v.company)
            if (company.id) {
              filter.and = [
                {
                  operator: 'EQUALS',
                  path: 'CompanyProduct.companyGenericProduct.company.id',
                  values: [`${company.id}`]
                }
              ]
            }
          }
          return filter
        }
      },
      'company-inventory': {
        url: '/prodex/api/product-offers/admin/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
                {
                  operator: 'LIKE',
                  path: 'ProductOffer.companyProduct.intProductName',
                  values: [`%${v.searchInput}%`]
                },
                {
                  operator: 'LIKE',
                  path: 'ProductOffer.companyProduct.intProductCode',
                  values: [`%${v.searchInput}%`]
                }
              ]
            : []
      },
      orders: {
        url: '/prodex/api/admin/orders/datagrid',
        searchToFilter: v => {
          let filter = { or: [], and: [] }

          if (v && v.company) {
            const d = JSON.parse(v.company)
            const value = d.cfDisplayName ? d.cfDisplayName : d.name ? d.name : ''
            filter.and = [
              {
                operator: 'LIKE',
                path: 'Order.sellerCompanyName',
                values: [`%${value}%`]
              }
            ]
          }

          if (v && v.status) {
            filter.and = filter.and.concat(v.status)
          }

          if (v && v.orderId)
            filter.and = filter.and.concat([
              {
                operator: 'LIKE',
                path: 'Order.id',
                values: [`%${v.orderId}%`]
              }
            ])

          if (v && v.dateFrom)
            filter.and = filter.and.concat([
              {
                operator: 'GREATER_THAN_OR_EQUAL_TO',
                path: 'Order.createdAt',
                values: [`${v.dateFrom}`]
              }
            ])

          if (v && v.dateTo)
            filter.and = filter.and.concat([
              {
                operator: 'LESS_THAN_OR_EQUAL_TO',
                path: 'Order.createdAt',
                values: [`${v.dateTo}`]
              }
            ])
          return filter
        }
      },
      'company-generic-products': {
        url: '/prodex/api/company-generic-product-requests/datagrid',
        searchToFilter: v =>
          v && v.searchInput
            ? [
                {
                  operator: 'LIKE',
                  path: 'CompanyGenericProductRequest.productName',
                  values: [`%${v.searchInput}%`]
                }
              ]
            : []
      }
    }
    return datagridApiMap[currentTab]
}
