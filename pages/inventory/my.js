import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import MyInventory from "./my/index"

export default securePage(() => (
  <Layout title="My Inventory">
    <MyInventory />
  </Layout>
))