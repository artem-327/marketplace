import { useEffect, useState } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import TablesHandlers from './TablesHandlersContainer'
// Services
import { getSafe } from '../../../utils/functions'
import { DatagridProvider } from '../../datagrid'
import { renderContent } from './Operations.services'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'
// Styles
import { CustomGridColumn } from '../styles'

/**
 * Operations Component
 * @category Operations
 * @components
 */
const Operations = props => {
  const [gaSearch, setGaSearch] = useState('')

  useEffect(() => {
    const { isOpenPopup, closePopup } = props
    if (isOpenPopup) closePopup()
  }, [])

  const { currentTab, orderDetailData } = props

  if (
    !(
      getSafe(() => props.auth.identity.isAdmin, false) ||
      getSafe(() => props.auth.identity.isOperator, false) ||
      (getSafe(() => props.auth.identity.isOrderOperator, false) && currentTab === 'orders')
    )
  )
    return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

  const displayPage = !!orderDetailData

  /**
   * Operations Get Api Config
   * @category Operations
   * @services
   */
  const getApiConfig = () => {
    const { currentTab, companyProductUnmappedOnly } = props
    const datagridApiMap = {
      'shipping-quotes': {
        url: `/prodex/api/shipment/manual-quotes/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
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
        url: `/prodex/api/messaging-center/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
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
        url: `/prodex/api/tags/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
          return v && v.searchInput ? [{ operator: 'LIKE', path: 'Tag.name', values: [`%${v.searchInput}%`] }] : []
        }
      },
      'company-product-catalog': {
        url: `/prodex/api/company-products/admin/datagrid?type=${companyProductUnmappedOnly}&${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
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
        url: `/prodex/api/product-offers/admin/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
          return v && v.searchInput
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
        }
      },
      orders: {
        url: `/prodex/api/admin/orders/datagrid`,
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
        url: `/prodex/api/company-generic-product-requests/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
          return v && v.searchInput
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
    }
    return datagridApiMap[currentTab]
  }

  return (
    <DatagridProvider apiConfig={getApiConfig()} preserveFilters skipInitLoad>
      <Container fluid className='flex stretched'>
        {displayPage ? (
          renderContent(props)
        ) : (
          <>
            <Container fluid>
              <TablesHandlers currentTab={currentTab} />
            </Container>

            <Grid columns='equal' className='flex stretched' style={{ margin: '0', padding: '0' }}>
              <Grid.Row style={{ margin: '0', padding: '0 0 10px 0' }}>
                <CustomGridColumn className='flex stretched'>{renderContent(props)}</CustomGridColumn>
              </Grid.Row>
            </Grid>
          </>
        )}
      </Container>
    </DatagridProvider>
  )
}

Operations.propTypes = {
  isOpenPopup: PropTypes.bool,
  closePopup: PropTypes.func, 
  currentTab: PropTypes.string,
  orderDetailData: PropTypes.object,
  auth: PropTypes.object,
  companyProductUnmappedOnly: PropTypes.string
}

Operations.defaultValues = {
  isOpenPopup: false,
  closePopup: () => {}, 
  currentTab: '',
  orderDetailData: null,
  auth: {},
  companyProductUnmappedOnly: 'ALL'
}

export default Operations
