import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Dimmer,
  Loader,
  ModalContent,
  Table,
  Grid,
  Header,
  Button,
  Segment,
  Tab,
  TabPane,
  Menu,
  Label
} from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import { FieldArray } from 'formik'
import moment from 'moment'

import * as Actions from '../../actions'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import confirm from '~/src/components/Confirmable/confirm'
import { loadFile, addAttachment } from '~/modules/inventory/actions'
import { getLocaleDateFormat } from '~/components/date-format'
import { UploadCloud } from 'react-feather'

const UploadCloudIcon = styled(UploadCloud)`
  color: #2599d5 !important;
`

const ModalBody = styled(ModalContent)`
  padding: 0 1.5rem 1.5rem !important;
`

const TabMenu = styled(Tab)`
  .ui.pointing.secondary.menu {
    margin: 0 0 6px !important;
    box-shadow: 0 3px 0 0 #ccc !important;
  }
`

const LotsTab = styled(TabPane)`
  margin: 0 !important;
  border: 0 none !important;
  padding: 0 !important;
  .uploadLot {
    padding: 0em !important;
    font-size: 1rem !important;
  }
  .ui.table tr.active,
  .ui.table .td.active {
    background: #f8f9fb !important;
  }
`

const Subtitle = styled(Header)`
  margin-top: 1em;
  font-weight: 400;
`

const TableWrapper = styled(Segment)`
  padding: 1em 2em 3em !important;
`

const DivIcon = styled.div`
  display: flex !important;
`

const AIcon = styled.a`
  margin-left: 0.8vw;
`

const initValues = {
  tab: [
    {
      groupedOffer: []
    }
  ]
}

//TODO
class SaleAttachingProductOffer extends Component {
  state = {
    activeTab: 0,
    allocated: [],
    sumAllocated: [],
    sumAvailable: [],
    available: [],
    poLots: [],
    sumPkgTotal: [],
    totalPkgAmount: 0
  }

  componentDidMount() {
    const { getGroupedProductOffers, orderId, orderItemsId } = this.props

    if (orderItemsId && orderItemsId.length > 1) {
      orderItemsId.forEach(id => getGroupedProductOffers(orderId, id))
    } else if (orderId && orderItemsId && orderItemsId.length === 1) {
      getGroupedProductOffers(orderId, orderItemsId[0])
    }
  }

  componentDidUpdate(oldProps) {
    if (
      getSafe(() => oldProps.groupedProductOffers.length, 0) < getSafe(() => this.props.groupedProductOffers.length, 0)
    ) {
      let sumAvailable = []
      let sumPkgTotal = []
      let available = []
      let sumAllocated = []
      let allocated = []
      let totalPkgAmount = 0
      this.props.groupedProductOffers.forEach((offers, index) => {
        if (offers && !offers.length) return
        const pkgAmount = this.props.productOffersPkgAmount.get(offers[0] && offers[0].parentOffer)

        if (pkgAmount) {
          sumAvailable.push(pkgAmount)
          totalPkgAmount += pkgAmount
        }

        const sumPkgAllocated = offers.reduce(function(sum, offer) {
          return sum + offer.pkgAllocated
        }, 0)
        sumAllocated.push(sumPkgAllocated)
        const pkgAvailable = offers.map(offer => offer.pkgAvailable)
        available.push(pkgAvailable)

        const cfPkgTotal = offers.reduce(function(sum, offer) {
          return sum + offer.cfPkgTotal
        }, 0)
        sumPkgTotal.push(cfPkgTotal)

        offers.forEach((offer, i) => {
          if (offer && offer.attachments && offer.attachments.length) {
            this.setFieldValue(`tab[${index}].groupedOffer[${i}].attachments[0]`, {
              id: offer.attachments[0].id,
              name: offer.attachments[0].name,
              linked: true,
              isToOrderItem: true
            })
          }
        })

        const pkgAllocated = offers.map(offer => offer.pkgAllocated)
        allocated.push(pkgAllocated)
        this.setState({
          sumAvailable,
          sumAllocated,
          available,
          sumPkgTotal,
          allocated,
          totalPkgAmount
        })
      })
    }
  }

  componentWillUnmount() {
    this.props.clearGroupedProductOffer()
  }

  linkAttachment = async (offerId, files, setFieldValue, index) => {
    try {
      const response = await this.props.addAttachment(files[0], 1, {})
      const query = {
        attachmentId: response.value.data.id,
        orderItemId: offerId
      }
      await this.props.linkAttachmentToOrderItem(query)

      setFieldValue(`tab[${this.state.activeTab}].groupedOffer[${index}].attachments[0]`, {
        id: response.value.data.id,
        name: response.value.data.name,
        linked: true,
        isToOrderItem: true
      })
    } catch (error) {
      console.error(error)
    }
  }

  removeAttachment = (offer, file, setFieldValue, index) => {
    setFieldValue(`tab[${this.state.activeTab}].groupedOffer[${index}].attachments`, [])
    const query = {
      attachmentId: file.id,
      orderItemId: offer.id
    }

    this.props.removeLinkAttachmentToOrderItem(query)
  }

  renderTab(tabIndex, offers, setFieldValue, values) {
    if (!getSafe(() => offers.length, 0)) return <></>

    return (
      <LotsTab active={this.state.activeTab === tabIndex}>
        <Grid style={{ marginTop: '0.5em' }}>
          <Grid.Column width={14}>
            <FormattedMessage
              id='order.groupedOffer.item.amount'
              defaultMessage='Allocated packages: {allocated} / {amount}'
              values={{ allocated: this.state.sumAllocated[tabIndex], amount: this.state.sumAvailable[tabIndex] }}
            />
            {this.state.sumAvailable[tabIndex] !== this.state.sumAllocated[tabIndex] ? (
              <Label circular color='red' empty style={{ marginLeft: '0.5em' }} />
            ) : null}
          </Grid.Column>
          <Grid.Column width={1}>
            <Input name={`tab[${tabIndex}].itemId`} inputProps={{ type: 'hidden', defaultValue: tabIndex }} />
          </Grid.Column>
          <Grid.Column width={1}>
            <Input
              name={`tab[${tabIndex}].productOfferId`}
              inputProps={{ type: 'hidden', defaultValue: this.props.orderId }}
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
                                const available = this.state.available
                                const allocated = this.state.allocated
                                const sumAvailable = this.state.sumAvailable
                                const sumAllocated = this.state.sumAllocated

                                const allocatedIndex = this.state.allocated[tabIndex][index]
                                const availableIndex = this.state.available[tabIndex][index]
                                setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].id`, offer.id)
                                let differenceNumber = 0
                                if (sumAvailable[tabIndex] !== sumAllocated[tabIndex]) {
                                  differenceNumber = sumAvailable[tabIndex] - sumAllocated[tabIndex]
                                }

                                if (checked) {
                                  setFieldValue(
                                    `tab[${tabIndex}].groupedOffer[${index}].allocated`,
                                    allocatedIndex + differenceNumber
                                  )
                                  setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].available`, 0)
                                  available[tabIndex][index] = availableIndex - differenceNumber
                                  allocated[tabIndex][index] += differenceNumber
                                  //sumAvailable[tabIndex] = sumAvailable[tabIndex] - availableIndex
                                  sumAllocated[tabIndex] = sumAllocated[tabIndex] + differenceNumber
                                  this.setState({ available, allocated, sumAllocated })
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
                                  this.setState({ available, allocated, sumAllocated })
                                }
                              },
                              id: `tab${tabIndex}_groupedOffer${index}`
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell>{offer.id}</Table.Cell>
                        <Table.Cell textAlign='center'>{offer.cfPkgTotal}</Table.Cell>
                        <Table.Cell textAlign='center'>
                          {this.state.available[tabIndex] && this.state.available[tabIndex][index]
                            ? this.state.available[tabIndex][index]
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
                                this.state.allocated &&
                                this.state.allocated[tabIndex] &&
                                this.state.allocated[tabIndex][index],
                              max: offer.cfPkgTotal,
                              min: 0,
                              onChange: (e, { value }) => {
                                value = parseInt(value)

                                const available = this.state.available
                                const allocated = this.state.allocated
                                //const sumAvailable = this.state.sumAvailable
                                const sumAllocated = this.state.sumAllocated

                                const allocatedIndex = this.state.allocated[tabIndex][index]
                                const availableIndex = this.state.available[tabIndex][index]
                                const difference = this.state.allocated[tabIndex][index] - value

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
                                  this.setState({ available, allocated, sumAllocated })
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
                          <UploadLot
                            {...this.props}
                            removeOrderItem={file => {
                              this.removeAttachment(offer, file, setFieldValue, index)
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
                            onChange={files => this.linkAttachment(offer.id, files, setFieldValue, index)}
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
            <Button basic fluid onClick={() => this.props.closePopup()}>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
            </Button>
          </Grid.Column>
          <Grid.Column floated='right' width={4}>
            <Button
              style={{ backgroundColor: '#2599d5', color: 'white' }}
              fluid
              disabled={
                this.state.totalPkgAmount !==
                this.state.sumAllocated.reduce((sum, allocated) => {
                  return sum + allocated
                }, 0)
              }>
              <FormattedMessage id='order.assignOffer' defaultMessage='Assign Offer' tagName='span' />
            </Button>
          </Grid.Column>
        </Grid>
      </LotsTab>
    )
  }

  render() {
    const {
      intl: { formatMessage },
      closePopup,
      loadingGroupedProductOffer,
      groupedProductOffers,
      toastManager,
      orderId,
      orderItemsId
    } = this.props

    return (
      <Modal closeIcon onClose={() => closePopup()} open={true}>
        <Dimmer active={loadingGroupedProductOffer} inverted>
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
                    if (this.state.sumAllocated[index] !== this.state.sumAvailable[index]) {
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
                          await this.props
                            .patchAssignProductOffers(orderId, item, request[index])
                            .then(r => {
                              actions.setSubmitting(false)
                              this.props.closePopup()
                            })
                            .catch(e => {
                              actions.setSubmitting(false)
                            })
                        })
                      } else {
                        await this.props
                          .patchAssignProductOffers(orderId, orderItemsId[0], request[0])
                          .then(r => {
                            actions.setSubmitting(false)
                            this.props.closePopup()
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
                      await this.props
                        .patchAssignProductOffers(orderId, item, request[index])
                        .then(r => {
                          actions.setSubmitting(false)
                          this.props.closePopup()
                        })
                        .catch(e => {
                          actions.setSubmitting(false)
                        })
                    })
                  } else {
                    this.props
                      .patchAssignProductOffers(orderId, orderItemsId[0], request[0])
                      .then(r => {
                        actions.setSubmitting(false)
                        this.props.closePopup()
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
                this.setFieldValue = setFieldValue
                const panes = groupedProductOffers.map((offers, index) => {
                  return {
                    menuItem: (
                      <Menu.Item
                        key={`orderItem${index}`}
                        onClick={(e, { index }) => {
                          validateForm()
                            .then(r => {
                              // stop when errors found on current tab
                              if (Object.keys(r).length && getSafe(() => !!r.tab[this.state.activeTab], false)) {
                                submitForm() // show errors
                                return false
                              }

                              // if validation is correct - switch tabs
                              this.setState({ activeTab: index })
                            })
                            .catch(e => {
                              console.log('CATCH', e)
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
                    pane: () => this.renderTab(index, offers, setFieldValue, values)
                  }
                })
                return (
                  <TabMenu
                    menu={{ secondary: true, pointing: true }}
                    panes={panes}
                    renderActiveOnly={false}
                    activeIndex={this.state.activeTab}
                  />
                )
              }}
            </Form>
          </Modal.Description>
        </ModalBody>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const { detail } = state.orders

  const productOffersPkgAmount = new Map()
  const items = getSafe(() => detail.orderItems, '')
  if (items.length) {
    items.forEach(item => {
      if (item && item.productOffers && item.productOffers.length) {
        item.productOffers.forEach(offer => {
          productOffersPkgAmount.set(offer.id, offer.pkgAmount)
        })
      }
    })
  }

  return {
    orderId: getSafe(() => detail.id, null),
    orderItemsId: getSafe(() => detail.orderItems.map(item => item.id), []),
    loadingGroupedProductOffer: getSafe(() => state.orders.loadingGroupedProductOffer, false),
    groupedProductOffers: getSafe(() => state.orders.groupedProductOffers, false),
    available: getSafe(() => state.orders.groupedProductOffers, [])
      ? state.orders.groupedProductOffers.map(offer => offer.pkgAvailable)
      : [0],
    allocated: getSafe(() => state.orders.groupedProductOffers, [])
      ? state.orders.groupedProductOffers.map(offer => offer.pkgAllocated)
      : [0],
    productOffersPkgAmount
  }
}

export default connect(mapStateToProps, { ...Actions, addAttachment })(
  withToastManager(injectIntl(SaleAttachingProductOffer))
)
