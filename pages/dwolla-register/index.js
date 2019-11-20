import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import { DwollaRegister } from '~/modules/dwolla-register'

export default securePage(() => (
  <Layout title='Inventory'>
    <DwollaRegister />
  </Layout>
))
