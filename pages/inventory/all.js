import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import AllInventory from "~/src/pages/inventory/allInventory"

export default securePage(() => (
  <Layout title="Add Inventory">
    <AllInventory />
  </Layout>
))