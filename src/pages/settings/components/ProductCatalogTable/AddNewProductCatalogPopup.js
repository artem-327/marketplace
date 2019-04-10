// import React from 'react'
// import { connect } from 'react-redux'
// import { Control, Form } from 'react-redux-form'

// import { closeAddPopup, getProductsWithRequiredParam, postNewProductRequest } from '../../actions'

// class AddNewProductCatalogPopup extends React.Component {
//   state = {
//     searchProductInputValue: '',
//     productName: '',
//     productNumber: '',
//     productId: '',
//     packagingTypeInputValue: '',
//     packagingSize: '',
//     packagingTypes: [
//       {name: 'gallons'},
//       {name: 'kilograms'},
//       {name: 'liters'},
//       {name:'milliliters'},
//       {name: 'pounds'}
//     ],
//     packagingTypeSelectIsOpen: false
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if(this.state.searchProductInputValue !== prevState.searchProductInputValue) {
//       if(this.state.searchProductInputValue.length < 3) return;
//       this.props.getProductsWithRequiredParam(this.state.searchProductInputValue)
//     }
//   }

//   handleSearchInputValue = e => {
//     this.setState({
//       searchProductInputValue: e.target.value
//     })
//   }

//   handleProductInputsValue = stateKey => e => {
//     this.setState({
//       [stateKey]: e.target.value
//     })
//   }

//   handleChosenProduct = (e) => {
//     const targetId = Number(e.target.getAttribute('data-id'))
//     this.props.editPopupSearchProducts.forEach(item => {
//       if(item.id === targetId){
//         return this.setState({
//           productId: item.productId
//         })
//       }
//     })
//   }

//   handleProductsRequest = e => {
//     if (e.target.value.length < 3) return;
//     this.props.getProductsWithRequiredParam(e.target.value)
//   }

//   setCurrentPackagingTypeValue = e => {
//     this.setState({
//       packagingTypeInputValue: e.target.innerText
//     })
//   }

//   popupPackagingIsOpenHandler = () => {
//     this.setState({
//       packagingTypeSelectIsOpen: !this.state.packagingTypeSelectIsOpen
//     })
//   }

//   render() {
//     const { closeAddPopup, handleSubmitEditPopup, popupValues, editPopupSearchProducts } = this.props
//     // const { handleEditPopup, postNewProductRequest, popupValues, editPopupSearchProducts } = this.props
//     const {
//       productName,
//       productNumber,
//       productId,
//       packagingTypeInputValue,
//       packagingTypes,
//       packagingSize,
//       searchProductInputValue
//     } = this.state

//     return (
//       <div className="popup-wrapper col-xs-10 center-xs">
//         <Form
//           model="forms.settingsPopup.newProduct"
//           onSubmit={ value => postNewProductRequest(value, productId) }
//           className="b-popup col-xs-8"
//         >
//           <h2>{'Warehouse'} Profile</h2>
//           <ul className="">
//             <li className="inputs-wrapper">
//               <label className="b-product-search settings-popup-label" htmlFor="product-search">
//                 CAS Number / Product Search
//                 <input
//                   className="popup-input"
//                   id="product-search"
//                   value={ searchProductInputValue }
//                   onChange={ e => this.handleSearchInputValue(e) || this.handleProductsRequest(e) }
//                   autoComplete="off"
//                 />
//                 {
//                   editPopupSearchProducts.length !== 0 ?
//                   <ul className="b-product-search__found-products">
//                     {
//                       editPopupSearchProducts.map(product => {
//                         return (
//                           <li
//                             className="product-item"
//                             value={ product.productName }
//                             key={ product.id }
//                             data-id={ product.id }
//                             onClick={ e => this.handleChosenProduct(e) }
//                           >
//                             { product.productName }
//                           </li>
//                         )
//                       })
//                     }
//                   </ul>
//                   : null
//                 }
//               </label>
//             </li>
//             <li className="inputs-wrapper">
//               <label className="settings-popup-label name" htmlFor="product-name">
//                 Product Name
//                 <Control.text model=".productName" className="popup-input" id="product-name" value={ productName } onChange={ this.handleProductInputsValue('productName') } />
//               </label>
//               <label className="settings-popup-label address" htmlFor="product-number">
//                 Product Number
//                 <Control.text model=".productNumber" className="popup-input" id="product-number" value={ productNumber } onChange={ this.handleProductInputsValue('productNumber') } />
//               </label>
//               {/* <label className="settings-popup-label city" htmlFor="product-id">
//                 Product ID
//                 <Control.text model=".accountNumber" className="popup-input" id="product-id" value={ productId } onChange={ this.handleProductInputsValue('productId') } />
//               </label> */}
//             </li>
//             <li className="inputs-wrapper">
//               <label className="settings-popup-label packaging-type" htmlFor="product-packaging-type">
//                 Packaging Type
//                 <Control.text
//                   model=".packagingType"
//                   className="popup-input"
//                   id="product-packaging-type"
//                   autoComplete="off"
//                   value={ packagingTypeInputValue }
//                   onClick={ this.popupPackagingIsOpenHandler }
//                   placeholder="Select"
//                 />
//                 {
//                   this.state.packagingTypeSelectIsOpen ?
//                     <ul className='dropdown-packaging-types' style={{ height: 39 * packagingTypes.length }}>
//                         {
//                           this.state.packagingTypes.map((unit, index) => {
//                             return (
//                               <li
//                                 key={ index }
//                                 onClick={ (e) => this.setCurrentPackagingTypeValue(e) }
//                                 value={ unit.name }
//                               >
//                                 { unit.name }
//                               </li>
//                             )
//                           })
//                         }
//                     </ul>
//                   : null
//                 }
//               </label>
//               <label className="settings-popup-label zip-code" htmlFor="product-packaging-size">
//                 Packaging Size
//                 <Control.text model=".packagingSize" className="popup-input" id="product-packaging-size" value={ packagingSize } onChange={ this.handleProductInputsValue('packagingSize') } />
//               </label>
//             </li>
//             <li className="inputs-wrapper buttons-wrapper">
//               <input
//                 type="button"
//                 value="Cancel"
//                 onClick={ closeAddPopup }
//                 className="cancel-popup-btn"
//               />
//               <button type="submit" className="submit-popup-btn" >Save</button>
//             </li>
//           </ul>
//         </Form>
//       </div>
//     )
//   }
// }

// const mapDispatchToProps = {
//   closeAddPopup,
//   postNewProductRequest,
//   getProductsWithRequiredParam
// }

// const mapStateToProps = state => {
//   return {
//     popupValues: state.settings.popupValues,
//     editPopupSearchProducts: state.settings.editPopupSearchProducts
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AddNewProductCatalogPopup)

import React from "react"
import { connect } from "react-redux"
import filter from "lodash/filter"
import escapeRegExp from "lodash/escapeRegExp"
import debounce from "lodash/debounce"

import { Modal, FormGroup, Search, Label } from "semantic-ui-react"

import { closeAddPopup, handleSubmitProductEddPopup } from "../../actions"
import { Form, Input, Button, Dropdown } from "formik-semantic-ui"
import * as Yup from "yup"
import "./styles.scss"

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

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" })

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.casProduct })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      // if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(escapeRegExp(this.state.value), "i")
      const isMatch = result => re.test(result.casProduct)

      this.setState({
        isLoading: false,
        results: filter(this.handleCasProduct(), isMatch)
      })
    }, 300)
  }

  render() {
    const {
      closeAddPopup,
      handleSubmitProductEddPopup,
      popupValues
    } = this.props
    const { isLoading, results, value } = this.state
    // const initialFormValues = {
    //   ...popupValues
    // }
    console.log(this.state)

    return (
      <Modal open centered={false}>
        <Modal.Header>Add product catalog</Modal.Header>
        <Modal.Content>
          <Form
            // initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              console.log("value", value)
              handleSubmitProductEddPopup({
                ...values,
                casProduct: value
              })
              actions.setSubmitting(false)
            }}
          >
            {/* <FormGroup widths="equal">
              <Input
                type="text"
                label="CAS Number / Product Search"
                name="casNumber"
              />
            </FormGroup> */}
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
                options={[
                  { text: "gallons", value: "gallons" },
                  { text: "kilograms", value: "kilograms" },
                  { text: "liters", value: "liters" },
                  { text: "milliliters", value: "milliliters" },
                  { text: "pounds", value: "pounds" }
                ]}
              />
              <Input type="text" label="Packaging Size" name="packagingSize" />
            </FormGroup>
            <div style={{ textAlign: "right" }}>
              <Button.Reset onClick={closeAddPopup}>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeAddPopup,
  handleSubmitProductEddPopup
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
