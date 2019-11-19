import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import {MyInventory} from '~/modules/inventory/my'

export default securePage(() => (
  <Layout title='My Inventory'>
    <MyInventory />
  </Layout>
))
