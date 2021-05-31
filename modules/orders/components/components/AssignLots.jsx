import { useEffect, useState } from 'react'
import { Modal, ModalContent, Table, Grid, Header, Button, Segment, Tab, TabPane, Menu, Label } from 'semantic-ui-react'
import { Form, Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FieldArray } from 'formik'
import { getSafe } from '../../../../utils/functions'
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl'
import UploadAttachment from '../../../inventory/components/upload/UploadAttachment'
import confirm from '../../../../components/Confirmable/confirm'
import styled from 'styled-components'
import * as val from 'yup'
import { errorMessages } from '../../../../constants/yupValidation'

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
  tabLots: [
    {
      orderItemId: 0,
      lots: []
    }
  ]
}

val.addMethod(val.object, 'lessThanOrdered', function (propertyName, message) {
  return this.test('lessThan', message, function (value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const amount = value['amount']
    const allocated = options.reduce(function (allocated, option) {
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

val.addMethod(val.object, 'moreThanOrdered', function (propertyName, message) {
  return this.test('moreThan', message, function (value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const amount = value['amount']
    const allocated = options.reduce(function (allocated, option) {
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
  tabLots: val.array().of(
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

const AssignLots = props => {
  const [state, setState] = useState({
    activeTab: 0,
    allocated: [],
    poLots: []
  })

  useEffect(() => {
    const { orderItems } = props

    if (getSafe(() => orderItems.length, 0)) {
      let allocated = state.allocated
      let alreadyLoadedLots = []
      orderItems.forEach(orderItem => {
        const sumAllocated = orderItem.lots.reduce(function (sum, lot) {
          return sum + lot.amount
        }, 0)
        allocated.push(sumAllocated)
        if (!alreadyLoadedLots.includes(orderItem.productOffer)) {
          props.loadLotsToAssign(orderItem.productOffer)
          alreadyLoadedLots.push(orderItem.productOffer)
        }
      })
      setState({ ...state, allocated: allocated })
    }
  }, [])

  useEffect(() => {
    const availability = props.poLots.map(poLot => {
      return {
        id: poLot.id,
        lots: poLot.lots.map(lot => {
          return {
            id: lot.id,
            available: lot.available
          }
        })
      }
    })
    setState({ ...state, poLots: availability })
  }, [getSafe(() => props.poLots.length, 0)])

  const linkAttachment = (lotId, files, data) => {
    const { values, setFieldValue, lotNumber, productOfferId } = data
    props.linkAttachment(lotId, files).then(r => {
      const affectedOrderItems = values.tabLots.forEach((tab, tabIndex) => {
        if (tab.productOfferId === productOfferId) {
          const lotIndex = tab.lots.findIndex(lot => lot.lotNumber === lotNumber)
          const attachments = values.tabLots[tabIndex].lots[lotIndex].attachments
          setFieldValue(
            `tabLots[${tabIndex}].lots[${lotIndex}].attachments[${attachments.length ? attachments.length : 0}]`,
            {
              id: r.value.file.id,
              name: r.value.file.name,
              linked: true
            }
          )
        }
      })
    })
  }

  const removeAttachment = (fileId, data) => {
    const { values, setFieldValue } = data
    values.tabLots.forEach((tab, tabIndex) => {
      const lotIndex = tab.lots.findIndex(lot => getSafe(() => lot.attachments[0].id, 0) === fileId)
      if (lotIndex) {
        setFieldValue(`tabLots[${tabIndex}].lots[${lotIndex}].attachments`, [])
      }
    })
    props.removeAttachment(fileId)
  }

  const renderTab = (tabIndex, orderItem, lots, setFieldValue, values) => {
    const { poLots } = props
    const statePoLots = state.poLots
    let tabAvailability = []
    if (statePoLots.length)
      tabAvailability = getSafe(() => statePoLots.find(poLot => poLot.id === orderItem.productOffer).lots, [])

    if (!getSafe(() => poLots.length, 0)) return <></>

    return (
      <LotsTab active={state.activeTab === tabIndex}>
        <Grid style={{ marginTop: '0.5em' }}>
          <Grid.Column width={14}>
            <FormattedMessage
              id='order.assignLots.orderItem.amount'
              defaultMessage='Allocated packages: {allocated} / {amount}'
              values={{ allocated: state.allocated[tabIndex], amount: orderItem.amount }}
            />
            {state.allocated[tabIndex] > orderItem.amount ? (
              <Label circular color='red' empty style={{ marginLeft: '0.5em' }} />
            ) : null}
          </Grid.Column>
          <Grid.Column width={1}>
            <Input
              name={`tabLots[${tabIndex}].orderItemId`}
              inputProps={{ type: 'hidden', defaultValue: orderItem.id }}
            />
          </Grid.Column>
          <Grid.Column width={1}>
            <Input
              name={`tabLots[${tabIndex}].productOfferId`}
              inputProps={{ type: 'hidden', defaultValue: orderItem.productOffer }}
            />
          </Grid.Column>
        </Grid>
        <TableWrapper>
          <Table className='table-fields basic'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>
                  <FormattedMessage id='order.assignLots.header.lotNumber' defaultMessage='Lot Number' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  <FormattedMessage id='order.assignLots.header.total' defaultMessage='Total' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  <FormattedMessage id='order.assignLots.header.available' defaultMessage='Available' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  <FormattedMessage id='order.assignLots.header.allocated' defaultMessage='Allocated' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  <FormattedMessage id='order.assignLots.header.mfgDate' defaultMessage='MFG Date' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  <FormattedMessage id='order.assignLots.header.expirationDate' defaultMessage='Expiration Date' />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  <FormattedMessage id='order.assignLots.header.cOfA' defaultMessage='C of A' />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <FieldArray
                name={`tabLots[${tabIndex}].lots`}
                render={arrayHelpers => (
                  <>
                    {lots.map((lot, index) => (
                      <Table.Row key={lot.lotNumber}>
                        <Table.Cell>
                          <Input
                            name={`tabLots[${tabIndex}].lots[${index}].amount`}
                            inputProps={{ type: 'hidden', defaultValue: orderItem.amount }}
                          />
                          <Checkbox
                            name={`tabLots[${tabIndex}].lots[${index}].selected`}
                            value={lot.lotNumber}
                            inputProps={{
                              onClick: (e, { checked }) => {
                                setFieldValue(`tabLots[${tabIndex}].lots[${index}].selected`, checked)
                                const stateAllocated = state.allocated
                                const stateAvailability = state.poLots
                                const needAmount = (
                                  orderItem.amount - stateAllocated[tabIndex] > 0
                                    ? orderItem.amount - stateAllocated[tabIndex]
                                    : 0
                                )
                                if (checked) {
                                  const available = parseInt(
                                    state.poLots
                                      .find(poLot => poLot.id === values.tabLots[tabIndex].productOfferId)
                                      .lots.find(lot => lot.id === values.tabLots[tabIndex].lots[index].id).available
                                  )
                                  const allocated = available > needAmount ? needAmount : available
                                  setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, allocated)
                                  stateAllocated[tabIndex] += allocated

                                  const newAvailability = stateAvailability.map(po => {
                                    if (po.id === orderItem.productOffer) {
                                      return {
                                        id: po.id,
                                        lots: po.lots.map(pLot => {
                                          if (pLot.id === values.tabLots[tabIndex].lots[index].id) {
                                            return {
                                              id: pLot.id,
                                              available: pLot.available - allocated
                                            }
                                          } else {
                                            return pLot
                                          }
                                        })
                                      }
                                    } else {
                                      return po
                                    }
                                  })

                                  setState({ ...state, poLots: newAvailability, allocated: stateAllocated })
                                } else {
                                  const allocated = values.tabLots[tabIndex].lots[index].allocated
                                  setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, 0)
                                  stateAllocated[tabIndex] -= allocated

                                  const newAvailability = stateAvailability.map(po => {
                                    if (po.id === orderItem.productOffer) {
                                      return {
                                        id: po.id,
                                        lots: po.lots.map(pLot => {
                                          if (pLot.id === values.tabLots[tabIndex].lots[index].id) {
                                            return {
                                              id: pLot.id,
                                              available: parseInt(pLot.available + allocated)
                                            }
                                          } else {
                                            return pLot
                                          }
                                        })
                                      }
                                    } else {
                                      return po
                                    }
                                  })

                                  setState({ ...state, poLots: newAvailability, allocated: stateAllocated })
                                }
                              },
                              id: `tab${tabIndex}_lot${index}`
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell>{lot.lotNumber}</Table.Cell>
                        <Table.Cell textAlign='center'>{lot.total}</Table.Cell>
                        <Table.Cell textAlign='center'>
                          {getSafe(() => tabAvailability.find(avLot => avLot.id === lot.id).available, 0)}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Input
                            name={`tabLots[${tabIndex}].lots[${index}].allocated`}
                            inputProps={{
                              type: 'number',
                              readOnly: getSafe(() => values.tabLots[tabIndex].lots[index].selected, false)
                                ? false
                                : true,
                              defaultValue: lot.allocated,
                              onChange: (e, { value }) => {
                                const origValue = value
                                value = parseInt(value)
                                if (!Number.isInteger(value) || (Number.isInteger(value) && value < 0)) {
                                  setFieldValue(
                                    `tabLots[${tabIndex}].lots[${index}].allocated`,
                                    values.tabLots[tabIndex].lots[index].allocated
                                  )
                                  value = values.tabLots[tabIndex].lots[index].allocated
                                }

                                // manage allocated values
                                let stateAllocated = state.allocated
                                const allocNow = (value - values.tabLots[tabIndex].lots[index].allocated)
                                const available = state.poLots
                                  .find(poLot => poLot.id === values.tabLots[tabIndex].productOfferId)
                                  .lots.find(lot => lot.id === values.tabLots[tabIndex].lots[index].id).available
                                if (allocNow > available) {
                                  setFieldValue(
                                    `tabLots[${tabIndex}].lots[${index}].allocated`,
                                    values.tabLots[tabIndex].lots[index].allocated
                                  )
                                } else {
                                  stateAllocated[tabIndex] += allocNow

                                  // manage availability
                                  let stateAvailability = state.poLots
                                  const newAvailability = stateAvailability.map(po => {
                                    if (po.id === orderItem.productOffer) {
                                      return {
                                        id: po.id,
                                        lots: po.lots.map(pLot => {
                                          if (pLot.id === values.tabLots[tabIndex].lots[index].id) {
                                            return {
                                              id: pLot.id,
                                              available: pLot.available - allocNow
                                            }
                                          } else {
                                            return pLot
                                          }
                                        })
                                      }
                                    } else {
                                      return po
                                    }
                                  })

                                  // fix value
                                  if (origValue !== '' + value) {
                                    setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, value + 1)
                                    setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, value)
                                  }

                                  setState({ ...state, poLots: newAvailability, allocated: stateAllocated })
                                }
                              }
                            }}
                          />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {getSafe(
                            () => (
                              <FormattedDate value={lot.mfgDate.split('T')[0]} />
                            ),
                            'N/A'
                          )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          {getSafe(
                            () => (
                              <FormattedDate value={lot.expirationDate.split('T')[0]} />
                            ),
                            'N/A'
                          )}
                        </Table.Cell>
                        <Table.Cell textAlign='center'>
                          <UploadAttachment
                            {...props}
                            removeAttachment={fileId => removeAttachment(fileId, { values, setFieldValue })}
                            attachments={getSafe(
                              () => values.tabLots[tabIndex].lots[index].attachments,
                              lot.attachments
                            )}
                            name={`tabLots[${tabIndex}].lots[${index}].attachments`}
                            type={1}
                            lot={lot}
                            filesLimit={1}
                            fileMaxSize={20}
                            onChange={files =>
                              linkAttachment(lot.id, files, {
                                values,
                                setFieldValue,
                                lotNumber: lot.lotNumber,
                                productOfferId: orderItem.productOffer
                              })
                            }
                            data-test={`assign_lots_${index}_attachments`}
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
            <Button basic fluid onClick={() => props.closeAssignLots()}>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
            </Button>
          </Grid.Column>
          <Grid.Column floated='right' width={3}>
            <Button primary fluid>
              <FormattedMessage id='order.assignLots' defaultMessage='Assign Lots' tagName='span' />
            </Button>
          </Grid.Column>
        </Grid>
      </LotsTab>
    )
  }


  const { orderId, orderItems, intl, poLots } = props

  let { formatMessage } = intl

  const tabLots = orderItems.map(orderItem => {
    const productOffer = poLots.find(po => po.id === orderItem.productOffer)
    return {
      orderItemId: orderItem.id,
      productOfferId: orderItem.productOffer,
      lots: getSafe(
        () =>
          productOffer.lots.map(lot => {
            const lotSelected = orderItem.lots.find(orderLot => orderLot.lotNumber === lot.lotNumber)
            return {
              ...lot,
              selected: lotSelected ? true : false,
              allocated: lotSelected ? lotSelected.amount : 0,
              amount: orderItem.amount
            }
          }),
        []
      )
    }
  })

  const lotsList = { tabLots }

  return (
    <>
      <Modal closeIcon onClose={() => props.closeAssignLots()} open={true}>
        <Modal.Header>
          <FormattedMessage id='order.actionRequired' defaultMessage='Action Required' />
          <Subtitle as='h4'>
            <FormattedMessage
              id='order.assignLots.subtitle'
              defaultMessage='Assign lots and upload C of A for Sales Order #'
            />
            {orderId}
          </Subtitle>
        </Modal.Header>
        <ModalBody>
          <Modal.Description>
            <Form
              enableReinitialize
              validateOnChange={false}
              initialValues={{ ...initValues, ...lotsList }}
              validationSchema={validationScheme}
              onSubmit={(values, actions) => {
                const tabLots = values.tabLots

                // check that all tabs have selected at least one lot
                const missingLots = values.tabLots.find(
                  tab => typeof tab.lots.find(lot => lot.selected) === 'undefined'
                )
                if (missingLots) {
                  actions.setSubmitting(false)
                  return false
                }

                // check if any selected and allocated lot is without file
                const missingFile = !!values.tabLots.find(tab =>
                  tab.lots.find(lot => lot.selected && lot.allocated && lot.attachments.length === 0)
                )

                const orderItemId = props.orderItems[state.activeTab].id

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
                      await props
                        .assignLots(orderId, tabLots)
                        .then(r => {
                          actions.setSubmitting(false)
                          props.closeAssignLots()
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
                  props
                    .assignLots(orderId, tabLots)
                    .then(r => {
                      actions.setSubmitting(false)
                      props.closeAssignLots()
                    })
                    .catch(e => {
                      actions.setSubmitting(false)
                    })
                }
              }}
              className='flex stretched'
              style={{ padding: '0' }}>
              {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
                const panes = orderItems.map((orderItem, index) => {
                  return {
                    menuItem: (
                      <Menu.Item
                        key={`orderItem${index}`}
                        onClick={(e, { index }) => {
                          validateForm()
                            .then(r => {
                              // stop when errors found on current tab
                              if (Object.keys(r).length && getSafe(() => !!r.tabLots[state.activeTab], false)) {
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
                        data-test={`order_assign_lots_tab${index}`}>
                        <FormattedMessage
                          id='order.assignLots.orderItem'
                          defaultMessage='Order Item {num}'
                          values={{ num: index + 1 }}
                        />
                      </Menu.Item>
                    ),
                    pane: () => renderTab(index, orderItem, tabLots[index].lots, setFieldValue, values)
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
    </>
  )
}

export default injectIntl(AssignLots)
