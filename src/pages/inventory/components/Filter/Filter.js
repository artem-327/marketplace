import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Motion, spring } from "react-motion"

// import {scrollToComponent} from '../../utils/scroll'

import './filter.css'
import lessFilter from '../../../../images/less_filter.png'
import moreFilter from '../../../../images/more_filter.png'
import filterEye from '../../../../images/filter-eye.png'

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScreenBig: true,
            advancedFilter : false,
            setAlerts : false,
            saveSearch :false
        }
    }

    handleResize() {
        if(window.innerWidth < 1025) {
            this.setState({isScreenBig: false})
        } else {
            this.setState({isScreenBig: true});
        }
    }

    changeFilter() {
        let { advancedFilter } = this.state;
        this.setState({
            advancedFilter: !advancedFilter
        });
    }

    changeSetAlerts() {
        let { setAlerts } = this.state;
        this.setState({
            setAlerts: !setAlerts
        });
    }

    changeSaveSearchAlerts() {
        let { saveSearch } = this.state;
        this.setState({
            saveSearch: !saveSearch
        });
    }

    componentWillMount() {
        this.handleResize();
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }


    render() {
        const { advancedFilter,isScreenBig ,setAlerts, saveSearch} = this.state;

        const set_alerts_style = setAlerts ? {
            display: "block",
            marginTop: "15px"
        } :
        {
            display: "none"
        };

        const set_save_search_style = saveSearch ? { display: "block", marginTop: "15px"} : { display: "none"};


        const small_filter_input = isScreenBig ? "row small-inputs" :  "row" ;

        let set_alert_component = <div className="row filter-set-alerts-div" style={set_alerts_style}>
            <div className="row filter-another-row">
                <div className="col-lg-2 col-md-2 col-sm-2">
                              <span className="set-alert-title">
                                 Set Alerts
                              </span>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9">
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1">
                    <img src={filterEye}/>
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
        </div>;

        let save_search_component = <div className="row filter-set-alerts-div" style={set_save_search_style}>
            <div className="row filter-another-row">
                <div className="col-lg-2 col-md-2 col-sm-2">
                      <span className="set-alert-title">
                         Save Search
                      </span>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9">
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1">
                    <img src={filterEye}/>
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
                            <button className="filter-set-alerts" onClick={() => {this.changeSaveSearchAlerts()}}>Cancel</button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <button className="filter-save-search">SAVE SEARCH</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>;


        let filter =
            advancedFilter ?
            <div>
                <div className="row">
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <input placeholder="Chemical name or CAS #"></input>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <div className={small_filter_input}>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <input placeholder="Qty from"></input>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <input placeholder="Qty to"></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <div className={small_filter_input}>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <input placeholder="$ from"></input>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <input placeholder="$ to"></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <div className={small_filter_input}>
                            <div className="col-lg-5 col-md-5 col-sm-12">
                                <input placeholder="100 mi."></input>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-12">
                                <span className="filter-of-description">OF</span>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <input placeholder="95472"></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <select className="form-control filter-select">
                            <option>Packaging</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <select className="form-control filter-select">
                            <option>Grade</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>

                </div>
                <div className="row filter-another-row">
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <select className="form-control filter-select">
                            <option>Forms</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <select className="form-control filter-select">
                            <option>Conditions</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <select className="form-control filter-select">
                            <option>Origin</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <select className="form-control filter-select" >
                            <option>Manufacturer</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <button className="filter-set-alerts" onClick={() => {this.changeSetAlerts()}}>SET ALERTS</button>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <button className="filter-save-search" onClick={() => {this.changeSaveSearchAlerts()}}>SAVE SEARCH</button>
                    </div>
                </div>
                {set_alert_component}
                {save_search_component}
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                       <img className="more-filters-button" src={lessFilter} onClick={() => {this.changeFilter()}}/>
                    </div>
                </div>
            </div>
            :
                <div>
                    <div className="row">
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <input placeholder="Chemical name or CAS #"></input>
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <div className={small_filter_input}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <input placeholder="Qty from"></input>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <input placeholder="Qty to"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <div className={small_filter_input}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <input placeholder="$ from"></input>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <input placeholder="$ to"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <div className={small_filter_input}>
                                <div className="col-lg-5 col-md-5 col-sm-12">
                                    <input placeholder="100 mi."></input>
                                </div>
                                <div className="col-lg-1 col-md-1 col-sm-12">
                                    <span className="filter-of-description">OF</span>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <input placeholder="95472"></input>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <button className="filter-set-alerts" onClick={() => {this.changeSetAlerts()}}>SET ALERTS</button>
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <button className="filter-save-search" onClick={() => {this.changeSaveSearchAlerts()}}>SAVE SEARCH</button>
                        </div>
                    </div>
                    {set_alert_component}
                    {save_search_component}
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <img className="more-filters-button" src={moreFilter} onClick={() => {this.changeFilter()}}/>
                        </div>
                    </div>
                </div>;

        return (
            <nav className="App-filter">
                {filter}
                <div className="clearfix"> </div>
            </nav>
        );
    }
}

export default Filter;