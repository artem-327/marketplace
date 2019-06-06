import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import ShoppingCart from "~/src/pages/cart/ShoppingCart"

export default securePage(() => (
  <Layout title="Cart">
    <ShoppingCart />
  </Layout>
))