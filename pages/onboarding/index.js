import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import { VellociRegister } from '~/modules/velloci-register'

export default securePage(() => (
  <Layout title='Account Setup'>
    <VellociRegister />
  </Layout>
))
