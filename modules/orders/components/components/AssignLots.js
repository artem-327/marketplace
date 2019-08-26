import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as Actions from "../../actions"
import { loadFile, addAttachment} from "~/modules/inventory/actions"
import { Modal, ModalContent, Table, Grid, Header, Button, Segment, Tab, TabPane, Menu } from "semantic-ui-react"
import { Form, Input, Checkbox } from 'formik-semantic-ui'
import { FieldArray } from 'formik'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import confirm from '~/src/components/Confirmable/confirm'
import styled from 'styled-components'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import { withToastManager } from 'react-toast-notifications'

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
  tabLots: [{
    orderItemId: 0,
    lots: []
  }]
}

val.addMethod(val.object, 'lessThanOrdered', function (propertyName, message) {
  return this.test('lessThan', message, function (value) {
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
        message,
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
    const allocated = options.reduce(function(allocated, option) {
      allocated += option.allocated
      return allocated
    }, 0)

    if (allocated > amount) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message,
      })
    }

    return true
  })
})

const validationScheme = val.object().shape({
  tabLots: val.array().of(val.object().shape({
    orderItemId: val.number(),
    lots: val.array().of(val.object().lessThanOrdered('allocated', errorMessages.lessThanOrdered).moreThanOrdered('allocated', errorMessages.moreThanOrdered).shape({
      allocated: val.number(errorMessages.mustBeNumber).min(0).required(errorMessages.requiredMessage),
      amount: val.number(), // helper for allocated validation
      selected: val.bool()
    }))
  }))
})

class AssignLots extends React.Component {
  state = {
    activeTab: 0,
    allocated: [],
    poLots: []
  }

  componentDidMount() {
    const { orderItems } = this.props

    if (getSafe(() => orderItems.length, 0)) {
      let allocated = this.state.allocated
      let alreadyLoadedLots = []
      orderItems.forEach(orderItem => {
        const sumAllocated = orderItem.lots.reduce(function(sum, lot) {
          return sum + lot.amount
        }, 0)
        allocated.push(sumAllocated)
        if (!alreadyLoadedLots.includes(orderItem.productOffer)) {
          this.props.loadLotsToAssign(orderItem.productOffer)
          alreadyLoadedLots.push(orderItem.productOffer)
        }
      })
      this.setState({ allocated: allocated })
    }
  }

  linkAttachment = (lotId, files, data) => {
    const { values, setFieldValue, lotNumber, productOfferId } = data
    this.props.linkAttachment(lotId, files).then(r => {
      const affectedOrderItems = values.tabLots.forEach((tab, tabIndex) => {
        if (tab.productOfferId === productOfferId) {
          const lotIndex = tab.lots.findIndex(lot => lot.lotNumber === lotNumber)
          const attachments = values.tabLots[tabIndex].lots[lotIndex].attachments
          setFieldValue(`tabLots[${tabIndex}].lots[${lotIndex}].attachments[${attachments.length ? attachments.length : 0}]`, {
            id: r.value.file.id,
            name: r.value.file.name,
            linked: true
          })
        }
      })
    })
  }

  removeAttachment = (fileId, data) => {
    const { values, setFieldValue } = data
    values.tabLots.forEach((tab, tabIndex) => {
      const lotIndex = tab.lots.findIndex(lot => getSafe(() => lot.attachments[0].id, 0) === fileId)
      if (lotIndex) {
        setFieldValue(`tabLots[${tabIndex}].lots[${lotIndex}].attachments`, [])
      }
    })
    this.props.removeAttachment(fileId)
  }

  renderTab(tabIndex, orderItem, lots, setFieldValue, values) {
    const { poLots } = this.props

    if (!getSafe(() => poLots.length, 0))
      return (<></>)

    return (
      <LotsTab active={this.state.activeTab === tabIndex}>
        <TableWrapper>
          <Table className='table-fields basic'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell><FormattedMessage id='order.assignLots.header.lotNumber' defaultMessage='Lot Number' /></Table.HeaderCell>
                <Table.HeaderCell textAlign='center'><FormattedMessage id='order.assignLots.header.total' defaultMessage='Total' /></Table.HeaderCell>
                <Table.HeaderCell textAlign='center'><FormattedMessage id='order.assignLots.header.available' defaultMessage='Available' /></Table.HeaderCell>
                <Table.HeaderCell textAlign='center'><FormattedMessage id='order.assignLots.header.allocated' defaultMessage='Allocated' /></Table.HeaderCell>
                <Table.HeaderCell textAlign='center'><FormattedMessage id='order.assignLots.header.mfgDate' defaultMessage='MFG Date' /></Table.HeaderCell>
                <Table.HeaderCell textAlign='center'><FormattedMessage id='order.assignLots.header.expirationDate' defaultMessage='Expiration Date' /></Table.HeaderCell>
                <Table.HeaderCell textAlign='center'><FormattedMessage id='order.assignLots.header.cOfA' defaultMessage='C of A' /></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Input name={`tabLots[${tabIndex}].orderItemId`} inputProps={{ type: 'hidden', defaultValue: orderItem.id }} />
              <Input name={`tabLots[${tabIndex}].productOfferId`} inputProps={{ type: 'hidden', defaultValue: orderItem.productOffer }} />
              <FieldArray
                name={`tabLots[${tabIndex}].lots`}
                render={arrayHelpers => (
                  <>
                    {lots.map((lot, index) => (
                      <Table.Row key={lot.lotNumber}>
                        <Table.Cell>
                          <Input name={`tabLots[${tabIndex}].lots[${index}].amount`} inputProps={{ type: 'hidden', defaultValue: orderItem.amount }} />
                          <Checkbox name={`tabLots[${tabIndex}].lots[${index}].selected`}
                                    value={lot.lotNumber}
                                    inputProps={{
                                      onClick: (e, {checked}) => {
                                        setFieldValue(`tabLots[${tabIndex}].lots[${index}].selected`, checked)
                                        const stateAllocated = this.state.allocated
                                        const needAmount = ((orderItem.amount - stateAllocated[tabIndex]) > 0 ? orderItem.amount - stateAllocated[tabIndex] : 0)
                                        if (checked) {
                                          const allocated = values.tabLots[tabIndex].lots[index].available > needAmount ? needAmount : values.tabLots[tabIndex].lots[index].available
                                          setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, allocated)
                                          stateAllocated[tabIndex] += allocated
                                          this.setState({ allocated: stateAllocated })
                                        } else {
                                          const allocated = values.tabLots[tabIndex].lots[index].allocated
                                          setFieldValue(`tabLots[${tabIndex}].lots[${index}].allocated`, 0)
                                          stateAllocated[tabIndex] -= allocated
                                          this.setState({ allocated: stateAllocated })
                                        }
                                      },
                                      id: `tab${tabIndex}_lot${index}`
                                    }} />
                        </Table.Cell>
                        <Table.Cell>{lot.lotNumber}</Table.Cell>
                        <Table.Cell textAlign='center'>{lot.total}</Table.Cell>
                        <Table.Cell textAlign='center'>{lot.available}</Table.Cell>
                        <Table.Cell textAlign='center'>
                          <Input name={`tabLots[${tabIndex}].lots[${index}].allocated`}
                                 inputProps={{
                                   type: 'number',
                                   min: 0,
                                   max: lot.available,
                                   readOnly: getSafe(() => values.tabLots[tabIndex].lots[index].selected, false) ? false : true,
                                   defaultValue: lot.allocated,
                                   onChange: (e, {value}) => {
                                     let stateAllocated = this.state.allocated
                                     stateAllocated[tabIndex] += (value - values.tabLots[tabIndex].lots[index].allocated)
                                     this.setState({allocated: stateAllocated })
                                   }
                                 }} />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>{getSafe(() => <FormattedDate value={lot.mfgDate.split('T')[0]} />, 'N/A')}</Table.Cell>
                        <Table.Cell textAlign='center'>{getSafe(() => <FormattedDate value={lot.expirationDate.split('T')[0]} />, 'N/A')}</Table.Cell>
                        <Table.Cell textAlign='center'>
                          <UploadLot {...this.props}
                                     removeAttachment={(fileId) => this.removeAttachment(fileId, {values, setFieldValue})}
                                     attachments={getSafe(() => values.tabLots[tabIndex].lots[index].attachments, lot.attachments)}
                                     name={`tabLots[${tabIndex}].lots[${index}].attachments`}
                                     type={1}
                                     lot={lot}
                                     filesLimit={1}
                                     fileMaxSize={20}
                                     onChange={(files) => this.linkAttachment(lot.id, files, {values, setFieldValue, lotNumber: lot.lotNumber, productOfferId: orderItem.productOffer})}
                                     data-test={`assign_lots_${index}_attachments`}
                                     emptyContent={(<FormattedMessage id='global.upUpload' defaultMessage='\u2191 upload' tagName='a' />)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </>
                )} />
            </Table.Body>
          </Table>
        </TableWrapper>
        <Grid>
          <Grid.Column width={10}></Grid.Column>
          <Grid.Column floated='right' width={3}>
            <Button basic fluid onClick={() => this.props.closeAssignLots()}>
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

  render() {
    const { orderId, orderItems, intl, toastManager, poLots } = this.props

    let { formatMessage } = intl

    const tabLots = orderItems.map(orderItem => {
      const productOffer = poLots.find(po => po.id === orderItem.productOffer)
      return {
        orderItemId: orderItem.id,
        productOfferId: orderItem.productOffer,
        lots: getSafe(() => productOffer.lots.map(lot => {
          const lotSelected = orderItem.lots.find(orderLot => orderLot.lotNumber === lot.lotNumber)
          return {
            ...lot,
            selected: lotSelected ? true : false,
            allocated: lotSelected ? lotSelected.amount : 0,
            amount: orderItem.amount
          }
        }), [])
      }
    })

    const lotsList = { tabLots }

    return (
      <>
        <Modal open={true}>
          <Modal.Header>
            <FormattedMessage id='order.actionRequired' defaultMessage='Action Required' />
            <Subtitle as='h4'>
              <FormattedMessage id='order.assignLots.subtitle' defaultMessage='Assign lots and upload C of A for Sales Order #' />{orderId}
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
                  const missingLots = values.tabLots.find(tab => (typeof tab.lots.find(lot => lot.selected) === 'undefined'))
                  if (missingLots) {
                    toastManager.add(generateToastMarkup(
                      <FormattedMessage id='errors.noLotsSelected.header' defaultMessage='No Lots Selected' />,
                      <FormattedMessage id='errors.noLotsSelected.content' defaultMessage='Please check that all order items have selected at least one lot.' />,
                    ), {
                      appearance: 'error'
                    })
                    actions.setSubmitting(false)
                    return false
                  }

                  // check if any selected and allocated lot is without file
                  const missingFile = !!values.tabLots.find(tab => (tab.lots.find(lot => (lot.selected && lot.allocated && lot.attachments.length === 0))))

                  const orderItemId = this.props.orderItems[this.state.activeTab].id

                  // confirm to assign when missing attachment(s) for assigned lot(s)
                  if (missingFile) {
                    confirm (
                      formatMessage({ id: 'confirm.missingCOfA.title', defaultMessage: 'Missing C of A' }),
                      formatMessage({
                        id: 'confirm.missingCOfA.content',
                        defaultMessage: 'You have allocated packages on lot without C of A document. Do you really want to proceed and assign lots?'
                      })
                    ).then(
                      async () => {
                        // confirm
                        await this.props.assignLots(orderId, tabLots).then(r => {
                          toastManager.add(generateToastMarkup(
                            <FormattedMessage id='order.assignLots.success.header' defaultMessage='Lots Assigned' />,
                            <FormattedMessage id='order.assignLots.success.content' defaultMessage='Selected Lots were assigned and available packages allocated' />,
                          ), {
                            appearance: 'success'
                          })
                          actions.setSubmitting(false)
                          this.props.closeAssignLots()
                        }).catch(e => {
                          actions.setSubmitting(false)
                        })
                      },
                      () => {
                        // cancel
                        actions.setSubmitting(false)
                      }
                    )
                  } else {
                    this.props.assignLots(orderId, tabLots).then(r => {
                      toastManager.add(generateToastMarkup(
                        <FormattedMessage id='order.assignLots.success.header' defaultMessage='Lots Assigned' />,
                        <FormattedMessage id='order.assignLots.success.content' defaultMessage='Selected Lots were assigned and available packages allocated' />,
                      ), {
                        appearance: 'success'
                      })
                      actions.setSubmitting(false)
                      this.props.closeAssignLots()
                    }).catch(e => {
                      actions.setSubmitting(false)
                    })
                  }
                }}
                className='flex stretched'
                style={{ padding: '0' }}
              >
                {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
                  const panes = orderItems.map((orderItem, index) => {
                    return {
                      menuItem: (
                        <Menu.Item key={`orderItem${index}`}
                                   onClick={(e, {index}) => {
                                     validateForm()
                                       .then(r => {
                                         // stop when errors found on current tab
                                         if (Object.keys(r).length && getSafe(() => !!r.tabLots[this.state.activeTab], false)) {
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
                                   data-test={`order_assign_lots_tab${index}`}>
                          <FormattedMessage id='order.assignLots.orderItem' defaultMessage='Order Item {num}' values={{num: index+1}} />
                        </Menu.Item>
                      ),
                      pane: () => this.renderTab(index, orderItem, tabLots[index].lots, setFieldValue, values)
                    }
                  })
                  return (
                    <TabMenu menu={{ secondary: true, pointing: true }} panes={panes} renderActiveOnly={false} activeIndex={this.state.activeTab} />
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
    poLots: getSafe(() => detail.poLots, []),
    orderId: detail.id,
    orderItems: detail.orderItems.map(orderItem => {
      return {
        id: orderItem.id,
        lots: orderItem.lots,
        amount: orderItem.amount,
        productOffer: orderItem.productOffer
      }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions, loadFile, addAttachment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(AssignLots)))
