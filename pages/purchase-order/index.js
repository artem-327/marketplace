import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { PurchaseOrder } from '~/modules/purchase-order'

export default securePage(() => (
  <Layout title='Cart'>
    <PurchaseOrder />
  </Layout>
))
