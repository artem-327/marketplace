/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe } from "~/utils/functions"
import { currency } from '~/constants/index'

//Components
import {
  Container as SemanticContainer,
  Image,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider,
  Radio
} from 'semantic-ui-react'
import RowComponent from '../RowComponent/RowComponent'
import {
  DivSectionCollapsedWrapper,
  DivSectionCollapsedRow,
  DivSectionHeader,
  DivSectionName,
  DivSectionDescription,
  GridExpandedSection,
  GridRowExpandedSelectionRow,
  DivFlexRow,
  DivCentered,
  DivRightSection,
  DivSectionSmallHeader
} from '../Checkout.styles'
import moment from 'moment'

//Hooks
import { usePrevious } from "../../../../hooks"

//Services
//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'

const FreightSelection = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded  = usePrevious(props.isExpanded)
  const [edited, setEdited] = useState(false)

  const {
    isExpanded,
    sectionState,
    onChangeSubmitButton,
    setSectionSubmitValue,
    shippingQuotes,
    onValueChange,
    value
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {

  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {


    if (isExpanded && !prevIsExpanded) {
      onChangeSubmitButton({
        caption: (
          <FormattedMessage id='checkout.button.useThisFreight' defaultMessage='Use this Freight'>
            {text => text}
          </FormattedMessage>
        ),
        submitFunction: (val) => props.onSubmitClick(val)
      })
      setSectionSubmitValue(props.value)
    }
  }, [isExpanded])


  //console.log('!!!!!!!!!! render FreightSelection', cartItems)
  //console.log('!!!!!!!!!! render props', props)

  const freightOptions = getSafe(() => shippingQuotes.rates, [])

  console.log('!!!!!!!!!! aaaaa shippingQuotes', shippingQuotes)
  console.log('!!!!!!!!!! aaaaa freightOptions', freightOptions)

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.freightSelection' defaultMessage='4. Freight Selection'/>}
      onSubmitClick={() => {
        console.log('!!!!!!!!!! Freight Selection onSubmitClick')
        props.onSubmitClick()
      }}
      submitButtonCaption={
        <FormattedMessage id='checkout.button.useThisFreight' defaultMessage='Use this Freight'>
          {text => text}
        </FormattedMessage>
      }
      submitButtonDisabled={!value}
      content={
        (sectionState.accepted || isExpanded)
          ? (
            isExpanded
              ? (
                <GridExpandedSection>
                  {freightOptions.map((item, index) => (
                    <GridRowExpandedSelectionRow
                      key={index}
                      checked={value && (value.quoteId === item.quoteId)}
                      onClick={() => onValueChange(item)}
                      selection={'true'}
                    >
                      <GridColumn width={10}>
                        <DivFlexRow>
                          <DivCentered>
                            <Radio
                              checked={value && (value.quoteId === item.quoteId)}
                            />
                          </DivCentered>
                          <div>
                            <DivSectionHeader>
                              {item.carrierName}
                            </DivSectionHeader>
                            <DivSectionName>
                              <FormattedNumber
                                minimumFractionDigits={2}
                                maximumFractionDigits={2}
                                style='currency'
                                currency={currency}
                                value={item.estimatedPrice}
                              />
                            </DivSectionName>
                          </div>
                        </DivFlexRow>
                      </GridColumn>
                      <GridColumn width={3}>
                        <DivSectionSmallHeader>
                          <FormattedMessage id='checkout.freight.estDelivery' defaultMessage='Est. Delivery' />
                        </DivSectionSmallHeader>
                        <DivSectionName>
                          {moment(item.estimatedDeliveryDate).fromNow()}
                        </DivSectionName>
                      </GridColumn>
                      {false && (
                        <GridColumn width={2}>
                          <DivSectionSmallHeader>
                            <FormattedMessage id='checkout.freight.etd' defaultMessage='ETD' />
                          </DivSectionSmallHeader>
                          <DivSectionName>
                            {item.quoteId /* missing in endpoint */}
                          </DivSectionName>
                        </GridColumn>
                      )}
                      <GridColumn width={3}>
                        <DivSectionSmallHeader>
                          <FormattedMessage id='checkout.freight.service' defaultMessage='Service' />
                        </DivSectionSmallHeader>
                        <DivSectionName>
                          {item.serviceType}
                        </DivSectionName>
                      </GridColumn>
                    </GridRowExpandedSelectionRow>
                  ))}
                </GridExpandedSection>
              ) : (
                <DivSectionCollapsedWrapper>
                  <DivSectionCollapsedRow>
                    <DivSectionName>
                      {value ? value.carrierName : ''}
                    </DivSectionName>
                    <DivSectionDescription>
                      <FormattedNumber
                        minimumFractionDigits={2}
                        maximumFractionDigits={2}
                        style='currency'
                        currency={currency}
                        value={value ? value.estimatedPrice : 0}
                      />
                    </DivSectionDescription>
                    <DivSectionDescription>
                      {value ? moment(value.estimatedDeliveryDate).fromNow() : ''}
                    </DivSectionDescription>
                  </DivSectionCollapsedRow>
                </DivSectionCollapsedWrapper>
              )
          ) : null
      }
    />
  )
}

FreightSelection.propTypes = {
  //itemsCount: PropTypes.number
}

FreightSelection.defaultProps = {
  //itemsCount: 0
}

function mapStateToProps(store, props) {
  return {

  }
}

export default injectIntl(connect(mapStateToProps, {  })(FreightSelection))