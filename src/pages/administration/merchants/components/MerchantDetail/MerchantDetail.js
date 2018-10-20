import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../../../../components/Checkbox/Checkbox'
import Button from '../../../../../components/Button/Button'
import Spinner from '../../../../../components/Spinner/Spinner'
import PopupComponent from '../../../../../components/PopUp/PopupComponent'
import InputControlled from '../../../../../components/InputControlled/InputControlled'
import './MerchantDetail.css'

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
    const {merchantDetail, fetchMerchant, id} = this.props
    if (merchantDetail.id !== id) {
      new Promise((resolve, reject) => {
        fetchMerchant(id, resolve)
      }).then(() => {
        this.setState({...this.props.merchantDetail})
      })
    } else {
      this.setState({...this.props.merchantDetail})
    }
  }

  render() {
    const {merchantDetail, isFetching, id, removePopup, editMerchant, removeMerchant} = this.props;
    const editBody = {
      id: id,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      middlename: this.state.middlename,
      approved: this.state.approved
    }
    if (isFetching) return <Spinner />
    return (
      <PopupComponent removePopup={removePopup} headerTitle="Merchant Detail">
        <div className="add-cart-body">
          <div className="add-cart-body-section">
            <div>MERCHANT DETAIL:</div>
            <div>
              <InputControlled value={this.state.firstname} handleChange={this.handleChange} name="firstname" />
            </div>
            <div>
              <InputControlled value={this.state.middlename} handleChange={this.handleChange} name="middlename" />
            </div>
            <div>
              <InputControlled value={this.state.lastname} handleChange={this.handleChange} name="lastname" />
            </div>
            <div>
              <InputControlled value={this.state.email} handleChange={this.handleChange} name="email" />
            </div>
            <div>OFFICE:</div>
            <div>
              <InputControlled
                value={this.state.officeResponse.location.country}
                handleChange={this.handleChange}
                name="country"
                disabled={true}
              />
            </div>
            <div>
              <InputControlled
                value={this.state.officeResponse.location.state}
                handleChange={this.handleChange}
                name="state"
                disabled={true}
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
              />
            </div>
            <footer className="add-cart-footer">
              <Button color="grey" onClick={() => this.props.removeMerchant(id)}>
                Delete
              </Button>
              <Button color="blue" onClick={() => this.props.editMerchant(editBody)}>
                Edit
              </Button>
            </footer>
          </div>
        </div>
      </PopupComponent>
    )
  }
}

export default MerchantDetail
