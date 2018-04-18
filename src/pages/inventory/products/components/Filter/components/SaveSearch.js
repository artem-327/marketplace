import React, {Component} from 'react';
import filterEye from '../../../../../../images/filter-eye.png'

class SaveSearch extends Component {

    changeSaveSearchAlerts() {
        this.props.onClick()
    }

    render() {
        return (
            <div className="row filter-set-alerts-div" style={ { display: "block", marginTop: "15px"}}>
                <div className="row filter-another-row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                                  <span className="set-alert-title">
                                     Save Search
                                  </span>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-9">
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1">
                        <img alt="Filter" src={filterEye}/>
                    </div>
                </div>
                <div className="row filter-set-alerts-form">
                    <div className="col-lg-9 col-md-12 col-sm-12">
                        <div className="filter-contact-info">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Enter search name here ..."/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12">
                        <div className="row" style={{marginRight:"0px"}}>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <button className="filter-set-alerts-popup" onClick={() => {this.changeSaveSearchAlerts()}}>Cancel</button>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <button className="filter-save-search-popup">SAVE SEARCH</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SaveSearch