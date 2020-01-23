import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import ShoppingCart from '~/src/pages/cart/ShoppingCart'
import { FormattedMessage } from "react-intl"

export default securePage(() => (
  <Layout title={<FormattedMessage id='cart.shoppingCart' defaultMessage='Shopping Cart' />}>
    <ShoppingCart />
  </Layout>
))
