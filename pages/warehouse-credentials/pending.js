import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import WarehouseCredentials from '../../modules/warehouse-credentials/pending'

export default securePage(() => (
  <Layout title='Warehouse Credentials'>
    <WarehouseCredentials />
  </Layout>
))
