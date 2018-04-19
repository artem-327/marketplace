import React, {Component} from 'react';


import './filter.css'
import moreFilter from '../../../../../images/filter/more-filters.png'
import setAlertsIcon from '../../../../../images/filter/set-alerts.png'
import saveSearchIcon from '../../../../../images/filter/save-search.png'
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
                                <div className="filter-input-div smaller-lg-inputs col-lg-2 col-md-12 col-sm-12">
                                    <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.chemicalName') }/>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="filter-input-div col-lg-6 col-md-6 col-sm-6">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.QTYFrom') }/>
                                        </div>
                                        <div className="filter-input-div col-lg-6 col-md-6 col-sm-6">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.QTYTo') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="filter-input-div col-lg-6 col-md-6 col-sm-6">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.dollarFrom') }/>
                                        </div>
                                        <div className="filter-input-div col-lg-6 col-md-6 col-sm-6">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.dollarTo') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="col-lg-5 col-md-5 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.100mi') }/>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-12">
                                            <span className="filter-of-description">{ translate('inventoryPage.products.inventoryFilter.of') }</span>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.95472') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-input-div smaller-lg-inputs col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryPage.products.inventoryFilter.packing') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="filter-input-div smaller-lg-inputs col-lg-1 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryPage.products.inventoryFilter.grade') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="filter-input-div smaller-lg-inputs col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryPage.products.inventoryFilter.selectSavedSearch') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row filter-another-row">
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryPage.products.inventoryFilter.forms') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryPage.products.inventoryFilter.conditions') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryPage.products.inventoryFilter.origin') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryPage.products.inventoryFilter.manufacturers') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="filter-input-div col-lg-4 col-md-12 col-sm-12">
                                    <button className="filter-set-alerts" onClick={() => {
                                        this.changeSetAlerts()
                                    }}><img alt="set-alerts" src={setAlertsIcon} className="filter-button-image"/>{ translate('inventoryPage.products.inventoryFilter.setAlerts') }
                                    </button>
                                    <button className="filter-save-search" onClick={() => {
                                        this.changeSaveSearchAlerts()
                                    }}><img alt="save-search" src={saveSearchIcon} className="filter-button-image"/>{ translate('inventoryPage.products.inventoryFilter.saveSearch') }
                                    </button>
                                </div>
                            </div>
                            {set_alert_component}
                            {save_search_component}
                            <div className="row more-filters" onClick={() => {this.changeFilter()}}>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="more-filters-button">
                                        <img alt="more-filters" className="" src={moreFilter}
                                        />
                                        <Translate id="inventoryPage.products.inventoryFilter.lessFilters"/>
                                    </div>
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
                                <div className="filter-input-div smaller-lg-inputs col-lg-2 col-md-12 col-sm-12">
                                    <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.chemicalName') }/>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="filter-input-div col-lg-6 col-md-6 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.QTYFrom') }/>
                                        </div>
                                        <div className="filter-input-div col-lg-6 col-md-6 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.QTYTo') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="filter-input-div col-lg-6 col-md-6 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.dollarFrom') }/>
                                        </div>
                                        <div className="filter-input-div col-lg-6 col-md-6 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.dollarTo') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-input-div col-lg-2 col-md-12 col-sm-12">
                                    <div className={small_filter_input}>
                                        <div className="col-lg-5 col-md-5 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.100mi') }/>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-12">
                                            <span className="filter-of-description">{ translate('inventoryPage.products.inventoryFilter.of') }</span>
                                        </div>
                                        <div className="col-lg-4 col-md-4 col-sm-12">
                                            <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.95472') }/>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-input-div smaller-lg-inputs col-lg-2 col-md-12 col-sm-12">
                                    <select className="form-control filter-select">
                                        <option>{ translate('inventoryPage.products.inventoryFilter.selectSavedSearch') }</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div className="filter-input-div filter-buttons col-md-12 col-sm-12">
                                    <button className="filter-set-alerts" onClick={() => {
                                        this.changeSetAlerts()
                                    }}><img alt="set-alerts" src={setAlertsIcon} className="filter-button-image"/>{ translate('inventoryPage.products.inventoryFilter.setAlerts') }
                                    </button>
                                    <button className="filter-save-search" onClick={() => {
                                        this.changeSaveSearchAlerts()
                                    }}><img alt="save-search" src={saveSearchIcon} className="filter-button-image"/>{ translate('inventoryPage.products.inventoryFilter.saveSearch') }
                                    </button>
                                </div>
                            </div>
                            {set_alert_component}
                            {save_search_component}
                            <div className="row more-filters" onClick={() => {this.changeFilter()}}>
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="more-filters-button">
                                        <img alt="more-filters" className="" src={moreFilter}
                                             />
                                        <Translate id="inventoryPage.products.inventoryFilter.moreFilters"/>
                                    </div>
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