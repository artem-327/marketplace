import { useEffect, useState } from 'react'
import { Modal, ModalContent, Accordion, Button, Icon, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Form, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import moment from 'moment'
import * as val from 'yup'

import { errorMessages } from '../../../../constants/yupValidation'
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const AccordionTitle = styled(Accordion.Title)`
  font-size: 1.12rem;
  line-height: 1.5;

  i.chevron {
    margin-right: 1rem;
    vertical-align: center;
  }
`

const ButtonsRow = styled(Grid.Row)`
  > .column {
    width: auto !important;
    margin-left: 0 !important;

    &:first-child {
      margin-left: auto !important;
    }
  }
`

const initValues = {
  counterValue: null,
  messageBuyer: null
}

const validationSchema = val.object().shape({
  counterValue: val
    .number()
    .min(0, errorMessages.minimum(0))
    .typeError(errorMessages.mustBeNumber)
    .required(errorMessages.requiredMessage),
  messageBuyer: val.string().typeError(errorMessages.invalidString).required(errorMessages.requiredMessage)
})

const PurchaseReviewCreditRequest = props => {
  const [state, setState] = useState({
    counterValue: null,
    messageBuyer: '',
    counter: false,
    activeIndexes: [],
    changedForm: false
  })

  useEffect(() => {
    const { creditRequestHistory } = props
    if (!creditRequestHistory) return
    let arrayIndexes = creditRequestHistory.map((r, i) => {
      return creditRequestHistory.length - 1 === i ? true : false
    })
    setState({ ...state, activeIndexes: arrayIndexes })
  }, [])

  const submitHandler = async (values, actions) => {
    const { closePopup, orderId, creditRequest } = props
    const { counterValue, messageBuyer, attachments } = values

    try {
      const request = {
        amount: counterValue,
        message: messageBuyer
      }

      await creditRequest(orderId, request, attachments)
      closePopup()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const handleChange = (e, value, name, setFieldValue) => {
    e.preventDefault()
    setState({ ...state, [name]: value })
    setFieldValue(name, value)
  }

  const rejectRequestCredit = async e => {
    e.preventDefault()
    const { closePopup, orderId, creditCounterReject } = props

    try {
      await creditCounterReject(orderId)
      closePopup()
    } catch (e) {
      console.error(e)
    }
  }

  const acceptRequestCredit = async e => {
    e.preventDefault()
    const { closePopup, orderId, creditCounterAccept } = props

    try {
      await creditCounterAccept(orderId)
      closePopup()
    } catch (e) {
      console.error(e)
    }
  }

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexes } = state

    activeIndexes[index] = activeIndexes[index] ? false : true

    setState({ ...state, activeIndexes })
  }

  const prepareLinkToAttachment = async attachmentId => {
    let downloadedFile = await props.downloadCreditRequestAttachments('purchase', props.orderId, attachmentId)
    const element = document.createElement('a')
    let fileURL = URL.createObjectURL(downloadedFile.value.data)
    element.href = fileURL

    return element
  }

  const downloadAttachment = async (documentName, attachmentId) => {
    const element = await prepareLinkToAttachment(attachmentId)
    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFoxs
    element.click()
  }


  const {
    intl: { formatMessage },
    orderId,
    isSending,
    creditRequestHistory
  } = props

  const { activeIndexes } = state

  return (
    <>
      <Modal closeIcon onClose={() => props.closePopup()} open={true} size='small'>
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
              validateOnChange={true}
              validationSchema={validationSchema}
              initialValues={{ ...initValues }}
              onSubmit={submitHandler}
              className='flex stretched'
              style={{ padding: '0' }}>
              {({ values, submitForm, setFieldValue, resetForm }) => {
                return (
                  <>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={16}>
                          {creditRequestHistory &&
                          creditRequestHistory.length &&
                          creditRequestHistory[creditRequestHistory.length - 1].amount ? (
                            <strong style={{ fontSize: '16px' }}>
                              <FormattedMessage
                                id='order.sellerOffering'
                                defaultMessage={'Seller is offering a discount of $'}
                              />
                              {`${creditRequestHistory[creditRequestHistory.length - 1].amount}. `}
                              <FormattedMessage
                                id='order.viewRequesting'
                                defaultMessage={'Please view reasoning and images below:'}
                              />
                            </strong>
                          ) : null}
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={16}>
                          <strong style={{ textDecoration: 'underline', fontSize: '16px' }}>
                            <FormattedMessage id='order.messageningHistory' defaultMessage={'Messaging History: '} />
                          </strong>
                          {creditRequestHistory && creditRequestHistory.length ? (
                            <Accordion fluid>
                              {creditRequestHistory.map((reason, i) => {
                                return (
                                  <div key={reason.id}>
                                    <AccordionTitle active={activeIndexes[i]} index={i} onClick={handleClick}>
                                      <Icon
                                        name={'chevron ' + (activeIndexes[i] ? 'down' : 'right')}
                                        size='small'
                                        color={activeIndexes[i] ? 'blue' : 'black'}
                                      />

                                      <span
                                        style={{
                                          fontStyle: 'italic',
                                          color: 'grey'
                                        }}>
                                        {reason.createdAt && `${moment(reason.createdAt).format('LLL')}: `}
                                      </span>
                                      <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                                        {` ${reason.message.substring(0, 20)}...`}
                                      </span>
                                    </AccordionTitle>
                                    <Accordion.Content active={activeIndexes[i]}>
                                      <Grid.Row style={{ paddingLeft: '26px' }}>
                                        <Grid.Column width={16}>{reason.message}</Grid.Column>
                                      </Grid.Row>
                                      <Grid.Row style={{ paddingLeft: '26px' }}>
                                        <Grid.Column width={16}>
                                          {reason.attachments && reason.attachments.length
                                            ? reason.attachments.map(attachment => {
                                                return (
                                                  <Button
                                                    as='a'
                                                    onClick={() =>
                                                      downloadAttachment(attachment.fileName, attachment.id)
                                                    }>
                                                    <Icon name='download' />
                                                    {attachment.fileName}
                                                  </Button>
                                                )
                                              })
                                            : null}
                                        </Grid.Column>
                                      </Grid.Row>
                                    </Accordion.Content>
                                  </div>
                                )
                              })}
                            </Accordion>
                          ) : null}
                        </Grid.Column>
                      </Grid.Row>
                      <br /> <br />
                      {!state.counter ? (
                        <Grid.Row>
                          <Grid.Column width={7}></Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button
                              type='button'
                              basic
                              fluid
                              onClick={() => {
                                setState({ ...state, counter: true })
                              }}>
                              <FormattedMessage id='global.update' defaultMessage='Update' tagName='span' />
                            </Button>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button color='red' type='button' fluid onClick={rejectRequestCredit}>
                              <FormattedMessage id='global.reject' defaultMessage='Reject' tagName='span' />
                            </Button>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button color='blue' fluid type='button' onClick={acceptRequestCredit}>
                              <FormattedMessage id='global.accept' defaultMessage='Accept' tagName='span' />
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
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column width={7}>
                              <Input
                                name='counterValue'
                                inputProps={{
                                  onChange: (e, { value, name }) => handleChange(e, value, name, setFieldValue),
                                  label: formatMessage({
                                    id: 'order.counterValue',
                                    defaultMessage: 'Counter Value:'
                                  }),
                                  placeholder: '$',
                                  type: 'number',
                                  min: 0
                                }}
                              />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <TextArea
                                onChange={(e, { value, name }) => handleChange(e, value, name, setFieldValue)}
                                name='messageBuyer'
                                label={formatMessage({
                                  id: 'order.messageBuyer',
                                  defaultMessage: 'Message to Buyer:'
                                })}
                              />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <UploadAttachment
                                {...props}
                                name='attachments'
                                attachments={values.attachments}
                                fileMaxSize={20}
                                onChange={files => {
                                  files.map((file, i) => {
                                    setFieldValue(`attachments[${i}]`, file)
                                  })
                                  setState({ ...state, changedForm: true })
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
                          <ButtonsRow>
                            <Grid.Column floated='right'>
                              <Button
                                type='button'
                                basic
                                fluid
                                onClick={() => {
                                  resetForm()
                                  props.closePopup()
                                }}>
                                <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' /> 
                              </Button>
                            </Grid.Column>
                            <Grid.Column floated='right'>
                              <Button
                                type='button'
                                basic
                                fluid
                                onClick={() => {
                                  setState({ ...state, counter: false })
                                }}>
                                <FormattedMessage
                                  id='global.returnReview'
                                  defaultMessage='Return to review'
                                  tagName='span' />
                              </Button>
                            </Grid.Column>
                            <Grid.Column floated='right'>
                              <Button color='blue' fluid type='submit'>
                                <FormattedMessage id='global.send' defaultMessage='Send' tagName='span' />
                              </Button>
                            </Grid.Column>
                          </ButtonsRow>
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

export default injectIntl(PurchaseReviewCreditRequest)
