import React, { Component } from 'react'
import PropTypes from "prop-types";
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Button from '../../../../components/Button/Button'
import Spinner from '../../../../components/Spinner/Spinner'
import "./MerchantDetail.css"

class MerchantDetail extends Component {


  render() {
    const { merchantDetail, detailIsFetching } = this.props;
    if (detailIsFetching || !merchantDetail) return <Spinner />;
    return (
      <div className="merchant-detail">
        <div>{merchantDetail.firstname}</div>
        <div>{merchantDetail.middlename}</div>
        <div>{merchantDetail.lastname}</div>
        <div>{merchantDetail.email}</div>
        <div>OFFICE:</div>
        <div>{merchantDetail.officeResponse && merchantDetail.officeResponse.location.country}</div>
        <div>{merchantDetail.officeResponse && merchantDetail.officeResponse.location.state}</div>
        <div>Approved
        <Checkbox name='approved' defaultValue={merchantDetail.approved} onChange={value => {console.log(value)}} />
        </div> 
        <footer className="add-cart-footer">
          <Button color="grey">Delete</Button>
          <Button color="blue">Edit</Button>
        </footer>
      </div>
    )
  }
}


export default MerchantDetail;
