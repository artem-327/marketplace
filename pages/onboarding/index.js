import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import { default as OnboardingContainer } from '~/modules/velloci-register/components/OnboardingContainer'
import { VellociRegister } from '~/modules/velloci-register'

export default securePage(() => (
  <Layout title='Account Setup' currentModule='registration'>
    <OnboardingContainer>
      <VellociRegister />
    </OnboardingContainer>
  </Layout>
))
