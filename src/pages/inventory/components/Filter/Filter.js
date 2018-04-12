import React, {Component} from 'react';


import './filter.css'
import lessFilter from '../../../../images/less_filter.png'
import moreFilter from '../../../../images/more_filter.png'
import SetAlerts from './components/SetAlerts'
import SaveSearch from './components/SaveSearch'
import FilterInput from './components/FilterInput'

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

        const small_filter_input = isScreenBig ? "row small-inputs" :  "row" ;

        let set_alert_component = setAlerts? <SetAlerts onClick={()=>{this.changeSetAlerts()}}/> : '';

        let save_search_component = saveSearch ? <SaveSearch onClick={()=>{this.changeSaveSearchAlerts()}}/> : '';


        let filter =
            advancedFilter ?
            <div>
                <div className="row">
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <FilterInput placeholder="Chemical name or CAS #"/>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <div className={small_filter_input}>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <FilterInput placeholder="Qty from"/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <FilterInput placeholder="Qty to"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <div className={small_filter_input}>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <FilterInput placeholder="$ from"/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <FilterInput placeholder="$ to"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-12 col-sm-12">
                        <div className={small_filter_input}>
                            <div className="col-lg-5 col-md-5 col-sm-12">
                                <FilterInput placeholder="100 mi."/>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-12">
                                <span className="filter-of-description">OF</span>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12">
                                <FilterInput placeholder="95472"/>
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
                       <img alt="more-filters" className="more-filters-button" src={lessFilter} onClick={() => {this.changeFilter()}}/>
                    </div>
                </div>
            </div>
            :
                <div>
                    <div className="row">
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <FilterInput placeholder="Chemical name or CAS #"/>
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <div className={small_filter_input}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <FilterInput placeholder="Qty from"/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <FilterInput placeholder="Qty to"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <div className={small_filter_input}>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <FilterInput placeholder="$ from"/>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <FilterInput placeholder="$ to"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-12 col-sm-12">
                            <div className={small_filter_input}>
                                <div className="col-lg-5 col-md-5 col-sm-12">
                                    <FilterInput placeholder="100 mi."/>
                                </div>
                                <div className="col-lg-1 col-md-1 col-sm-12">
                                    <span className="filter-of-description">OF</span>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12">
                                    <FilterInput placeholder="95472"/>
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
                            <img alt="more-filters" className="more-filters-button" src={moreFilter} onClick={() => {this.changeFilter()}}/>
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