import React, {Component} from 'react';


import './filter.css'
import lessFilter from '../../../../images/less_filter.png'
import moreFilter from '../../../../images/more_filter.png'
import SetAlerts from './components/SetAlerts'
import SaveSearch from './components/SaveSearch'
import FilterInput from './components/FilterInput'
import { Translate } from 'react-localize-redux';

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
                <Translate>
                    {(translate) =>
                        <div>
                            <div className="row">
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <FilterInput placeholder={ translate('inventoryFilter.chemicalName') }/>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <FilterInput placeholder={ translate('inventoryFilter.QTYFrom') }/>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <FilterInput placeholder={ translate('inventoryFilter.QTYTo') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <FilterInput placeholder={ translate('inventoryFilter.dollarFrom') }/>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <FilterInput placeholder={ translate('inventoryFilter.dollarTo') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="col-lg-5 col-md-5 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryFilter.100mi') }/>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-12">
                                            <span className="filter-of-description">{ translate('inventoryFilter.of') }</span>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryFilter.95472') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryFilter.packing') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryFilter.grade') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>

                            </div>
                            <div className="row filter-another-row">
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryFilter.forms') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryFilter.conditions') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryFilter.origin') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryFilter.manufacturers') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <button className="filter-set-alerts" onClick={() => {
                                        this.changeSetAlerts()
                                    }}>{ translate('inventoryFilter.setAlerts') }
                                    </button>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <button className="filter-save-search" onClick={() => {
                                        this.changeSaveSearchAlerts()
                                    }}>{ translate('inventoryFilter.saveSearch') }
                                    </button>
                                </div>
                            </div>
                            {set_alert_component}
                            {save_search_component}
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <img alt="more-filters" className="more-filters-button" src={lessFilter}
                                         onClick={() => {
                                             this.changeFilter()
                                         }}/>
                                </div>
                            </div>
                        </div>
                    }
                </Translate>
            :
                <Translate>
                    {(translate) =>
                        <div>
                            <div className="row">
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <FilterInput placeholder={ translate('inventoryFilter.chemicalName') }/>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryFilter.QTYFrom') }/>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryFilter.QTYTo') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryFilter.dollarFrom') }/>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryFilter.dollarTo') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="col-lg-5 col-md-5 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryFilter.100mi') }/>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-12">
                                            <span className="filter-of-description">{ translate('inventoryFilter.of') }</span>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryFilter.95472') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <button className="filter-set-alerts" onClick={() => {
                                        this.changeSetAlerts()
                                    }}>{ translate('inventoryFilter.setAlerts') }
                                    </button>
                                </div>
                                <div className="col-lg-2 col-md-12 col-sm-12">
                                    <button className="filter-save-search" onClick={() => {
                                        this.changeSaveSearchAlerts()
                                    }}>{ translate('inventoryFilter.saveSearch') }
                                    </button>
                                </div>
                            </div>
                            {set_alert_component}
                            {save_search_component}
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <img alt="more-filters" className="more-filters-button" src={moreFilter}
                                         onClick={() => {
                                             this.changeFilter()
                                         }}/>
                                </div>
                            </div>
                        </div>
                    }
                </Translate>;

        return (
            <nav className="App-filter">
                {filter}
                <div className="clearfix"> </div>
            </nav>
        );
    }
}

export default Filter;