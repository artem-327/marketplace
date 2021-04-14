import { useState } from 'react'
import { Modal, Dimmer, Loader, List, Grid, Image } from 'semantic-ui-react'
import { func, bool } from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
// Styles
import { ModalCustom, HeaderWrapper, ContentHeaderTitle, IconsWrapper, IconWrapper, IconBox, ContentMainTitle, ContentSubTitle, AnswerBlock, ListBlock, FooterInfo } from './BluePalletModal.styles'
// Icons
import Logo from '~/assets/images/nav/logo-bluepallet.png'
import BluePalletLogo from '~/assets/images/blue-pallet/trade-pass-logo-only.svg'
import BluePalletCircle from '~/assets/images/blue-pallet/blue-pallet-circle.svg'
import IconSafe from '~/assets/images/blue-pallet/shield-fill-check.svg'
import IconSimple from '~/assets/images/blue-pallet/target.svg'
import IconSecure from '~/assets/images/blue-pallet/shield-lock-fill.svg'
/**
 * Modal allow connect between companies.
 * @category My Network
 * @component
 */
const BluePalletModal = props => {
  const [value, setValue] = useState('')
  const {
    open,
    onClose
  } = props

  return (
    <ModalCustom
      size='large'
      open={open}
      onClose={() => {
        onClose()
        setValue('')
      }}
      closeIcon={true}>
      <Modal.Header>
        <HeaderWrapper>
          <ContentHeaderTitle as='h2'>
            <Image src={Logo} />
            <FormattedMessage id='bluePallet.direct' defaultMessage='Direct' />
          </ContentHeaderTitle>
          <IconsWrapper>
            <IconWrapper>
              <IconBox>
                <Image src={IconSafe} />
              </IconBox>
              <FormattedMessage id='bluePallet.safe' defaultMessage='Safe' />
            </IconWrapper>
            <IconWrapper>
              <IconBox>
                <Image src={IconSimple} />
              </IconBox>
              <FormattedMessage id='bluePallet.simple' defaultMessage='Simple' />
            </IconWrapper>
            <IconWrapper>
              <IconBox>
                <Image src={IconSecure} />
              </IconBox>
              <FormattedMessage id='bluePallet.secure' defaultMessage='Secure' />
            </IconWrapper>
          </IconsWrapper>
        </HeaderWrapper>
      </Modal.Header>
      <Modal.Content>
        <ContentMainTitle as='h3'>
          <FormattedMessage id='bluePallet.whatIs' defaultMessage='What is Blue Pallet Direct?' />
        </ContentMainTitle>
        <AnswerBlock>
          <FormattedMessage
            id='bluePallet.whatIs.answer'
            defaultMessage='Blue Pallet Direct anonymously displays selected inventory on our direct feed for all qualified members on the Blue Pallet platform to view and purchase. Selling and buying inventory through Blue Pallet Direct comes with industry leading perks. Built in Supply side protections and buyer benefits ensures that Blue Pallet direct transactions are safe, secure, simple, and reliable.'
          />
        </AnswerBlock>
        <Grid>
          <Grid.Column width={8}>
            <ContentSubTitle as='h4'>
              <FormattedMessage id='bluePallet.supplySide' defaultMessage='Supply Side Protections' />
            </ContentSubTitle>
            <ListBlock>
              <List.Item>
                <Image src={BluePalletLogo} />
                <FormattedMessage id='bluePallet.verifiedBuyers' defaultMessage='Trade Pass Verified Buyers' />
              </List.Item>
              <List.Item>
                <Image src={BluePalletCircle} />
                <FormattedMessage id='bluePallet.netPayments' defaultMessage='NET10 Payments' />
              </List.Item>
              <List.Item>
                <Image src={BluePalletCircle} />
                <FormattedMessage id='bluePallet.anonymouslySell' defaultMessage='Anonymously Sell to our entire network of buyers' />
              </List.Item>
              <List.Item>
                <Image src={BluePalletCircle} />
                <FormattedMessage id='bluePallet.insuredAR' defaultMessage='100% Insured AR' />
              </List.Item>
            </ListBlock>
          </Grid.Column>
          <Grid.Column width={8}>
            <ContentSubTitle as='h4'>
              <FormattedMessage id='bluePallet.buyerBenefits' defaultMessage='Buyer Benefits' />
            </ContentSubTitle>
            <ListBlock>
              <List.Item>
                <Image src={BluePalletLogo} />
                <FormattedMessage id='bluePallet.verifiedSellers' defaultMessage='Trade Pass Verified Sellers' />
              </List.Item>
              <List.Item>
                <Image src={BluePalletCircle} />
                <FormattedMessage id='bluePallet.anonymousBuying' defaultMessage='Anonymous Buying' />
              </List.Item>
              <List.Item>
                <Image src={BluePalletCircle} />
                <FormattedMessage id='bluePallet.freeReturns' defaultMessage='Free Returns*' />
              </List.Item>
              <List.Item>
                <Image src={BluePalletCircle} />
                <FormattedMessage id='bluePallet.accessNetwork' defaultMessage='Access our entire network of sellers' />
              </List.Item>
            </ListBlock>
          </Grid.Column>
        </Grid>
        <FooterInfo>
          <FormattedMessage id='bluePallet.footerInfo' defaultMessage='Blue Pallet Direct only displays inventory of Blue Pallet Members. Blue Pallet Direct does not manufacture, distribute, or possess any products listed on the Blue Pallet Direct Marketplace. Blue Pallet Direct will facilitate transactions and returns as outlined SimpleTrade, Inc.’s Terms of use.' />
        </FooterInfo>
      </Modal.Content>
    </ModalCustom>
  )
}

BluePalletModal.propTypes = {
  open: bool,
  onClose: func
}

BluePalletModal.defaultProps = {
  open: true,
  onClose: () => {}
}

export default injectIntl(BluePalletModal)
