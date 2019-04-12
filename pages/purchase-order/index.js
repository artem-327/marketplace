import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import PurchaseOrder from "~/src/pages/cart/PurchaseOrder"

export default securePage(() => (
  <Layout title="Cart">
    <PurchaseOrder />
  </Layout>
))