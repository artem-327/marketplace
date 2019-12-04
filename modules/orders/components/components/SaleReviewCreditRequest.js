import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Modal, ModalContent, Accordion, Button, Icon, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'

import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'
import confirm from '~/src/components/Confirmable/confirm'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const InputCounterValue = styled(Form.Input)`
  width: fit-content;
`

const AccordionTitle = styled(Accordion.Title)`
  font-size: 1.12rem;
  line-height: 1.5;

  i.chevron {
    margin-right: 1rem;
    vertical-align: center;
  }
`

const initValues = {}
//TODO nahradit realnymy hodnotami z props
const discount = '500.00'
const reasons = [
  {
    reasonText:
      'Packaging was demaged on 3 out of 15 bags. Some content leaked, and clean up was required. Requesting $500.00 to cover clean up.',
    id: 1,
    attachments: [
      { name: 'Foto1', id: 1 },
      { name: 'Foto2', id: 2 }
    ]
  },
  {
    reasonText: 'It is very nice from you but I want to $500.00 back. Thank you.',
    id: 2,
    attachments: [
      { name: 'Foto1', id: 1 },
      { name: 'Foto2', id: 2 }
    ]
  },
  {
    reasonText: 'Ok I agree with you and you can give me only $490.00. Thank you',
    id: 3,
    attachments: [
      { name: 'Foto1', id: 1 },
      { name: 'Foto2', id: 2 }
    ]
  }
]
class SaleReturnShipping extends React.Component {
  state = {
    counterValue: null,
    notes: '',
    counter: false,
    activeIndexes: []
  }

  componentWillMount() {
    //TODO
    //const { reasons } = this.props
    if (!reasons) return
    let arrayIndexes = reasons.map((r, i) => {
      return reasons.length - 1 === i ? true : false
    })
    this.setState({ activeIndexes: arrayIndexes })
  }

  submitHandler = async (values, actions) => {
    const { closePopup, orderId, toastManager, rejectPurchaseOrder } = this.props
    const { reason, reasonText, attachments, credit } = values
    try {
      // TODO až bude hotové https://pm.artio.net/issues/32104 můžu předělat podle endpointu
      await rejectPurchaseOrder(orderId, reason, reasonText, attachments)
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='order.success' defaultMessage='Success' />,
          <FormattedMessage id='order.rejected' defaultMessage='Order was successfully rejected' />
        ),
        {
          appearance: 'success'
        }
      )
      closePopup()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  handleChange = (e, value, name, setFieldValue) => {
    e.preventDefault()
    this.setState({ [name]: value })
    setFieldValue(name, value)
  }

  rejectRequestCredit = async e => {
    e.preventDefault()
    //TODO
  }

  acceptRequestCredit = async e => {
    e.preventDefault()
    //TODO
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexes } = this.state

    activeIndexes[index] = activeIndexes[index] ? false : true

    this.setState({ activeIndexes })
  }

  render() {
    const {
      intl: { formatMessage },
      orderId,
      isSending
    } = this.props

    const { activeIndexes } = this.state

    return (
      <>
        <Modal closeIcon onClose={() => this.props.closePopup()} open={true} size='small'>
          <Dimmer active={isSending} inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='order.saleReviewCreditRequestHeader' defaultMessage='REVIEW CREDIT REQUEST' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={false}
                initialValues={{ ...initValues }}
                onSubmit={this.submitHandler}
                className='flex stretched'
                style={{ padding: '0' }}>
                {({ values, submitForm, setFieldValue, resetForm }) => {
                  return (
                    <>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <strong style={{ fontSize: '16px' }}>
                              <FormattedMessage
                                id='order.sellerRequesting'
                                defaultMessage={'Seller is requesting a discount of $'}
                              />
                              {`${discount}. `}
                              <FormattedMessage
                                id='order.viewRequesting'
                                defaultMessage={'Please view reasoning and images below:'}
                              />
                            </strong>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <strong style={{ textDecoration: 'underline', fontSize: '16px' }}>
                              <FormattedMessage id='order.reasons' defaultMessage={'Reasons: '} />
                            </strong>
                            {reasons && reasons.length && (
                              <Accordion fluid>
                                {reasons.map((reason, i) => {
                                  return (
                                    <>
                                      <AccordionTitle active={activeIndexes[i]} index={i} onClick={this.handleClick}>
                                        <Icon
                                          name={'chevron ' + (activeIndexes[i] ? 'down' : 'right')}
                                          size='small'
                                          color={activeIndexes[i] ? 'blue' : 'black'}
                                        />
                                        <span style={{ textDecoration: 'underline' }}>
                                          {`${reason.reasonText.substring(0, 20)}...`}
                                        </span>
                                      </AccordionTitle>
                                      <Accordion.Content active={activeIndexes[i]}>
                                        <Grid.Row style={{ paddingLeft: '26px' }}>
                                          <Grid.Column width={16}>{reason.reasonText}</Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row style={{ paddingLeft: '26px' }}>
                                          <Grid.Column width={16}>
                                            {reason.attachments &&
                                              reason.attachments.length &&
                                              reason.attachments.map(attachment => {
                                                return (
                                                  <Button
                                                    as='a'
                                                    onClick={() =>
                                                      this.downloadAttachment(attachment.name, attachment.id)
                                                    }>
                                                    <Icon name='download' />
                                                    {attachment.name}
                                                  </Button>
                                                )
                                              })}
                                          </Grid.Column>
                                        </Grid.Row>
                                      </Accordion.Content>
                                    </>
                                  )
                                })}
                              </Accordion>
                            )}
                          </Grid.Column>
                        </Grid.Row>
                        <br /> <br />
                        {!this.state.counter ? (
                          <Grid.Row>
                            <Grid.Column width={7}></Grid.Column>
                            <Grid.Column floated='right' width={3}>
                              <Button
                                type='button'
                                basic
                                fluid
                                onClick={() => {
                                  this.setState({ counter: true })
                                }}>
                                <FormattedMessage id='global.counter' defaultMessage='Counter' tagName='span'>
                                  {text => text}
                                </FormattedMessage>
                              </Button>
                            </Grid.Column>
                            <Grid.Column floated='right' width={3}>
                              <Button color='red' type='button' fluid onClick={this.rejectRequestCredit}>
                                <FormattedMessage id='global.reject' defaultMessage='Reject' tagName='span'>
                                  {text => text}
                                </FormattedMessage>
                              </Button>
                            </Grid.Column>
                            <Grid.Column floated='right' width={3}>
                              <Button color='blue' fluid type='button' onClick={this.acceptRequestCredit}>
                                <FormattedMessage id='global.accept' defaultMessage='Accept' tagName='span'>
                                  {text => text}
                                </FormattedMessage>
                              </Button>
                            </Grid.Column>
                          </Grid.Row>
                        ) : (
                          <>
                            <Grid.Row>
                              <Grid.Column width={16}>
                                <FormattedMessage
                                  id='order.sellerRequestingDetail'
                                  defaultMessage={
                                    'You have selected to Counter the credit request. Please fill in the counter details below.'
                                  }
                                />
                                <InputCounterValue
                                  onChange={(e, { value, name }) => this.handleChange(e, value, name, setFieldValue)}
                                  label={formatMessage({
                                    id: 'order.counterValue',
                                    defaultMessage: 'Counter Value:'
                                  })}
                                  name='counterValue'
                                  placeholder='$'
                                />
                                <Form.TextArea
                                  onChange={(e, { value, name }) => this.handleChange(e, value, name, setFieldValue)}
                                  name='notes'
                                  label={formatMessage({
                                    id: 'order.notes',
                                    defaultMessage: 'Notes:'
                                  })}
                                />
                                <UploadLot
                                  {...this.props}
                                  name='attachments'
                                  attachments={values.attachments}
                                  filesLimit={1}
                                  fileMaxSize={20}
                                  onChange={files => {
                                    setFieldValue(
                                      `attachments[${
                                        values.attachments && values.attachments.length ? values.attachments.length : 0
                                      }]`,
                                      {
                                        id: files[0].lastModified,
                                        name: files[0].name,
                                        documentType: files[0].type
                                      }
                                    )
                                    this.setState({ changedForm: true })
                                  }}
                                  data-test='settings_product_import_attachments'
                                  emptyContent={
                                    <label>
                                      <FormattedMessage
                                        id='addInventory.dragDrop'
                                        defaultMessage={'Drag and drop to add file here'}
                                      />
                                      <br />
                                      <FormattedMessage
                                        id='addInventory.dragDropOr'
                                        defaultMessage={'or {link} to select from computer'}
                                        values={{
                                          link: (
                                            <a>
                                              <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                            </a>
                                          )
                                        }}
                                      />
                                    </label>
                                  }
                                  uploadedContent={
                                    <label>
                                      <FormattedMessage
                                        id='addInventory.dragDrop'
                                        defaultMessage={'Drag and drop to add file here'}
                                      />
                                      <br />
                                      <FormattedMessage
                                        id='addInventory.dragDropOr'
                                        defaultMessage={'or {link} to select from computer'}
                                        values={{
                                          link: (
                                            <a>
                                              <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                            </a>
                                          )
                                        }}
                                      />
                                    </label>
                                  }
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width={6}></Grid.Column>
                              <Grid.Column floated='right' width={3}>
                                <Button
                                  basic
                                  fluid
                                  onClick={() => {
                                    resetForm()
                                    this.props.closePopup()
                                  }}>
                                  <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </Grid.Column>
                              <Grid.Column floated='right' width={4}>
                                <Button
                                  type='button'
                                  basic
                                  fluid
                                  onClick={() => {
                                    this.setState({ counter: false })
                                  }}>
                                  <FormattedMessage
                                    id='global.returnReview'
                                    defaultMessage='Return to review'
                                    tagName='span'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </Grid.Column>
                              <Grid.Column floated='right' width={3}>
                                <Button color='blue' fluid type='submit'>
                                  <FormattedMessage id='global.send' defaultMessage='Send' tagName='span'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </Grid.Column>
                            </Grid.Row>
                          </>
                        )}
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

function mapStateToProps(state) {
  const { detail } = state.orders
  return {
    orderId: detail.id,
    isSending: state.orders.isSending
  }
}

export default connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(SaleReturnShipping)))
