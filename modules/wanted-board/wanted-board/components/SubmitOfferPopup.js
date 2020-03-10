import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader, Segment, GridRow, List, Table } from 'semantic-ui-react'
import { Form, Input, Radio } from 'formik-semantic-ui-fixed-validation'
import { getSafe } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { errorMessages } from '~/constants/yupValidation'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import moment from 'moment/moment'
import { getLocaleDateFormat } from '~/components/date-format'
import { FormattedUnit } from '~/components/formatted-messages'

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
  width: calc(100% - 64px);
  margin-left: 32px !important;
  margin-bottom: 30px !important;
  
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
    
    > .item:nth-child(n) { // nth-child to have stronger path
      flex-grow: 1;
      max-width: 150px;
      border-left: 1px solid rgba(34, 36, 38, 0.15) !important;
      padding: 13px 15px !important;
      
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
  }
`

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const initValues = {
  selectAll: false,

}

class SubmitOfferPopup extends React.Component {

  submitOffer = async (value, actions) => {
    const {
      closePopup,
      submitOffer
    } = this.props

    try {
      //await submitOffer(orderId, value) // waiting for BE endpoint
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
      popupValues2,
      isSending
    } = this.props

    const qtyPart = 'lb'  // ! ! will be returned by BE

    console.log('!!!!!!!!!! aaaaa popupValues', popupValues)

    return (
      <>
        <Modal open={true}>
          <Dimmer active={isSending} inverted>
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
                initialValues={{ ...initValues }}
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
                                      TBD !
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
                                        ? <FormattedUnit unit={qtyPart} separator='' value={popupValues.pkgAmount} />
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
                        <Table>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>
                                <Radio
                                  name='selectAll'
                                  value={false}
                                />
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
                            {popupValues2.map((element, index) => (
                              <Table.Row>
                                <Table.Cell>
                                  <Radio
                                    name='select'
                                    value={false}
                                  />
                                </Table.Cell>
                                <Table.Cell>
                                  <span className='product-name'>{element.product}</span>
                                </Table.Cell>
                                <Table.Cell>
                                  {element.fobPrice}
                                </Table.Cell>
                                <Table.Cell>
                                  {element.manufacturer}
                                </Table.Cell>
                                <Table.Cell>
                                  {element.condition}
                                </Table.Cell>
                                <Table.Cell>
                                  {element.packaging}
                                </Table.Cell>
                                <Table.Cell>
                                  {element.meas}
                                </Table.Cell>
                                <Table.Cell>
                                  {element.expirationDate}
                                </Table.Cell>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table>
                      </div>

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
                            <Button primary fluid type='submit'>
                              <FormattedMessage id='wantedBoard.submit' defaultMessage='Submit' tagName='span' >
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
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
    popupValues2: [ // ! ! test data
      {
        product: 'Acrylic Acid',
        fobPrice: 3.2145,
        manufacturer: 'Ecolab',
        condition: 'Conforming',
        packaging: 'Bulk',
        meas: 'lb',
        expirationDate: '34.13.2499'
      }
    ]
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(SubmitOfferPopup))
