import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { Marketplace } from '~/modules/marketplace'

export default securePage(() => (
  <Layout title='Marketplace'>
    <Marketplace />
  </Layout>
))
