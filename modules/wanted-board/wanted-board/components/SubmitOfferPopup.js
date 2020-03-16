import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader, Segment, GridRow, List, Table } from 'semantic-ui-react'
import { Form, Input, Radio } from 'formik-semantic-ui-fixed-validation'
import { getSafe } from '~/utils/functions'
import {FormattedMessage, FormattedNumber, injectIntl} from 'react-intl'
import styled from 'styled-components'
import { errorMessages } from '~/constants/yupValidation'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import moment from 'moment/moment'
import { FormattedUnit } from '~/components/formatted-messages'
import { DateInput } from '~/components/custom-formik'
import { inputWrapper } from '../../components'
import { currency } from '~/constants/index'
import { FieldArray } from 'formik'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'

import confirm from '~/src/components/Confirmable/confirm'

import {
  FlexSidebar,
  //FlexTabs,
  FlexContent,
  //TopMargedColumn,
  //GraySegment,
  HighSegment,
  //DivIcon,
  //CloceIcon,
  //InputWrapper,
  //QuantityWrapper,
  BottomButtons,
  //SmallGrid,
  //InputLabeledWrapper,
  //CustomLabel,
  LabeledRow
} from '../../constants/layout'

const SubmitOfferHighSegment = styled(Segment)`
  width: 100%;
  margin-left: 0 !important;
  margin-bottom: 16px !important;
  
  > .grid {
    padding: 0;
    
    > .row {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
    
    > .column,
    > .row > .column {
      padding: 20px !important;
    }
  }
  
  h1.header {
    height: 17px;
    margin: 0 0 10px;
    padding: 0;
    font-size: 14px !important;
    font-weight: 700 !important;
    color: #20273a;
    line-height: 1.2142857;
    
    ~ a {
      display: inline-block;
      height: 32px;
      border: 1px solid #2599d5;
      border-radius: 3px;
      padding: 5px 14px;
      background-color: #ddf1fc;
      font-size: 13px !important;
      font-weight: 500;
      color: #2599d5;
      line-height: 1.5384615;
      
      svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
      }
    }
  }
`

const OrderList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: flex-end;
    width: calc(100% + 40px);
    margin: -20px;
    padding: 15px 0;
    
    > .item:nth-child(n) { // nth-child to have stronger path
      flex-grow: 1;
      width: 20%;
      max-width: 20%;
      border-left: 1px solid rgba(34, 36, 38, 0.15) !important;
      padding: 3px 15px !important;
      
      .header {
        margin: 0;
        padding: 0 0 3px;
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: 1.1666667;
      }
      
      .description {
        font-size: 14px;
        font-weight: 700;
        color: #20273a;
        line-height: 1.2142857;
        
        &.green {
          color: #84c225;
        }
        
        &.red {
          color: #f16844;
        }
      }
    }
    
    > .item:first-child {
      border-left: 0 none !important;
    }
  }
`

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const SubmitFormTable = styled(Table)`
  .table-responsive & tbody tr td {
    padding-top: 3px !important;
    padding-bottom: 3px !important;
    line-height: 18px;
  }
`

const RadioField = styled.div`
  .ui.radio {
    width: 18px;
    height: 18px;
    margin: 0 !important;
    
    input[type='radio'] {
      width: 18px;
      height: 18px;
    }
    
    label {
    
      &:before,
      &:after {
        right: auto;
        bottom: auto;
        box-sizing: border-box;
      }
    
      &:before {
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
      }
      
      &:after {
        top: 4px;
        left: 4px;
        transform: none;
        width: 10px;
        height: 10px;
        background: #2599d5 !important;
      }
    }
  }
`

const DateField = styled.div`
  height: 32px;
  margin: 0 -5px;
  
  * {
    max-height: 32px;
  }
`

class SubmitOfferPopup extends React.Component {
  state = {
    initValues: {
      select: '',
      tableRow: []
    }
  }

  getPrice = (quantity, pricingTiers) => {

    if (pricingTiers) {
      if (pricingTiers.length === 1) {
        return pricingTiers[0].pricePerUOM
      } else {
        let sortedTiers = pricingTiers.sort((a, b) => a.quantityFrom - b.quantityFrom)
        let index = 0
        for (let i = 0; i < sortedTiers.length; i++) {
          if (quantity >= sortedTiers[i].quantityFrom) {
            index = i
          } else break
        }
        return sortedTiers[index].pricePerUOM
      }
    }
    return 0
  }

  componentDidMount = async () => {
    const response = await this.props.getMatchingProductOffers(this.props.popupValues.id)
    const quantity = this.props.popupValues.quantity
    this.setState({
      initValues: {
        select: '',
        tableRow: response.value.map(d => {
          const pricingTiers = d.pricingTiers
          return ({
          id: d.id,
          pricePerUOM: this.getPrice(quantity, pricingTiers),
          expirationDate: d.lotExpirationDate
            ? moment(d.lotExpirationDate ).format(getLocaleDateFormat())
            : ''
          })
        })
      }
    })
  }

  submitOffer = async (values, actions) => {
    const {
      closePopup,
      submitOffer,
      popupValues,

    } = this.props

    const data = values.tableRow[values.select]

    let expiresAt = null
    if (data.expirationDate) {
      expiresAt = moment(getStringISODate(data.expirationDate)).format()
    }

    const body = {
      expiresAt,
      pricePerUOM: data.pricePerUOM,
      productOffer: data.id,
      purchaseRequest: popupValues.id
    }

    try {

      await submitOffer(body)
      closePopup()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
    const {
      intl: { formatMessage },
      popupValues,
      matchingProductOffers,
      matchingProductOffersLoading,
      isSending,
      currencySymbol
    } = this.props

    const qtyPart = popupValues.unit.nameAbbreviation

    return (
      <>
        <Modal open={true} size='large'>
          <Dimmer active={isSending || matchingProductOffersLoading} inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='wantedBoard.submitOfferHeader' defaultMessage='SUBMIT OFFER' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={false}
                initialValues={{ ...this.state.initValues }}
                onSubmit={(values, actions) => {
                    this.submitOffer(values, actions)
                  actions.setSubmitting(false)
                }}
                className='flex stretched'
                style={{ padding: '0' }}>
                {({ values, submitForm }) => {
                  return (
                    <>
                      <SubmitOfferHighSegment>
                        <Grid verticalAlign='middle'>
                          <GridRow>
                            <Grid.Column>
                              <OrderList divided relaxed horizontal size='large'>
                                <List.Item>
                                  <List.Content>
                                    <List.Header as='label'>
                                      <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging' />
                                    </List.Header>
                                    <List.Description as='span'>
                                      {popupValues.packagingTypes && popupValues.packagingTypes.length
                                        ? <ArrayToFirstItem values={popupValues.packagingTypes.map(d => d.name)} />
                                        : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
                                      }
                                    </List.Description>
                                  </List.Content>
                                </List.Item>

                                <List.Item>
                                  <List.Content>
                                    <List.Header as='label'>
                                      <FormattedMessage id='wantedBoard.form' defaultMessage='Form' />
                                    </List.Header>
                                    <List.Description as='span'>
                                      {popupValues.forms && popupValues.forms.length
                                        ? (<ArrayToFirstItem values={popupValues.forms.map(d => d.name)}/>)
                                        : (<FormattedMessage id='wantedBoard.any' defaultMessage='Any' />)
                                      }
                                    </List.Description>
                                  </List.Content>
                                </List.Item>

                                <List.Item>
                                  <List.Content>
                                    <List.Header as='label'>
                                      <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='FOB Price' />
                                    </List.Header>
                                    <List.Description as='span'>
                                      {
                                        popupValues.maximumPricePerUOM
                                          ? <FormattedNumber
                                              style='currency'
                                              currency={currency}
                                              value={popupValues.maximumPricePerUOM }
                                            />
                                          : 'N/A'
                                      }
                                    </List.Description>
                                  </List.Content>
                                </List.Item>

                                <List.Item>
                                  <List.Content>
                                    <List.Header as='label'>
                                      <FormattedMessage id='wantedBoard.quantity' defaultMessage='Quantity' />
                                    </List.Header>
                                    <List.Description as='span'>
                                      {qtyPart
                                        ? <FormattedUnit unit={qtyPart} separator='' value={popupValues.quantity} />
                                        : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
                                      }
                                    </List.Description>
                                  </List.Content>
                                </List.Item>

                                <List.Item>
                                  <List.Content>
                                    <List.Header as='label'>
                                      <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By' />
                                    </List.Header>
                                    <List.Description as='span'>
                                      {popupValues.neededAt
                                        ? moment(popupValues.neededAt).format(getLocaleDateFormat())
                                        : <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
                                      }
                                    </List.Description>
                                  </List.Content>
                                </List.Item>
                              </OrderList>
                            </Grid.Column>
                          </GridRow>
                        </Grid>
                      </SubmitOfferHighSegment>

                      <div className='table-responsive'>
                        <SubmitFormTable>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <FormattedMessage id='wantedBoard.product' defaultMessage='Product' />
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='FOB Price' />
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer' />
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <FormattedMessage id='wantedBoard.condition' defaultMessage='Condition' />
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging' />
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <FormattedMessage id='wantedBoard.meas' defaultMessage='Meas' />
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <FormattedMessage id='wantedBoard.expirationDate' defaultMessage='Expiration Date' />
                              </Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            <FieldArray
                              name={`tableRow`}
                              render={arrayHelpers => (
                              <>
                                {matchingProductOffers.map((element, index) => (
                                  <Table.Row>
                                    <Table.Cell>
                                      <RadioField>
                                        <Radio
                                          name='select'
                                          value={index}
                                        />
                                      </RadioField>
                                    </Table.Cell>
                                    <Table.Cell>
                                      <span className='product-name'>
                                        {element.companyProduct.echoProduct.name}
                                      </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                      {inputWrapper(
                                        `tableRow[${index}].pricePerUOM`,
                                        {
                                          min: 0,
                                          type: 'number',
                                          placeholder: '0.000'
                                        },
                                        null,
                                        currencySymbol
                                      )}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {element.companyProduct.echoProduct.manufacturer.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {
                                        element.conforming
                                          ? <FormattedMessage
                                            id='global.conforming'
                                            defaultMessage='Conforming'
                                          />
                                          : <FormattedMessage
                                            id='global.nonConforming'
                                            defaultMessage='Non Conforming'
                                          />
                                      }
                                    </Table.Cell>
                                    <Table.Cell>
                                      {element.companyProduct.packagingType.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {element.companyProduct.packagingUnit.nameAbbreviation}
                                    </Table.Cell>
                                    <Table.Cell>
                                      <DateField>
                                        <DateInput
                                          inputProps={{
                                            minDate: moment(),
                                            clearable: true,
                                            defaultValue: element.lotExpirationDate
                                              ? moment(element.lotExpirationDate ).format(getLocaleDateFormat())
                                              : ''
                                          }}
                                          name={`tableRow[${index}].expirationDate`}
                                        />
                                      </DateField>
                                    </Table.Cell>
                                  </Table.Row>
                                ))}
                              </>
                              )}
                            />
                          </Table.Body>
                        </SubmitFormTable>
                      </div>

                      <BottomButtons>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={10}></Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button basic fluid onClick={() => this.props.closePopup()}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' >
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button
                              primary
                              fluid
                              type='submit'
                              disabled={
                                values.select === '' || values.tableRow[values.select].pricePerUOM === ''
                              }
                            >
                              <FormattedMessage id='wantedBoard.submit' defaultMessage='Submit' tagName='span' >
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      </BottomButtons>
                    </>
                  )
                }}
              </Form>
            </Modal.Description>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.wantedBoard,
    popupValues: store.wantedBoard.popupValues.rawData,
    currencySymbol: '$',
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(SubmitOfferPopup))
