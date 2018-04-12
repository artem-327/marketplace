import React, {Component} from 'react';
import filterEye from '../../../../../images/filter-eye.png'

class SetAlerts extends Component {

    changeSetAlerts() {
        this.props.onChange()
    }

    render() {
        return (
            <div className="row filter-set-alerts-div" style={{ display: "block", marginTop: "15px"}}>
                <div className="row filter-another-row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                              <span className="set-alert-title">
                                 Set Alerts
                              </span>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9">
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1">
                        <img alt="Filter" src={filterEye}/>
                    </div>
                </div>
                <div className="row filter-set-alerts-form">
                    <div className="col-lg-3 col-md-12 col-sm-12">
                        <div className="set-alerts-select-method">
                            <div className="form-check form-check-inline">
                                <label className="form-check-label selected-method-title" htmlFor="inlineCheckbox1">SELECT METHOD:</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                                       value="option1"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox1">SMS</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox2"
                                       value="option2"/>
                                <label className="form-check-label" htmlFor="inlineCheckbox2">Email</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="inlineCheckbox3"
                                       value="option3" />
                                <label className="form-check-label" htmlFor="inlineCheckbox3">Platform</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="form-row filter-contact-info">
                            <label className="filter-contact-info-title">CONTACT INFO:</label>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Email address"/>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control"  placeholder="Phone number"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <button className="filter-set-alerts" onClick={() => {this.changeSetAlerts()}}>Cancel</button>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <button className="filter-save-search">SET ALERTS</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetAlerts