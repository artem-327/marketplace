/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

import {
  Container as SemanticContainer,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider
} from 'semantic-ui-react'


import Logo from '~/assets/images/nav/logo-echo.svg'


//Components
import HeaderRow from './HeaderRow/HeaderRow'
import OrderSummary from './OrderSummary/OrderSummary'
import ReviewItems from './ReviewItems/ReviewItems'
import ShippingTerms from './ShippingTerms/ShippingTerms'
import Payment from './Payment/Payment'
import FreightSelection from './FreightSelection/FreightSelection'

//Hooks
import { usePrevious } from '../../../hooks'



//Services
import ErrorFocus from '../../../components/error-focus'
import { getSafe } from '../../../utils/functions'
import {
  getComponentParameters

} from './Checkout.services'

// Styles
import {
  DivCheckoutWrapper,
  ContainerCheckout,
  GridSections,



} from './Checkout.styles'


//Constants

const Checkout = props => {
  const [openSection, setOpenSection] = useState('review')
  const [sectionState, setSectionState] = useState({
    'review': { accepted: false },    // 1. Review Items
    'shipping': { accepted: false },  // 2. Shipping & Terms
    'payment': { accepted: false },   // 3. Payment
    'freight': { accepted: false }    // 4. Freight Selection
  })
  const [summaryButtonCaption, setSummaryButtonCaption] = useState('')
  const [summarySubmitFunction, setSummarySubmitFunction] = useState(() => {console.log('!!!!!!!!!! summarySubmitFunction')})

  const {
    cartItems,



  } = props

  // Similar to call componentDidMount:
  useEffect(() => {



    // If [] is empty then is similar as componentDidMount.
  }, [])


  /*
  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [])
  */




  console.log('!!!!!!!!!! Checkout props', props)

  //

  return (
    <DivCheckoutWrapper>
      <HeaderRow itemsCount={cartItems.length} />
      <ContainerCheckout>
        <Grid>
          <GridRow>
            <GridColumn width={12}>
              <GridSections>

                <ReviewItems
                  {...getComponentParameters(
                    'review',
                    openSection,
                    setOpenSection,
                    sectionState,
                    setSectionState,
                    setSummaryButtonCaption,
                    setSummarySubmitFunction
                  )}
                  cartItems={cartItems}

                />

                <ShippingTerms
                  {...getComponentParameters(
                    'shipping',
                    openSection,
                    setOpenSection,
                    sectionState,
                    setSectionState,
                    setSummaryButtonCaption,
                    setSummarySubmitFunction
                  )}


                />

                <Payment
                  {...getComponentParameters(
                    'payment',
                    openSection,
                    setOpenSection,
                    sectionState,
                    setSectionState,
                    setSummaryButtonCaption,
                    setSummarySubmitFunction
                  )}

                />

                <FreightSelection
                  {...getComponentParameters(
                    'freight',
                    openSection,
                    setOpenSection,
                    sectionState,
                    setSectionState,
                    setSummaryButtonCaption,
                    setSummarySubmitFunction
                  )}


                />

              </GridSections>
            </GridColumn>
            <GridColumn width={4}>
              <OrderSummary
                onButtonClick={() => summarySubmitFunction()}
                buttonText={summaryButtonCaption}
              />
            </GridColumn>
          </GridRow>
        </Grid>
      </ContainerCheckout>
    </DivCheckoutWrapper>
  )
}

Checkout.propTypes = {

}

Checkout.defaultProps = {

}

export default Checkout