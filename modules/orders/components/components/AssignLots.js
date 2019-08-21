import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as Actions from "../../actions"
import { loadFile, addAttachment} from "~/modules/inventory/actions"
import { Modal, Table, Grid, Header, Button, Segment, Tab, TabPane } from "semantic-ui-react"
import { Form, Input, Checkbox } from 'formik-semantic-ui'
import { FieldArray } from 'formik'
import { getSafe } from '~/utils/functions'
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import confirm from '~/src/components/Confirmable/confirm'
import styled from 'styled-components'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'

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
  lots: []
}

val.addMethod(val.object, 'lessThanOrdered', function (propertyName, message) {
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
  lots: val.array().of(val.object().lessThanOrdered('allocated', 'Less than ordered').moreThanOrdered('allocated', 'More than ordered').shape({
    allocated: val.number(errorMessages.mustBeNumber).min(0).required(errorMessages.requiredMessage),
    amount: val.number(), // helper for allocated validation
    selected: val.bool()
  }))
})

class AssignLots extends React.Component {
  state = {
    activeTab: 0,
    allocated: []
  }

  componentDidMount() {
    const { orderItems } = this.props

    if (getSafe(() => orderItems.length, 0)) {
      let allocated = this.state.allocated
      let alreadyLoadedLots = []
      orderItems.forEach(orderItem => {
        allocated.push(0)
        if (!alreadyLoadedLots.includes(orderItem.productOffer)) {
          this.props.loadLotsToAssign(orderItem.productOffer)
          alreadyLoadedLots.push(orderItem.productOffer)
        }
      })
      this.setState({ allocated: allocated })
    }
  }

  renderTab(tabIndex, orderItemId, productOfferId, tabAmount) {
    const { poLots, orderId, intl } = this.props

    let { formatMessage } = intl

    if (!getSafe(() => poLots.length, 0))
      return (<></>)

    const productOffer = poLots.find(po => po.id === productOfferId)

    const lots = productOffer.lots.map(lot => {
      return {
        ...lot,
        amount: tabAmount
      }
    })
    const lotsList = { lots }

    return (
      <LotsTab active={this.state.activeTab === tabIndex}>
        <Form
          enableReinitialize
          validateOnChange={true}
          initialValues={{ ...initValues, ...lotsList }}
          validationSchema={validationScheme}
          onSubmit={(values, actions) => {
            let missingFile = false
            const preparedLots = values.lots.reduce(function(filtered, lot) {
              if (lot.selected) {
                if (lot.attachments.length === 0)
                  missingFile = true

                filtered.push({ lotNumber: lot.lotNumber, pkgAmount: lot.allocated })
              }
              return filtered
            }, [])

            // confirm to assign when missing attachment(s) for assigned lot(s)
            if (missingFile) {
              confirm (
                formatMessage({ id: 'confirm.missingCOfA', defaultMessage: 'Missing C of A' }),
                formatMessage({
                  id: 'confirm.assignMisconfiguration',
                  defaultMessage: 'Selected lots should have uploaded C of A document. Do you really want to proceed and assign lots?'
                })
              ).then(
                () => {
                  // confirm
                  this.props.assignLots(orderId, orderItemId, preparedLots).then(r => {
                    actions.setSubmitting(false)
                    this.props.closeAssignLots()
                  })
                },
                () => {
                  // cancel
                  actions.setSubmitting(false)
                }
              )
            } else {
              this.props.assignLots(orderId, orderItemId, preparedLots).then(r => {
                actions.setSubmitting(false)
                this.props.closeAssignLots()
              })
            }
          }}
          className='flex stretched'
          style={{ padding: '0' }}
        >
          {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
            return (
              <>
                <TableWrapper>
                  <Table className='table-fields basic'>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Lot Number</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Total</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Available</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Allocated</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>MFG Date</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Expiration Date</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>C of A</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <FieldArray
                        name='lots'
                        render={arrayHelpers => (
                          <>
                            {lots.map((lot, index) => (
                              <Table.Row key={lot.lotNumber}>
                                <Table.Cell>
                                  <Input name={`lots[${index}].amount`} inputProps={{ type: 'hidden', defaultValue: tabAmount }} />
                                  <Checkbox key={lot.lotNumber}
                                            name={`lots[${index}].selected`}
                                            value={lot.lotNumber}
                                            inputProps={{
                                              onClick: (e, {checked}) => {
                                                setFieldValue(`lots[${index}].selected`, checked)
                                                const stateAllocated = this.state.allocated
                                                const needAmount = ((tabAmount - stateAllocated[tabIndex]) > 0 ? tabAmount - stateAllocated[tabIndex] : 0)
                                                if (checked) {
                                                  const allocated = values.lots[index].available > needAmount ? needAmount : values.lots[index].available
                                                  setFieldValue(`lots[${index}].allocated`, allocated)
                                                  stateAllocated[tabIndex] += allocated
                                                  this.setState({ allocated: stateAllocated })
                                                } else {
                                                  const allocated = values.lots[index].allocated
                                                  setFieldValue(`lots[${index}].allocated`, 0)
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
                                  <Input name={`lots[${index}].allocated`}
                                         inputProps={{
                                           type: 'number',
                                           min: 0,
                                           max: lot.available,
                                           readOnly: getSafe(() => values.lots[index].selected, false) ? false : true,
                                           defaultValue: lot.allocated,
                                           onChange: (e, {value}) => {
                                             let stateAllocated = this.state.allocated
                                             stateAllocated[tabIndex] += (value - values.lots[index].allocated)
                                             this.setState({allocated: stateAllocated })
                                           }
                                         }} />
                                </Table.Cell>
                                <Table.Cell textAlign='center'>{getSafe(() => <FormattedDate value={lot.mfgDate.split('T')[0]} />, 'N/A')}</Table.Cell>
                                <Table.Cell textAlign='center'>{getSafe(() => <FormattedDate value={lot.expirationDate.split('T')[0]} />, 'N/A')}</Table.Cell>
                                <Table.Cell textAlign='center'>
                                  <UploadLot {...this.props}
                                             attachments={lot.attachments}
                                             name={`lots[${index}].attachments`}
                                             type={1}
                                             lot={lot}
                                             filesLimit={1}
                                             fileMaxSize={20}
                                             onChange={(files) => this.props.linkAttachment(lot.id, files)}
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
              </>
            )
          }}
        </Form>
      </LotsTab>
    )
  }

  render() {
    const { lots, orderId, orderItems } = this.props
    const panes = orderItems.map((orderItem, index) => {
      return {
        menuItem: 'Order Item '+(index+1),
        pane: () => this.renderTab(index, orderItem.id, orderItem.productOffer, orderItem.amount)
      }
    })

    return (
      <>
        <Modal open={true}>
          <Modal.Header>
            <FormattedMessage id='order.actionRequired' defaultMessage='Action Required' />
            <Subtitle as='h4'>
              <FormattedMessage id='order.assignLots.subtitle' defaultMessage='Assign lots and upload C of A for Sales Order #' />{orderId}
            </Subtitle>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <TabMenu menu={{ secondary: true, pointing: true }} panes={panes} renderActiveOnly={false} activeIndex={this.state.activeTab} onTabChange={(e, {activeIndex}) => this.setState({ activeTab: activeIndex})} />
            </Modal.Description>
          </Modal.Content>
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
        amount: orderItem.amount,
        productOffer: orderItem.productOffer
      }
    })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions, loadFile, addAttachment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AssignLots))
