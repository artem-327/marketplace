import { injectIntl } from 'react-intl'
//Components
import securePage from '../../hocs/securePage'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from '../../components/Layout'
import MyNetwork from '../../modules/my-network'

const Networks = props => {
  const { auth } = props

  useEffect(() => {
    if (!(props.auth?.identity?.isCompanyAdmin || props.auth?.identity?.isOrderProcessing))
      props.displayErrorForbidden()
  }, [])

  return (
    <Layout title={props.intl.formatMessage({id: 'navigation.myNetwork', defaultMessage: 'My Network'})}>
      {!(auth?.identity?.isCompanyAdmin || auth?.identity?.isOrderProcessing)
        ? (null)
        : (<MyNetwork/>)
      }
    </Layout>
  )
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(Networks)))
