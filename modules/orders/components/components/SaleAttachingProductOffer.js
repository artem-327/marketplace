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
import { FormattedMessage, injectIntl, FormattedDate } from 'react-intl'
import { Form, Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'
import * as val from 'yup'
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
import { ORDER_CONFIRM_FETCH_REJECTED } from '../../action-types'

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
`

const Subtitle = styled(Header)`
  margin-top: 1em;
  font-weight: 400;
`

const TableWrapper = styled(Segment)`
  padding: 1em 2em 3em !important;
`

const initValues = {
  tab: [
    {
      groupedOffer: []
    }
  ]
}

val.addMethod(val.object, 'lessThanOrdered', function(propertyName, message) {
  return this.test('lessThan', message, function(value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const amount = value['amount']
    const allocated = options.reduce(function(allocated, option) {
      allocated += option.allocated
      return allocated
    }, 0)

    if (allocated < amount) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message
      })
    }

    return true
  })
})

val.addMethod(val.object, 'moreThanOrdered', function(propertyName, message) {
  return this.test('moreThan', message, function(value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const amount = value['amount']
    const allocated = options.reduce(function(allocated, option) {
      allocated += option.allocated
      return allocated
    }, 0)

    if (allocated > amount) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message
      })
    }

    return true
  })
})

const validationScheme = val.object().shape({
  tab: val.array().of(
    val.object().shape({
      orderItemId: val.number(),
      lots: val.array().of(
        val
          .object()
          .lessThanOrdered('allocated', errorMessages.lessThanOrdered)
          .moreThanOrdered('allocated', errorMessages.moreThanOrdered)
          .shape({
            allocated: val
              .number(errorMessages.mustBeNumber)
              .min(0, errorMessages.minimum(0))
              .required(errorMessages.requiredMessage),
            amount: val.number(), // helper for allocated validation
            selected: val.bool()
          })
      )
    })
  )
})
const initialState = {
  activeTab: 0,
  allocated: [],
  sumAvailable: [],
  available: [],
  poLots: [],
  sumPkgTotal: []
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
    sumPkgTotal: []
  }

  componentDidMount() {
    const { getGroupedProductOffers, orderId, orderItemsId, groupedProductOffers } = this.props

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
      this.props.groupedProductOffers.forEach((offers, index) => {
        if (offers && !offers.length) return
        console.log('offers====================================')
        console.log(offers)
        console.log('====================================')
        console.log('this.props.productOffersPkgAmount.get(offers.parentOffer)====================================')
        console.log(this.props.productOffersPkgAmount.get(offers[index].parentOffer))
        console.log('====================================')
        sumAvailable.push(this.props.productOffersPkgAmount.get(offers[index].parentOffer))

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

        const pkgAllocated = offers.map(offer => offer.pkgAllocated)
        allocated.push(pkgAllocated)

        this.setState({
          sumAvailable,
          sumAllocated,
          available,
          sumPkgTotal,
          allocated
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
            {this.state.sumAllocated[tabIndex] > this.state.sumPkgTotal[tabIndex] ? (
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
        <TableWrapper>
          <Table className='table-fields basic'>
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
                        <Table.Row key={offer.id}>
                          <Table.Cell>
                            <Input
                              name={`tab[${tabIndex}].groupedOffer[${index}].amount`}
                              inputProps={{ type: 'hidden', defaultValue: offer.cfPkgTotal }}
                            />
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

                                  if (checked) {
                                    setFieldValue(
                                      `tab[${tabIndex}].groupedOffer[${index}].allocated`,
                                      allocatedIndex + availableIndex
                                    )
                                    setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].available`, 0)
                                    available[tabIndex][index] = 0
                                    allocated[tabIndex][index] = availableIndex + allocatedIndex
                                    sumAvailable[tabIndex] = sumAvailable[tabIndex] - availableIndex
                                    sumAllocated[tabIndex] = sumAllocated[tabIndex] + availableIndex
                                    this.setState({ available, allocated, sumAvailable, sumAllocated })
                                  } else {
                                    setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].allocated`, 0)
                                    setFieldValue(
                                      `tab[${tabIndex}].groupedOffer[${index}].available`,
                                      availableIndex + allocatedIndex
                                    )

                                    available[tabIndex][index] = availableIndex + allocatedIndex
                                    allocated[tabIndex][index] = 0
                                    sumAvailable[tabIndex] = sumAvailable[tabIndex] + allocatedIndex
                                    sumAllocated[tabIndex] = sumAllocated[tabIndex] - allocatedIndex
                                    this.setState({ available, allocated, sumAvailable, sumAllocated })
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
                                  const sumAvailable = this.state.sumAvailable
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
                                    sumAvailable[tabIndex] = sumAvailable[tabIndex] + difference
                                    sumAllocated[tabIndex] = sumAllocated[tabIndex] - difference
                                    this.setState({ available, allocated, sumAvailable, sumAllocated })
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
                                <FormattedMessage id='global.upUpload' defaultMessage='\u2191 upload' tagName='a' />
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
        </TableWrapper>
        <Grid>
          <Grid.Column width={10}></Grid.Column>
          <Grid.Column floated='right' width={3}>
            <Button basic fluid onClick={() => this.props.closePopup()}>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
            </Button>
          </Grid.Column>
          <Grid.Column floated='right' width={3}>
            <Button style={{ backgroundColor: '#2599d5', color: 'white' }} fluid>
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
      productOffersPkgAmount
    } = this.props
    console.log('productOffersPkgAmount====================================')
    console.log(productOffersPkgAmount)
    console.log('====================================')

    return (
      <Modal closeIcon onClose={() => closePopup()} open={true} size='small'>
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
              validationSchema={validationScheme}
              onSubmit={(values, actions) => {
                console.log('values====================================')
                console.log(values)
                console.log('====================================')
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

                console.log('missingSelected====================================')
                console.log(missingSelected)
                console.log('====================================')
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
                let missingFile = true
                if (values && values.tab && values.tab.length) {
                  if (
                    values.tab[this.state.activeTab] &&
                    values.tab[this.state.activeTab].groupedOffer &&
                    values.tab[this.state.activeTab].groupedOffer.length
                  ) {
                    values.tab[this.state.activeTab].groupedOffer.forEach(offer => {
                      if (offer && offer.selected && offer.attachments) {
                        missingFile = false
                      } else {
                        missingFile = true
                        return
                      }
                    })
                  } else {
                    return
                  }
                }
                console.log('missingFile====================================')
                console.log(missingFile)
                console.log('====================================')
                const orderItemId = this.props.orderItemsId[this.state.activeTab]
                console.log('orderItemId====================================')
                console.log(orderItemId)
                console.log('====================================')

                const request = []
                if (values && values.tab && values.tab.length) {
                  values.tab.forEach(tab => {
                    if (tab && tab.groupedOffer && tab.groupedOffer.length) {
                      tab.groupedOffer.forEach(offer => {
                        if (offer && offer.selected && offer.allocated) {
                          request.push({
                            pkgAmount: parseInt(offer.allocated),
                            productOffer: parseInt(offer.id)
                          })
                        }
                      })
                    }
                  })
                }

                console.log('request====================================')
                console.log(request)
                console.log('====================================')
                actions.setSubmitting(false)
                return false
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
                      await this.props
                        .patchAssignProductOffers(orderId, orderItemId, request)
                        .then(r => {
                          toastManager.add(
                            generateToastMarkup(
                              <FormattedMessage id='order.assignLots.success.header' defaultMessage='Lots Assigned' />,
                              <FormattedMessage
                                id='order.assignLots.success.content'
                                defaultMessage='Lot assignments for Order {id} was saved.'
                                values={{ id: orderId }}
                              />
                            ),
                            {
                              appearance: 'success'
                            }
                          )
                          actions.setSubmitting(false)
                          this.props.closePopup()
                        })
                        .catch(e => {
                          actions.setSubmitting(false)
                        })
                    },
                    () => {
                      // cancel
                      actions.setSubmitting(false)
                    }
                  )
                } else {
                  this.props
                    .patchAssignProductOffers(orderId, orderItemId, request)
                    .then(r => {
                      toastManager.add(
                        generateToastMarkup(
                          <FormattedMessage id='order.assignLots.success.header' defaultMessage='Lots Assigned' />,
                          <FormattedMessage
                            id='order.assignLots.success.content'
                            defaultMessage='Selected Lots were assigned and available packages allocated'
                          />
                        ),
                        {
                          appearance: 'success'
                        }
                      )
                      actions.setSubmitting(false)
                      this.props.closePopup()
                    })
                    .catch(e => {
                      actions.setSubmitting(false)
                    })
                }
              }}
              className='flex stretched'
              style={{ padding: '0' }}>
              {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
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
