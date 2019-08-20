import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as Actions from "../../actions"
import { loadFile, addAttachment} from "~/modules/inventory/actions"
import { Modal, Table, Grid, Header, Button, Segment } from "semantic-ui-react"
import { Form, Input, Checkbox } from 'formik-semantic-ui'
import { FieldArray } from 'formik'
import { getSafe } from '~/utils/functions'
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import confirm from '~/src/components/Confirmable/confirm'
import styled from 'styled-components'
import * as val from 'yup'

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

const validationScheme = val.object().shape({
  lots: val.array().of(val.object().shape({
    selected: val.bool()
  }))
})

class AssignLots extends React.Component {

  componentDidMount() {
    const { productOfferId } = this.props

    if (productOfferId)
      this.props.loadLotsToAssign(productOfferId)
  }

  render() {
    const { lots, amount, orderId, orderItemId, intl } = this.props
    const lotsList = {
      lots: lots
    }

    let { formatMessage } = intl

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
              <Form
                enableReinitialize
                validateOnChange={false}
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
                                        <Checkbox key={lot.lotNumber}
                                                  name={`lots[${index}].selected`}
                                                  value={lot.lotNumber}
                                                  inputProps={{onClick: (e, {checked}) => setFieldValue(`lots[${index}].selected`, checked)/*checked ? this.selectLot(lot.lotNumber) : this.unselectLot(lot.lotNumber)*/}} />
                                      </Table.Cell>
                                      <Table.Cell>{lot.lotNumber}</Table.Cell>
                                      <Table.Cell textAlign='center'>{lot.total}</Table.Cell>
                                      <Table.Cell textAlign='center'>{lot.available}</Table.Cell>
                                      <Table.Cell textAlign='center'><Input name={`lots[${index}].allocated`} inputProps={{ disabled: getSafe(() => values.lots[index].selected, false) ? false : true, defaultValue: lot.allocated }} /></Table.Cell>
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
    amount: getSafe(() => detail.orderItems[0].amount, 0),
    lots: getSafe(() => detail.lots, []),
    orderId: detail.id,
    orderItemId: getSafe(() => detail.orderItems[0].id, 0),
    //pkgSize: getSafe(() => detail.orderItems[0].packagingSize, 0),
    productOfferId: getSafe(() => detail.orderItems[0].productOffer, 0)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions, loadFile, addAttachment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AssignLots))
