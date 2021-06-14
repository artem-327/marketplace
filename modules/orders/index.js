import OrdersContainer from './components/OrdersContainer'
import { DatagridProvider } from '../datagrid'

const OrdersModule = (props) => (
  <>
    <DatagridProvider
      skipInitLoad
      preserveFilters={true}
      apiConfig={{
        url: `/prodex/api/${
           props.currentTab === 'sales'
            ? 'sale'
            : 'purchase'
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
      }}>
      <OrdersContainer currentTab={props.currentTab}/>
    </DatagridProvider>
  </>
)

export { OrdersModule }
