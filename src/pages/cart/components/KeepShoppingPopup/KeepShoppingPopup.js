import React, {Component} from 'react'
import {func, bool, node} from 'prop-types'
import {Modal, Button} from 'semantic-ui-react'

export default class KeepShopping extends Component {
  render() {
    let {handleClose, handleContinue, trigger, open} = this.props

    return (
      <Modal closeIcon size='small' onClose={handleClose} open={open} centered={false} trigger={trigger}>
        <Modal.Header as='h1'>KEEP SHOPPING?</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>You can only add items from the same merchant and same location to a single purchase order.</div>
            <div>Would you like to continue?</div>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={handleClose} primary data-test='cart_keep_shopping_close_btn'>
            Cancel
          </Button>
          <Button onClick={handleContinue} positive data-test='cart_keep_shopping_continue_btn'>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

KeepShopping.propTypes = {
  handleClose: func,
  handleContinue: func,
  open: bool,
  removePopup: func,
  trigger: node
}
