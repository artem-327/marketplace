import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../../../../components/Checkbox/Checkbox'
import Button from '../../../../../components/Button/Button'
import Spinner from '../../../../../components/Spinner/Spinner'
import PopupComponent from '../../../../../components/PopUp/PopupComponent'
import InputControlled from '../../../../../components/InputControlled/InputControlled'

class MerchantDetail extends Component {
  state = {
    email: '',
    firstname: '',
    middlename: '',
    lastname: '',
    approved: false,
    officeResponse: {
      location: {
        country: '',
        state: ''
      }
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    const {merchantDetail, getMerchant, id} = this.props
    if (merchantDetail.id !== id) {
      new Promise((resolve) => {
        getMerchant(id, resolve)
      }).then(() => {
        this.setState({...this.props.merchantDetail})
      })
    } else {
      this.setState({...this.props.merchantDetail})
    }
  }

  render() {
    const {isFetching, id, removePopup, putMerchantEdit, deleteMerchant} = this.props;
    if (isFetching) return <Spinner />
    const editBody = {
      id: id,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      approved: this.state.approved
    }
    const footerComponent = (
      <React.Fragment>
        <Button color="red" onClick={() => deleteMerchant(id)} data-test='administration_merchant_detail_delete_btn'>
          Delete
        </Button>
        <Button color="blue" onClick={() => putMerchantEdit(editBody)} data-test='administration_merchant_detail_edit_btn'>
          Edit
        </Button>
      </React.Fragment>
    )
    return (
      <PopupComponent removePopup={removePopup} headerTitle="Merchant Detail" footerComponent={footerComponent}>
        <div className="add-cart-body">
          <div className="add-cart-body-section">
            <div>MERCHANT INFO:</div>
            <div>
              First Name: <InputControlled value={this.state.firstname} handleChange={this.handleChange} name="firstname" data-test='administration_merchant_detail_firstname_inp' />
            </div>
            <div>
              Middle Name: <InputControlled value={this.state.middlename} handleChange={this.handleChange} name="middlename" data-test='administration_merchant_detail_middlename_inp' />
            </div>
            <div>
              Last Name: <InputControlled value={this.state.lastname} handleChange={this.handleChange} name="lastname" data-test='administration_merchant_detail_lastname_inp' />
            </div>
            <div>
              Email: <InputControlled value={this.state.email} handleChange={this.handleChange} name="email" data-test='administration_merchant_detail_email_inp' />
            </div>
            <div>OFFICE:</div>
            <div>
              Country: <InputControlled
                value={this.state.officeResponse.location.country}
                handleChange={this.handleChange}
                name="country"
                disabled={true}
                data-test='administration_merchant_detail_country_inp'
              />
            </div>
            <div>
              State: <InputControlled
                value={this.state.officeResponse.location.state}
                handleChange={this.handleChange}
                name="state"
                disabled={true}
                data-test='administration_merchant_detail_state_inp'
              />
            </div>
            <div>
              <Checkbox
                label="Approved"
                name="approved"
                defaultValue={this.state.approved}
                onChange={value => {
                  console.log(value)
                }}
                data-test='administration_merchant_detail_approved_chckb'
              />
            </div>
          </div>
        </div>
      </PopupComponent>
    )
  }
}

export default MerchantDetail

MerchantDetail.propTypes = {
  isFetching:PropTypes.bool,
  id:PropTypes.number,
  removePopup:PropTypes.func,
  putMerchantEdit:PropTypes.func,
  deleteMerchant:PropTypes.func
};