import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'

export default securePage(() => (
  <Layout title="Inventory">
    <h2>Inventory secured</h2>
  </Layout>
))