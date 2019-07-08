import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import {AddInventory} from '~/modules/inventory'

export default securePage(() => (
  <Layout title="Edit Inventory">
      <AddInventory type='edit' />
  </Layout>
))