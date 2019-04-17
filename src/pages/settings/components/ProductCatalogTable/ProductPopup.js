import React from 'react'
import { connect } from 'react-redux'
import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'

import { Modal, FormGroup, Search, Label } from 'semantic-ui-react'

import {
  closePopup,
  handleSubmitProductEditPopup,
  handleSubmitProductEddPopup
} from '../../actions'
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
  packagingSize: Yup.string()
    .min(1, 'Too short')
    .required('Required')
})

const resultRenderer = ({ casProduct, id }) => (
  <Label content={casProduct} key={id} />
)
class ProductPopup extends React.Component {
  componentWillMount() {
    this.resetComponent()
  }

  handlerSubmit = (values, actions) => {
    const { popupValues } = this.props
    if (popupValues) {
      this.props.handleSubmitProductEditPopup({
        ...values,
        casProduct: this.state.value,
        unNumber: popupValues.unNumber,
        id: popupValues.id
      })
    } else {
      this.props.handleSubmitProductEddPopup({
        ...values,
        casProduct: this.state.value
      })
    }
    actions.setSubmitting(false)
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
      value: (popupValues && popupValues.casProduct) || ''
    })
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.casProduct })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.casProduct)

      this.setState({
        isLoading: false,
        results: filter(this.handleCasProduct(), isMatch)
      })
    }, 300)
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    const {
      casProduct = '',
      productName = '',
      productNumber = '',
      packagingSize = '',
      packageID = '',
      unitID = ''
    } = popupValues || {}
    return {
      casProduct,
      productName,
      productNumber,
      packagingSize,
      packageID,
      unitID
    }
  }

  render() {
    const {
      closePopup,
      packagingType,
      productsUnitsType,
      popupValues
    } = this.props
    const { isLoading, results, value } = this.state
    const title = popupValues ? 'Edit' : 'Add'

    return (
      <Modal open centered={false}>
        <Modal.Header>{title} product catalog</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.handlerSubmit}
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
                name="packageID"
                options={packagingType}
              />
              <Input type="text" label="Packaging Size" name="packagingSize" />
            </FormGroup>
            <FormGroup widths="equal">
              <Dropdown
                label="Units"
                name="unitID"
                options={productsUnitsType}
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
  closePopup,
  handleSubmitProductEditPopup,
  handleSubmitProductEddPopup
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    productsCatalogRows: state.settings.productsCatalogRows,
    packagingType: state.settings.productsPackagingType,
    productsUnitsType: state.settings.productsUnitsType
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPopup)
