import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { PurchaseOrder } from '~/modules/purchase-order'
import { FormattedMessage } from 'react-intl'

export default securePage(() => (
  <Layout title={<FormattedMessage id='cart.checkout' defaultMessage='Checkout' />}>
    <PurchaseOrder />
  </Layout>
))
