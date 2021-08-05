import { injectIntl } from 'react-intl'
import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import WarehouseCredentials from '../../modules/warehouse-credentials/pending'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'

const Index = props => {
  const { auth } = props

  useEffect(() => {
    if (!props.auth?.identity?.isAdmin) props.displayErrorForbidden()
  }, [])

  return (
    <Layout title='Warehouse Credentials'>
      {!auth?.identity?.isAdmin
        ? (null)
        : (<WarehouseCredentials/>)
      }
    </Layout>
  )
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(Index)))