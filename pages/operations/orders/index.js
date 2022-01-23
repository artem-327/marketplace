import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { displayErrorForbidden } from '../../../modules/errors/actions'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import OperationsPage from '~/modules/operations'
import { injectIntl } from 'react-intl'

const Index = props => {
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (!(
      props.auth?.identity?.isAdmin ||
      props.auth?.identity?.isOperator ||
      props.auth?.identity?.isOrderOperator
    )) props.displayErrorForbidden()
    if (id) router.push(`/operations/orders/detail/${id}`)
  }, [])
  const {
    intl: { formatMessage },
    auth
  } = props
  return (
    <Layout title={formatMessage({ id: 'title.companies.orders', defaultMessage: 'Orders' })}>
      {!(auth?.identity?.isAdmin || auth?.identity?.isOperator || auth?.identity?.isOrderOperator)
        ? (null)
        : (<OperationsPage currentTab={'orders'} />)
      }
    </Layout>
  )
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(Index)))
