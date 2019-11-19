import OrdersContainer from './components/OrdersContainer'
import {DatagridProvider} from '~/modules/datagrid'
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
        }-orders/datagrid/`
      }}>
      <OrdersContainer />
    </DatagridProvider>
  </>
)

export {OrdersModule}
