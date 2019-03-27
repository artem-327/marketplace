import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import MyInventory from "~/src/pages/inventory/myInventory"

export default securePage(() => (
  <Layout title="My Inventory">
    <MyInventory />
  </Layout>
))