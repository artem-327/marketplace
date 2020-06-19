import OrdersContainer from './components/OrdersContainer'
import { DatagridProvider } from '~/modules/datagrid'
import Router from 'next/router'

const OrdersModule = () => (
  <>
    <DatagridProvider
      apiConfig={{
        url: `/prodex/api/${
          Router && Router.router && Router.router.query
            ? Router.query.type === 'sales'
              ? 'sale'
              : 'purchase'
            : 'sale'
        }-orders/datagrid/`,
        searchToFilter: v => {
          let filter = { or: [], and: [] }

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
                path: 'Order.orderDate',
                values: [`${v.dateFrom}`]
              }
            ])

          if (v && v.dateTo)
            filter.and = filter.and.concat([
              {
                operator: 'LESS_THAN_OR_EQUAL_TO',
                path: 'Order.orderDate',
                values: [`${v.dateTo}`]
              }
            ])
          return filter
        }
      }}>
      <OrdersContainer />
    </DatagridProvider>
  </>
)

export { OrdersModule }
