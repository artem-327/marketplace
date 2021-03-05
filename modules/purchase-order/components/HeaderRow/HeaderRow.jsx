/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import Router from 'next/router'
import { GridColumn, GridRow } from 'semantic-ui-react'
import Logo from '~/assets/images/nav/logo-bluepallet.png'

//Services
import { getSafe } from '../../../../utils/functions'
import { loadCompanyLogo, getCompanyLogo } from './HeaderRow.services'

// Styles
import {
  DivHeaderRow,
  DivHeaderRowText,
  DivImageWrapper,
  LogoImage,
  PopupHeader,
  PopupGrid,
  ButtonHeader
} from './HeaderRow.styles'
/**
 * @category Purchase Order - Checkout
 * @component
 */
const HeaderRow = props => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const { itemsCount, hasLogo, useCompanyLogo } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    if (hasLogo && getSafe(() => props.useCompanyLogo.value === 'TRUE', false)) loadCompanyLogo(props)
  }, []) // If [] is empty then is similar as componentDidMount.

  return (
    <DivHeaderRow>
      <PopupHeader
        wide
        trigger={
          <DivImageWrapper>
            <LogoImage
              src={hasLogo && getSafe(() => useCompanyLogo.value === 'TRUE', false) ? getCompanyLogo(props) : Logo}
            />
          </DivImageWrapper>
        }
        on='click'
        open={isPopupOpen}
        onOpen={() => setIsPopupOpen(true)}
        onClose={() => setIsPopupOpen(false)}
        content={
          <div>
            <PopupGrid>
              <GridRow>
                <GridColumn>
                  <FormattedMessage
                    id='checkout.header.returnToCart'
                    defaultMessage='Are you sure you want to return to your Shopping Cart?'
                  />
                </GridColumn>
              </GridRow>

              <GridRow>
                <GridColumn width={8}>
                  <ButtonHeader fluid onClick={() => setIsPopupOpen(false)}>
                    <FormattedMessage id='checkout.header.button.stayInCheckout' defaultMessage='Stay in Checkout'>
                      {text => text}
                    </FormattedMessage>
                  </ButtonHeader>
                </GridColumn>
                <GridColumn width={8}>
                  <ButtonHeader
                    className='bordered'
                    fluid
                    onClick={() => {
                      setIsPopupOpen(false)
                      Router.push('/cart')
                    }}>
                    <FormattedMessage id='checkout.header.button.returnToCart' defaultMessage='Return to Cart'>
                      {text => text}
                    </FormattedMessage>
                  </ButtonHeader>
                </GridColumn>
              </GridRow>
            </PopupGrid>
          </div>
        }
      />
      <DivHeaderRowText>
        <FormattedMessage
          id='checkout.header.items'
          defaultMessage={`Checkout (${itemsCount} items)`}
          values={{ value: itemsCount }}
        />
      </DivHeaderRowText>
    </DivHeaderRow>
  )
}

HeaderRow.propTypes = {
  itemsCount: PropTypes.number,
  hasLogo: PropTypes.bool,
  companyLogo: PropTypes.object,
  useCompanyLogo: PropTypes.object
}

HeaderRow.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store) {
  return {
    hasLogo: getSafe(() => store.auth.identity.company.hasLogo, false),
    companyLogo: getSafe(() => store.businessTypes.companyLogo, null),
    useCompanyLogo: getSafe(() => store.auth.identity.settings.find(set => set.key === 'COMPANY_USE_OWN_LOGO'), false)
  }
}

export default connect(mapStateToProps, { getCompanyLogo })(HeaderRow)
