import confirm from '~/components/Confirmable/confirm'
import Router from 'next/router'


export const deleteCart = async (id, props) => {
  let { cartItems, intl: { formatMessage } } = props

  if (cartItems.length === 1) {
    return confirm(
      formatMessage({
        id: 'order.deleteHeader',
        defaultMessage: 'Delete Order'
      }),
      formatMessage({
        id: 'order.deleteBody',
        defaultMessage:
          'You are about to delete last item of order. Doing so will redirect you to Shopping cart. Do you wish to continue?'
      })
    ).then(async () => {
      try {
        await props.deleteCart()
        Router.push('/cart')
      } catch (e) {
        console.error(e)
      }
      return (false)
    })
  } else {
    try {
      await props.deleteCartItem(id)
      return (true)
    } catch (e) {
      console.error(e)
    }
    return (false)
  }
}