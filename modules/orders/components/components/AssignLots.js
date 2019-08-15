import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import * as Actions from "../../actions"
import { Modal, Table, Grid, Button, Checkbox } from "semantic-ui-react"
import { FormattedMessage } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { FormattedDate } from 'react-intl'

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
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Lot Number</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Total</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Available</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Allocated</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>MFG Date</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Expiration Date</Table.HeaderCell>
                    <Table.HeaderCell textAlign='right'>C of A</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {lots.map(lot => (
                    <Table.Row key={lot.lotNumber}>
                      <Table.Cell>
                        <Checkbox key={lot.lotNumber} value={lot.lotNumber} onClick={(e, {checked}) => checked ? this.selectLot(lot.lotNumber) : this.unselectLot(lot.lotNumber)} />
                      </Table.Cell>
                      <Table.Cell>{lot.lotNumber}</Table.Cell>
                      <Table.Cell textAlign='center'>{lot.total}</Table.Cell>
                      <Table.Cell textAlign='center'>{lot.available}</Table.Cell>
                      <Table.Cell textAlign='center'>{lot.allocated}</Table.Cell>
                      <Table.Cell textAlign='center'>{getSafe(() => <FormattedDate value={lot.mfgDate.split('T')[0]} />, 'N/A')}</Table.Cell>
                      <Table.Cell textAlign='center'>{getSafe(() => <FormattedDate value={lot.expirationDate.split('T')[0]} />, 'N/A')}</Table.Cell>
                      <Table.Cell textAlign='right'>{lot.cOfA}</Table.Cell>
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
                  <Button primary fluid onClick={() => this.props.assignLots(orderId, orderItemId, [{lotNumber: this.state.selectedLots[0], quantity: amount}])}>
                    <FormattedMessage id='order.assignLots' defaultMessage='Assign Lots' />
                  </Button>
                </Grid.Column>
              </Grid>
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
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignLots)
