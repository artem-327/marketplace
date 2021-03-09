import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import WarehouseCredentials from '~/modules/warehouse-credentials'

export default securePage(() => (
  <Layout title='Warehouse Credentials'>
    <WarehouseCredentials />
  </Layout>
))