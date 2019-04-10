import React from 'react'
import { connect } from 'react-redux'
import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'

import { Modal, FormGroup, Search, Label } from 'semantic-ui-react'

import { closePopup, handleSubmitProductEditPopup } from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import './styles.scss'

const formValidation = Yup.object().shape({
  productName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  productNumber: Yup.string()
    .min(1, 'Too short')
    .required('Required'),
  packagingType: Yup.string()
    .min(1, 'Too short')
    .required('Required'),
  packagingSize: Yup.string()
    .min(1, 'Too short')
    .required('Required')
})

const resultRenderer = ({ casProduct, id }) => (
  <Label content={casProduct} key={id} />
)

class AddNewUsersPopup extends React.Component {
  componentWillMount() {
    this.resetComponent()
  }

  handleCasProduct = () => {
    return this.props.productsCatalogRows.map(e => ({
      casProduct: e.casProduct
    }))
  }

  resetComponent = () => {
    const { popupValues } = this.props
    this.setState({
      isLoading: false,
      results: [],
      value: (popupValues && popupValues.casProduct.casNumber) || ''
    })
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.casProduct })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      // if (this.state.value.length < 1) return this.resetComponent()
      const re = new RegExp(escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.casProduct)

      this.setState({
        isLoading: false,
        results: filter(this.handleCasProduct(), isMatch)
      })
    }, 300)
  }

  render() {
    const {
      closePopup,
      handleSubmitProductEditPopup,
      popupValues,
      packagingType
    } = this.props
    console.log('popupValues', popupValues)
    const { isLoading, results, value } = this.state
    const initialFormValues = {
      ...popupValues,
      packagingType: ''
    }
    console.log('initialFormValues', initialFormValues)

    return (
      <Modal open centered={false}>
        <Modal.Header>Edit product catalog</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={(values, actions) => {
              console.log('values', values)
              handleSubmitProductEditPopup({
                ...values,
                casProduct: value,
                id: popupValues.id
              })
              actions.setSubmitting(false)
            }}
          >
            <FormGroup widths="equal" className="customFormGroup">
              <label>CAS Number / Product Search</label>
              <Search
                className="customSearch"
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Product Name" name="productName" />
              <Input type="text" label="Product Number" name="productNumber" />
            </FormGroup>
            <FormGroup widths="equal">
              <Dropdown
                label="Packaging Type"
                name="packagingType"
                options={packagingType}
              />
              <Input type="text" label="Packaging Size" name="packagingSize" />
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
  closePopup,
  handleSubmitProductEditPopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    productsCatalogRows: state.settings.productsCatalogRows,
    packagingType: state.settings.productsPackagingType
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewUsersPopup)
