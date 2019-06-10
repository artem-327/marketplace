import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import {AddInventory} from '~/modules/inventory'
import {ToastProvider} from 'react-toast-notifications'

export default securePage(() => (
  <Layout title="Edit Inventory">
    <ToastProvider autoDismissTimeout={10 * 1000}>
      <AddInventory type='edit' />
    </ToastProvider>
  </Layout>
))