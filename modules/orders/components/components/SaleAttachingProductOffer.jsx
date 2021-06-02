import { useEffect, useState } from 'react'
import {
  Modal,
  Dimmer,
  Loader,
  Table,
  Grid,
  Button,
  Menu,
  Label
} from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { withToastManager } from 'react-toast-notifications'
import { FieldArray } from 'formik'
import moment from 'moment'
// Components
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'
// Services
import { getSafe, generateToastMarkup } from '../../../../utils/functions'
import confirm from '../../../../components/Confirmable/confirm'
import { getLocaleDateFormat } from '../../../../components/date-format'
// Styles
import { UploadCloudIcon, ModalBody, TabMenu, LotsTabs, DivIcon, AIcon } from '../../styles'

const initValues = {
  tab: [
    {
      groupedOffer: []
    }
  ]
}

//TODO
const SaleAttachingProductOffer = props => {
  const [state, setState] = useState({
    activeTab: 0,
    allocated: [],
    sumAllocated: [],
    sumAvailable: [],
    available: [],
    poLots: [],
    sumPkgTotal: [],
    totalPkgAmount: 0,
    loadingGroupedProductOffer: false
  })

  let setFieldValue

  useEffect(() => {
    const init = async () => {
      setState({ ...state, loadingGroupedProductOffer: true })
      const { getGroupedProductOffers, orderId, orderItemsId, orderItems } = props
      try {
        if (orderItemsId.length) await getGroupedProductOffers(orderId, orderItemsId)
        getSafe(() => orderItems, []).forEach((item, tabIndex) => {
          if (!item.attachments.length) return
          else
            item.attachments.forEach((attachment, index) =>
              setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].attachments[0]`, {
                id: attachment.id,
                name: attachment.name,
                linked: true,
                isToOrderItem: true
              })
            )
        })
      } catch (error) {
        console.error(error)
      } finally {
        setState({ ...state, loadingGroupedProductOffer: false })
      }
    }

    init()

    const unmount = () => {
      try {
        props.getSaleOrder(props.orderId)
        props.clearGroupedProductOffer()
      } catch (error) {
        console.error(error)
      }
    }

    return unmount
  }, [])

  useEffect(() => {
    if(getSafe(() => props.groupedProductOffers.length, 0) > 0) {
      let sumAvailable = []
      let sumPkgTotal = []
      let available = []
      let sumAllocated = []
      let allocated = []
      let totalPkgAmount = 0
      props.groupedProductOffers.forEach((offers, index) => {
        if (offers && !offers.length) return
        const pkgAmount = props.productOffersPkgAmount.get(offers[0] && offers[0].parentOffer)

        if (pkgAmount) {
          sumAvailable.push(pkgAmount)
          totalPkgAmount += pkgAmount
        }

        const sumPkgAllocated = offers.reduce(function (sum, offer) {
          return sum + offer.pkgAllocated
        }, 0)
        sumAllocated.push(0)
        const pkgAvailable = offers.map(offer => offer.pkgAvailable)
        available.push(pkgAvailable)

        const cfPkgTotal = offers.reduce(function (sum, offer) {
          return sum + offer.cfPkgTotal
        }, 0)
        sumPkgTotal.push(cfPkgTotal)

        offers.forEach((offer, i) => {
          if (offer && offer.attachments && offer.attachments.length) {
            setFieldValue(`tab[${index}].groupedOffer[${i}].attachments[0]`, {
              id: offer.attachments[0].id,
              name: offer.attachments[0].name,
              linked: true,
              isToOrderItem: true
            })
          }
        })

        const pkgAllocated = offers.map(offer => offer.pkgAllocated)
        allocated.push(pkgAllocated)
        setState({
          ...state,
          sumAvailable,
          sumAllocated,
          available,
          sumPkgTotal,
          allocated,
          totalPkgAmount
        })
      })
    }
  }, [getSafe(() => props.groupedProductOffers.length, 0)])

  const linkAttachment = async (orderItemId, files, setFieldValue, index) => {
    try {
      const response = await props.addAttachment(files[0], 1, {})
      setFieldValue(`tab[${state.activeTab}].groupedOffer[${index}].attachments[0]`, {
        id: response.value.data.id,
        name: response.value.data.name,
        linked: true,
        isToOrderItem: true
      })

      const query = {
        attachmentId: response.value.data.id,
        orderItemId: orderItemId
      }
      await props.linkAttachmentToOrderItem(query)
    } catch (error) {
      console.error(error)
    }
  }

  const removeAttachment = (orderItemId, file) => {
    const query = {
      attachmentId: file.id,
      orderItemId: orderItemId
    }
    props.removeLinkAttachmentToOrderItem(query)
  }

  const renderTab = (tabIndex, offers, setFieldValue, values) => {
    if (!getSafe(() => offers.length, 0)) return <></>

    return (
      <LotsTabs active={state.activeTab === tabIndex}>
        <Grid style={{ marginTop: '0.5em' }}>
          <Grid.Column width={14}>
            <FormattedMessage
              id='order.groupedOffer.item.amount'
              defaultMessage='Allocated packages: {allocated} / {amount}'
              values={{ allocated: state.sumAllocated[tabIndex], amount: state.sumAvailable[tabIndex] }}
            />
            {state.sumAvailable[tabIndex] !== state.sumAllocated[tabIndex] ? (
              <Label circular color='red' empty style={{ marginLeft: '0.5em' }} />
            ) : null}
          </Grid.Column>
          <Grid.Column width={1}>
            <Input name={`tab[${tabIndex}].itemId`} inputProps={{ type: 'hidden', defaultValue: tabIndex }} />
          </Grid.Column>
          <Grid.Column width={1}>
            <Input
              name={`tab[${tabIndex}].productOfferId`}
              inputProps={{ type: 'hidden', defaultValue: props.orderId }}
            />
          </Grid.Column>
        </Grid>
        <Table className='ui celled table' basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id='order.groupedOffer.header.number' defaultMessage='Number' />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.total' defaultMessage='Total' />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.available' defaultMessage='Available' />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.allocated' defaultMessage='Allocated' />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.mfgDate' defaultMessage='MFG Date' />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.expirationDate' defaultMessage='Expiration Date' />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                <FormattedMessage id='order.groupedOffer.header.cOfA' defaultMessage='C of A' />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <FieldArray
              name={`tab[${tabIndex}].groupedOffer`}
              render={arrayHelpers => (
                <>
                  {offers &&
                    offers.map((offer, index) => (
                      <Table.Row
                        key={offer.id}
                        active={getSafe(() => values.tab[tabIndex].groupedOffer[index].selected, false)}>
                        <Table.Cell>
                          <Checkbox
                            name={`tab[${tabIndex}].groupedOffer[${index}].selected`}
                            value={offer.id}
                            inputProps={{
                              onClick: (e, { checked }) => {
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].selected`, checked)
                                const available = state.available
                                const allocated = state.allocated
                                const sumAvailable = state.sumAvailable
                                const sumAllocated = state.sumAllocated

                                const allocatedIndex = state.allocated[tabIndex][index]
                                const availableIndex = state.available[tabIndex][index]
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].id`, offer.id)
                                let differenceNumber = 0
                                if (sumAvailable[tabIndex] !== sumAllocated[tabIndex]) {
                                  differenceNumber = sumAvailable[tabIndex] - sumAllocated[tabIndex]
                                }

                                if (checked) {
                                  setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].allocated`, differenceNumber)
                                  setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].available`, 0)
                                  available[tabIndex][index] = availableIndex - differenceNumber
                                  allocated[tabIndex][index] = differenceNumber
                                  //sumAvailable[tabIndex] = sumAvailable[tabIndex] - availableIndex
                                  sumAllocated[tabIndex] = sumAllocated[tabIndex] + differenceNumber
                                  setState({ ...state, available, allocated, sumAllocated })
                                } else {
                                  setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].allocated`, 0)
                                  setFieldValue(
                                    `tab[${tabIndex}].groupedOffer[${index}].available`,
                                    availableIndex + allocatedIndex
                                  )

                                  available[tabIndex][index] = availableIndex + allocatedIndex
                                  allocated[tabIndex][index] = 0
                                  //sumAvailable[tabIndex] = sumAvailable[tabIndex] + allocatedIndex
                                  sumAllocated[tabIndex] = sumAllocated[tabIndex] - allocatedIndex
                                  setState({ ...state, available, allocated, sumAllocated })
                                }
                              },
                              id: `tab${tabIndex}_groupedOffer${index}`
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell>{offer.id}</Table.Cell>
                        <Table.Cell textAlign='center'>{offer.cfPkgTotal}</Table.Cell>
                        <Table.Cell textAlign='center'>
                          {state.available[tabIndex] && state.available[tabIndex][index]
                            ? state.available[tabIndex][index]
                            : 0}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Input
                            name={`tab[${tabIndex}].groupedOffer[${index}].allocated`}
                            inputProps={{
                              type: 'number',
                              readOnly: getSafe(() => values.tab[tabIndex].groupedOffer[index].selected, false)
                                ? false
                                : true,
                              defaultValue:
                                state.allocated &&
                                state.allocated[tabIndex] &&
                                state.allocated[tabIndex][index],
                              max: offer.cfPkgTotal,
                              min: 0,
                              onChange: (e, { value }) => {
                                value = parseInt(value)

                                const available = state.available
                                const allocated = state.allocated
                                //const sumAvailable = state.sumAvailable
                                const sumAllocated = state.sumAllocated

                                const allocatedIndex = state.allocated[tabIndex][index]
                                const availableIndex = state.available[tabIndex][index]
                                const difference = state.allocated[tabIndex][index] - value

                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].id`, offer.id)

                                if (value > offer.cfPkgTotal || value < 0) {
                                  setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].available`, availableIndex)
                                  setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].allocated`, allocatedIndex)
                                } else if (difference) {
                                  setFieldValue(
                                    `tab[${tabIndex}].groupedOffer[${index}].available`,
                                    availableIndex + difference
                                  )
                                  available[tabIndex][index] = availableIndex + difference
                                  allocated[tabIndex][index] = allocatedIndex - difference
                                  //sumAvailable[tabIndex] = sumAvailable[tabIndex] + difference
                                  sumAllocated[tabIndex] = sumAllocated[tabIndex] - difference
                                  setState({ ...state, available, allocated, sumAllocated })
                                }
                              }
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {offer.lotManufacturedDate
                            ? moment(offer.lotManufacturedDate).format(getLocaleDateFormat())
                            : 'N/A'}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {offer.lotExpirationDate
                            ? moment(offer.lotExpirationDate).format(getLocaleDateFormat())
                            : 'N/A'}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          <UploadAttachment
                            {...props}
                            removeOrderItem={file => {
                              removeAttachment(props.orderItemsId[tabIndex], file)
                            }}
                            attachments={getSafe(
                              () => values.tab[tabIndex].groupedOffer[index].attachments,
                              offer.attachments
                            )}
                            name={`tab[${tabIndex}].groupedOffer[${index}].attachments`}
                            type={1}
                            lot={offer}
                            filesLimit={1}
                            fileMaxSize={20}
                            onChange={files =>
                              linkAttachment(props.orderItemsId[tabIndex], files, setFieldValue, index)
                            }
                            data-test={`grouped_offer_${index}_attachments`}
                            emptyContent={
                              <DivIcon>
                                <UploadCloudIcon />
                                <AIcon>
                                  <FormattedMessage id='global.uploadCloud' defaultMessage='upload' />
                                </AIcon>
                              </DivIcon>
                            }
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </>
              )}
            />
          </Table.Body>
        </Table>
        <Grid>
          <Grid.Column width={9}></Grid.Column>
          <Grid.Column floated='right' width={3}>
            <Button basic fluid onClick={() => props.closePopup()}>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
            </Button>
          </Grid.Column>
          <Grid.Column floated='right' width={4}>
            <Button
              style={{ backgroundColor: '#2599d5', color: 'white' }}
              fluid
              disabled={
                state.totalPkgAmount !==
                state.sumAllocated.reduce((sum, allocated) => {
                  return sum + allocated
                }, 0)
              }>
              <FormattedMessage id='order.assignOffer' defaultMessage='Assign Offer' tagName='span' />
            </Button>
          </Grid.Column>
        </Grid>
      </LotsTabs>
    )
  }

  
  const {
    intl: { formatMessage },
    closePopup,
    groupedProductOffers,
    toastManager,
    orderId,
    orderItemsId
  } = props

  return (
    <Modal closeIcon onClose={() => closePopup()} open={true}>
      <Dimmer active={state.loadingGroupedProductOffer} inverted>
        <Loader />
      </Dimmer>
      <Modal.Header>
        <FormattedMessage id='order.saleAttachingProductOffer' defaultMessage='ATTACHING PRODUCT OFFER' />
      </Modal.Header>
      <ModalBody>
        <Modal.Description>
          <Form
            enableReinitialize
            validateOnChange={false}
            initialValues={{ ...initValues }}
            onSubmit={(values, actions) => {
              // check that all tabs have selected at least one item
              let missingSelected = true
              if (values && values.tab && values.tab.length) {
                values.tab.forEach(tab => {
                  if (tab && tab.groupedOffer && tab.groupedOffer.length) {
                    tab.groupedOffer.forEach(offer => {
                      if (offer && offer.selected) {
                        missingSelected = false
                        return
                      }
                    })
                  } else {
                    return
                  }
                })
              }

              if (missingSelected) {
                toastManager.add(
                  generateToastMarkup(
                    <FormattedMessage id='errors.noSelected.header' defaultMessage='No Selected' />,
                    <FormattedMessage
                      id='errors.noSelected.content'
                      defaultMessage='Please check that all order items have selected at least one.'
                    />
                  ),
                  {
                    appearance: 'error'
                  }
                )
                actions.setSubmitting(false)
                return false
              }
              // check if any selected and allocated lot is without file
              let missingFile = false
              if (values && values.tab && values.tab.length) {
                values.tab.forEach(tab => {
                  if (tab && tab.groupedOffer && tab.groupedOffer.length) {
                    tab.groupedOffer.forEach(offer => {
                      if (offer && offer.selected && (!offer.attachments || !offer.attachments.length)) {
                        missingFile = true
                      }
                    })
                  }
                })
              }

              let isSumInTabsCorrect = true
              if (values && values.tab && values.tab.length) {
                values.tab.forEach((tab, index) => {
                  if (state.sumAllocated[index] !== state.sumAvailable[index]) {
                    isSumInTabsCorrect = false
                    return
                  }
                })
              }

              if (!isSumInTabsCorrect) {
                toastManager.add(
                  generateToastMarkup(
                    <FormattedMessage
                      id='order.detail.error.incorect.packages.header'
                      defaultMessage='Incorrect allocated packages'
                    />,
                    <FormattedMessage
                      id='order.detail.error.incorect.packages.content'
                      defaultMessage='Please, check all Order Item tabs and allocate correctly amount packages.'
                      values={{ id: orderId }}
                    />
                  ),
                  {
                    appearance: 'error'
                  }
                )
                actions.setSubmitting(false)
                return
              }

              const request = []
              if (values && values.tab && values.tab.length) {
                values.tab.forEach(tab => {
                  const tabRequest = []
                  if (tab && tab.groupedOffer && tab.groupedOffer.length) {
                    tab.groupedOffer.forEach(offer => {
                      if (offer && offer.selected && offer.allocated) {
                        tabRequest.push({
                          pkgAmount: parseInt(offer.allocated),
                          productOffer: parseInt(offer.id)
                        })
                      }
                    })
                  }
                  if (tabRequest.length) {
                    request.push(tabRequest)
                  }
                })
              }
              // confirm to assign when missing attachment(s) for assigned lot(s)
              if (missingFile) {
                confirm(
                  formatMessage({ id: 'confirm.missingCOfA.title', defaultMessage: 'Missing C of A' }),
                  formatMessage({
                    id: 'confirm.missingCOfA.content',
                    defaultMessage:
                      'You have allocated packages on lot without C of A document. Do you really want to proceed and assign lots?'
                  })
                ).then(
                  async () => {
                    // confirm
                    if (orderItemsId.length > 1) {
                      orderItemsId.forEach(async (item, index) => {
                        await props
                          .patchAssignProductOffers(orderId, item, request[index])
                          .then(r => {
                            actions.setSubmitting(false)
                            props.closePopup()
                          })
                          .catch(e => {
                            actions.setSubmitting(false)
                          })
                      })
                    } else {
                      await props
                        .patchAssignProductOffers(orderId, orderItemsId[0], request[0])
                        .then(r => {
                          actions.setSubmitting(false)
                          props.closePopup()
                        })
                        .catch(e => {
                          actions.setSubmitting(false)
                        })
                    }
                  },
                  () => {
                    // cancel
                    actions.setSubmitting(false)
                  }
                )
              } else {
                if (orderItemsId.length > 1) {
                  orderItemsId.forEach(async (item, index) => {
                    await props
                      .patchAssignProductOffers(orderId, item, request[index])
                      .then(r => {
                        actions.setSubmitting(false)
                        props.closePopup()
                      })
                      .catch(e => {
                        actions.setSubmitting(false)
                      })
                  })
                } else {
                  props
                    .patchAssignProductOffers(orderId, orderItemsId[0], request[0])
                    .then(r => {
                      actions.setSubmitting(false)
                      props.closePopup()
                    })
                    .catch(e => {
                      actions.setSubmitting(false)
                    })
                }
              }
            }}
            className='flex stretched'
            style={{ padding: '0' }}>
            {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
              setFieldValue = setFieldValue
              const panes = groupedProductOffers.map((offers, index) => {
                return {
                  menuItem: (
                    <Menu.Item
                      key={`orderItem${index}`}
                      onClick={(e, { index }) => {
                        validateForm()
                          .then(r => {
                            // stop when errors found on current tab
                            if (Object.keys(r).length && getSafe(() => !!r.tab[state.activeTab], false)) {
                              submitForm() // show errors
                              return false
                            }

                            // if validation is correct - switch tabs
                            setState({ ...state, activeTab: index })
                          })
                          .catch(e => {
                            console.error('CATCH', e)
                          })
                      }}
                      data-test={`order_grouped_offers_tab${index}`}>
                      <FormattedMessage
                        id='order.groupedOffer.orderItem'
                        defaultMessage='Order Item {num}'
                        values={{ num: index + 1 }}
                      />
                    </Menu.Item>
                  ),
                  pane: () => renderTab(index, offers, setFieldValue, values)
                }
              })
              return (
                <TabMenu
                  menu={{ secondary: true, pointing: true }}
                  panes={panes}
                  renderActiveOnly={false}
                  activeIndex={state.activeTab}
                />
              )
            }}
          </Form>
        </Modal.Description>
      </ModalBody>
    </Modal>
  )
}

export default withToastManager(injectIntl(SaleAttachingProductOffer))
