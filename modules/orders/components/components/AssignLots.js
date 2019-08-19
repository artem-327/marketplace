import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as Actions from "../../actions"
import { loadFile, addAttachment} from "~/modules/inventory/actions"
import { Modal, Table, Grid, Header, Button } from "semantic-ui-react"
import { Form, Checkbox } from 'formik-semantic-ui'
import { FormattedMessage } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { FormattedDate } from 'react-intl'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import styled from 'styled-components'
import * as val from 'yup'

const Subtitle = styled(Header)`
  margin-top: 1em;
  font-weight: 400;
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

  state = {
    selectedLots: []
  }

  componentDidMount() {
    const { productOfferId } = this.props

    if (productOfferId)
      this.props.loadLotsToAssign(productOfferId)
  }

  selectLot = (lotNumber) => {
    let { selectedLots } = this.state
    if (!selectedLots.includes(lotNumber))
      selectedLots.push(lotNumber)

    this.setState({selectedLots: selectedLots})
  }

  unselectLot = (lotNumber) => {
    let { selectedLots } = this.state
    if (selectedLots.includes(lotNumber))
      selectedLots.splice(selectedLots.indexOf(lotNumber), 1)

    this.setState({selectedLots: selectedLots})
  }

  render() {
    const { lots, amount, orderId, orderItemId } = this.props
    const { selectedLots } = this.state

    return (
      <>
        <Modal open={true}>
          <Modal.Header>
            <FormattedMessage id='order.actionRequired' defaultMessage='Action Required' />
            <Subtitle as='h4'>
              <FormattedMessage id='order.assignLots.subtitle' defaultMessage='Assign lots and upload C of A for Sales Order #87663' />
            </Subtitle>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={false}
                initialValues={{ ...initValues }}
                validationSchema={validationScheme}
                onSubmit={(values, actions) => {}}
                className='flex stretched'
                style={{ padding: '0' }}
              >
                {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
                  return (
                    <>
                      <Table className='table-fields'>
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
                          {lots.map((lot, index) => (
                            <Table.Row key={lot.lotNumber}>
                              <Table.Cell>
                                <Checkbox key={lot.lotNumber}
                                          name={`lots[${lot.lotNumber}].selected`}
                                          value={lot.lotNumber}
                                          inputProps={{onClick: (e, {checked}) => checked ? this.selectLot(lot.lotNumber) : this.unselectLot(lot.lotNumber)}} />
                              </Table.Cell>
                              <Table.Cell>{lot.lotNumber}</Table.Cell>
                              <Table.Cell textAlign='center'>{lot.total}</Table.Cell>
                              <Table.Cell textAlign='center'>{lot.available}</Table.Cell>
                              <Table.Cell textAlign='center'>{lot.allocated}</Table.Cell>
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
                        </Table.Body>
                      </Table>
                      <Grid>
                        <Grid.Column width={10}></Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button basic fluid onClick={() => this.props.closeAssignLots()}>
                            <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                          </Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button primary fluid onClick={() => this.props.assignLots(orderId, orderItemId, [{lotNumber: this.state.selectedLots[0], pkgAmount: amount}])}>
                            <FormattedMessage id='order.assignLots' defaultMessage='Assign Lots' />
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

export default connect(mapStateToProps, mapDispatchToProps)(AssignLots)
