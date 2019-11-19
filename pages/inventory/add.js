import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import {AddInventory} from '~/modules/inventory'

export default securePage(() => (
  <Layout title='Add Inventory'>
    <AddInventory type='add' />
  </Layout>
))
