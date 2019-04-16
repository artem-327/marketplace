import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closePopup } from '../../actions'
import { Form, Input, Button, Checkbox } from 'formik-semantic-ui'
import * as Yup from 'yup'

const initialFormValues = {
  name: '',
  nacdMember: false,
  phone: '',
  website: ''
}

const formValidation = Yup.object().shape({
  name: Yup.string().min(2, 'Name should has at least 2 characters').required(),
  nacdMember: Yup.bool().required(),
  phone: Yup.string().min(9, 'Enter valid phone number').required(),
  website: Yup.string().required()
})

class AddNewPopupCasProducts extends React.Component {
  
  componentDidMount() {
    
  }

  render() {
    const {
      closePopup,
      popupValues,
      config,
    } = this.props

    return (
      <Modal open centered={false} size="small">
        <Modal.Header>Add { config.addEditText }</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{...initialFormValues, ...popupValues}}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={(values, actions) => {
              console.log(values)
            }}
          >
            <FormGroup widths="equal">
              <Input label="Company name" name="name" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input label="Phone Number" name="phone" />
              <Input label="Web" name="website" />
            </FormGroup>
            <FormGroup widths="equal">
              <Checkbox label="NACD Member" name="nacdMember" />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Button.Reset>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup
}

const mapStateToProps = ({admin}) => {
  return {
    ...admin,
    config: admin.config[admin.currentTab]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPopupCasProducts)