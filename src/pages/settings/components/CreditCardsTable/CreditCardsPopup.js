import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  handlerSubmitWarehouseEditPopup,
  postNewCreditCardRequest
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'

const formValidation = Yup.object().shape({
  cardNumber: Yup.string()
    .min(16, 'Too short')
    .required('Required')
})

class CreditCardsPopup extends React.Component {
  // submitHandler = (values, actions) => {
  //   if (this.props.popupValues) {
  //     this.props.handlerSubmitWarehouseEditPopup(
  //       {
  //         ...values,
  //         tab: this.props.currentTab === 'Bank accounts' ? 'bank' : null
  //       },
  //       this.props.popupValues.branchId
  //     )
  //   } else {
  //     this.props.postNewWarehouseRequest({
  //       ...values,
  //       tab: this.props.currentTab === 'Bank accounts' ? 'bank' : null
  //     })
  //   }
  //   actions.setSubmitting(false)
  // }

  getInitialFormValues = () => {
    return {
      cardNumber: '',
      cvc: '',
      expirationMonth: '',
      expirationYear: ''
    }
  }

  render() {
    const {
      closePopup,
      popupValues,
      currentTab,
      postNewCreditCardRequest
    } = this.props
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false}>
        <Modal.Header>
          {`${title} `} {currentTab}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={postNewCreditCardRequest}
          >
            <FormGroup widths="equal">
              <Input type="text" label="Card Number" name="cardNumber" />
              <Input type="text" label="CVC" name="cvc" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input
                type="text"
                label="Expiration Month"
                name="expirationMonth"
              />
              <Input
                type="text"
                label="Expiration Year"
                name="expirationYear"
              />
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closePopup}>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  postNewCreditCardRequest,
  handlerSubmitWarehouseEditPopup,
  closePopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    currentTab: state.settings.currentTab
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreditCardsPopup)
