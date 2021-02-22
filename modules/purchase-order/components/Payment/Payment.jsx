/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'

//Components
import { Grid, GridColumn, Radio } from 'semantic-ui-react'
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
  DivCentered
} from '../Checkout.styles'

//Hooks
import { usePrevious } from '../../../../hooks'

const Payment = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded = usePrevious(props.isExpanded)

  const {
    isExpanded,
    allAccepted,
    sectionState,
    onValueChange,
    setSummaryButtonCaption,
    payments,
    value,
    isThirdPartyConnectionException
  } = props

  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {
    if (isExpanded && !prevIsExpanded) {
      setSummaryButtonCaption(
        <FormattedMessage id='checkout.button.useThisPaymentMethod' defaultMessage='Use this Payment Method'>
          {text => text}
        </FormattedMessage>
      )
    }
  }, [isExpanded])

  const selected = payments.find(el => el.id === props.value)

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.payment' defaultMessage='3. Payment' />}
      onSubmitClick={() => props.onSubmitClick()}
      submitButtonCaption={
        allAccepted ? (
          <FormattedMessage id='checkout.button.placeOrder' defaultMessage='Place Order'>
            {text => text}
          </FormattedMessage>
        ) : (
          <FormattedMessage id='checkout.button.useThisPaymentMethod' defaultMessage='Use this Payment Method'>
            {text => text}
          </FormattedMessage>
        )
      }
      submitButtonDisabled={!value}
      content={
        sectionState.accepted || isExpanded ? (
          isExpanded ? (
            <GridExpandedSection overflow={'overflow: auto;'} maxHeight='605px'>
              {!getSafe(() => payments.length, false) && isThirdPartyConnectionException ? (
                <Grid.Row>
                  <Grid.Column textAlign='center'>
                    <FormattedMessage
                      id='payments.bankAccountCannnotRetrived'
                      defaultMessage='Bank accounts cannot be retrieved at the moment. Please try again later.'
                    />
                  </Grid.Column>
                </Grid.Row>
              ) : (
                payments.map((item, index) => (
                  <GridRowExpandedSelectionRow
                    key={index}
                    checked={value === item.id}
                    onClick={() => onValueChange(item.id)}
                    selection={'true'}>
                    <GridColumn width={6}>
                      <DivFlexRow>
                        <DivCentered>
                          <Radio checked={value === item.id} />
                        </DivCentered>
                        <div>
                          <DivSectionHeader>{item.name}</DivSectionHeader>
                          <DivSectionName>{item.institutionName}</DivSectionName>
                        </div>
                      </DivFlexRow>
                    </GridColumn>
                    {false && (
                      <GridColumn width={10}>
                        <DivSectionHeader>{item.institutionName}</DivSectionHeader>
                        <DivSectionName>TBD ...Address...</DivSectionName>
                      </GridColumn>
                    )}
                  </GridRowExpandedSelectionRow>
                ))
              )}
            </GridExpandedSection>
          ) : (
            <DivSectionCollapsedWrapper>
              <DivSectionCollapsedRow>
                <div>
                  <DivSectionName>{selected && selected.name}</DivSectionName>
                  <DivSectionDescription>{selected && selected.institutionName}</DivSectionDescription>
                </div>
              </DivSectionCollapsedRow>
            </DivSectionCollapsedWrapper>
          )
        ) : null
      }
    />
  )
}

Payment.propTypes = {}

Payment.defaultProps = {}

function mapStateToProps(store, props) {
  return {}
}

export default injectIntl(connect(mapStateToProps, {})(Payment))
