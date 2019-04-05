import React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Modal, FormGroup, Search, Label } from "semantic-ui-react"

import { closeEditPopup, handleSubmitProductEditPopup } from "../../actions"
import { Form, Input, Button } from "formik-semantic-ui"
import * as Yup from "yup"

const formValidation = Yup.object().shape({
  productName: Yup.string()
    .min(3, "Too short")
    .required("Required"),
  productNumber: Yup.string()
    .min(1, "Too short")
    .required("Required"),
  packagingType: Yup.string()
    .min(1, "Too short")
    .required("Required"),
  packagingSize: Yup.string()
    .min(1, "Too short")
    .required("Required")
})

const resultRenderer = ({ casProduct }) => <Label content={casProduct} />

class AddNewUsersPopup extends React.Component {
  constructor(props) {
    super(props)
    this.source = { ...this.props.productsCatalogRows }
  }
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" })

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.casProduct })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.casProduct)

      this.setState({
        isLoading: false,
        results: _.filter(this.source, isMatch)
      })
    }, 300)
  }

  render() {
    const {
      closeEditPopup,
      handleSubmitProductEditPopup,
      popupValues
    } = this.props
    const { isLoading, results, value } = this.state
    const initialFormValues = {
      ...popupValues
    }

    return (
      <Modal open centered={false}>
        <Modal.Header>Edit product catalog</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeEditPopup}
            onSubmit={(values, actions) => {
              const newValue = { ...values, value }
              handleSubmitProductEditPopup(newValue, popupValues.id)
              actions.setSubmitting(false)
            }}
          >
            <FormGroup widths="equal">
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                {...this.props}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Product Name" name="productName" />
              <Input type="text" label="Product Number" name="productNumber" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Packaging Type" name="packagingType" />
              <Input type="text" label="Packaging Size" name="packagingSize" />
            </FormGroup>
            <div style={{ textAlign: "right" }}>
              <Button.Reset onClick={closeEditPopup}>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeEditPopup,
  handleSubmitProductEditPopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    productsCatalogRows: state.settings.productsCatalogRows
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewUsersPopup)
