import { injectIntl } from 'react-intl'
//Components
import securePage from '../../hocs/securePage'
import Layout from '../../components/Layout'
import MyNetwork from '../../modules/my-network'

const Networks = props => (
  <Layout title={props.intl.formatMessage({ id: 'navigation.myNetwork', defaultMessage: 'My Network' })}>
    <MyNetwork />
  </Layout>
)

export default securePage(injectIntl(Networks))
