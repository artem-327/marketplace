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



} from './Checkout.styles'


//Constants

const Checkout = props => {
  const [openIndex, setOpenIndex] = useState(0)
  const [sectionState, setSectionState] = useState([
    { accepted: false },   // 1. Review Items
    { accepted: false },   // 2. Shipping & Terms
    { accepted: false },   // 3. Payment
    { accepted: false }    // 4. Freight Selection
  ])

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




  //console.log('!!!!!!!!!! ve funkci props', props)

  //

  return (
    <DivCheckoutWrapper>
      <HeaderRow itemsCount={cartItems.length} />
      <ContainerCheckout>
        <Grid>
          <GridRow>
            <GridColumn width={12}>
              <Grid>

                <ReviewItems
                  {...getComponentParameters(0, openIndex, setOpenIndex, sectionState, setSectionState)}

                  onButtonClick={() => console.log('!!!!!!!!!! ReviewItems 0 onButtonClick')}
                  onChangeButtonText={() => console.log('!!!!!!!!!! onChangeButtonText 0')}
                />

                <ReviewItems
                  {...getComponentParameters(1, openIndex, setOpenIndex, sectionState, setSectionState)}

                  onButtonClick={() => console.log('!!!!!!!!!! ReviewItems 1 onButtonClick')}
                  onChangeButtonText={() => console.log('!!!!!!!!!! onChangeButtonText 1')}
                />

                <ReviewItems
                  {...getComponentParameters(2, openIndex, setOpenIndex, sectionState, setSectionState)}

                  onButtonClick={() => console.log('!!!!!!!!!! ReviewItems 2 onButtonClick')}
                  onChangeButtonText={() => console.log('!!!!!!!!!! onChangeButtonText 2')}
                />

                <ReviewItems
                  {...getComponentParameters(3, openIndex, setOpenIndex, sectionState, setSectionState)}

                  onButtonClick={() => console.log('!!!!!!!!!! ReviewItems 0 onButtonClick')}
                  onChangeButtonText={() => console.log('!!!!!!!!!! onChangeButtonText 3')}
                />



              </Grid>
            </GridColumn>
            <GridColumn width={4}>
              <OrderSummary
                onButtonClick={() => console.log('!!!!!!!!!! OrderSummary onButtonClick')}

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