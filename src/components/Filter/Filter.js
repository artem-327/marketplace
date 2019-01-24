import {Form} from 'react-redux-form';
import './filter.css';
import classnames from 'classnames';
import FilterGroup from './components/FilterGroup';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {filterNonEmptyAttributes} from "../../utils/functions";
import SavedFilters from "./components/SavedFilters/SavedFilters";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {FormattedMessage, injectIntl} from 'react-intl';

class Filter extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            saveFilter: false,
            filterSwitch: true,
            filterName: "",
        }
    }

    handleSubmit(inputs){
        let filter = Object.assign({}, inputs,
            {pckgs : Object.entries(inputs.pckgs || {}).filter(([key, value]) => value).map(([key]) => key)},
            {cndt: Object.entries(inputs.cndt || {}).filter(([key, value]) => value).map(([key]) => key)},
            {grade: Object.entries(inputs.grade || {}).filter(([key, value]) => value).map(([key]) => key)},
            {frm: Object.entries(inputs.frm || {}).filter(([key, value]) => value).map(([key]) => key)});

        let params = filterNonEmptyAttributes(filter);
        this.props.filterFunc(params);
        let filterTags = [];
        for(let tag in params) filterTags.push({name: tag, value: params[tag]})
        this.props.addFilterTag(filterTags);
        this.props.toggleFilter();
        this.switchFilter(true)
    }

    handleReset(e){
        e.preventDefault();
        this.props.resetForm('forms.filter');
        this.props.filterFunc({});
        this.props.addFilterTag([]);
    }

    componentDidMount() {
        this.props.fetchProductConditions();
        this.props.fetchProductForms();
        this.props.fetchPackagingTypes();
        this.props.fetchWarehouseDistances();
        this.props.fetchProductGrade();
    }

    deleteSaveFilter(id){
        this.props.deleteSaveFilter(id).then(()=>this.props.fetchSavedFilters())

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isOpen: nextProps.isOpen
        })
    }

    changeFilterName(e){
        this.setState({filterName: e.target.value})
    }

    switchFilter(value){
        this.setState({filterSwitch: value})
    }

    saveFilters(){
        let inputs = this.props.filterData;
        let filter = Object.assign({},inputs,
            {containers: Object.entries(inputs.pckgs || {}).filter(([key, value]) => value).map(([key]) => key)},
            {conditions: Object.entries(inputs.cndt || {}).filter(([key, value]) => value).map(([key]) => key)},
            {forms: Object.entries(inputs.frm || {}).filter(([key, value]) => value).map(([key]) => key)},
            {filterName: this.state.filterName},
            {quantityFrom: (inputs.qntylb || "")},
            {quantityTo: (inputs.qntyub || "")},
            {priceFrom: (inputs.prclb || "")},
            {priceTo: (inputs.prcub || "")},
            {chemicalName: (inputs.search || "")}
        );
        this.props.saveSaveFilter(filter).then(()=>this.setState({saveFilter:true}));
    }

    render() {
    let saveFilter = this.state.saveFilter ?
        <span
            className="savedButton"
            onClick={()=>this.saveFilters()}>
                <FormattedMessage
                    id='filter.saved'
                    defaultMessage='Saved'
                />
        </span>
        :
        <span
            className="saveButton"
            onClick={()=>this.saveFilters()}>
            <FormattedMessage
                id='global.save'
                defaultMessage='Save'
            />
        </span>;
    return this.state.isOpen ?
        <div className="filter">
            <div className="filter-switch">
                <span
                    className={"set-filters" + classnames({' active' : !this.state.filterSwitch})}
                    onClick={()=>this.switchFilter(true)}>
                        <FormattedMessage
                            id='filter.setFilters'
                            defaultMessage='SET FILTERS'
                        />
                </span>
                <span
                    className={"saved-filters" + classnames({' active' : this.state.filterSwitch})}
                    onClick={()=>this.switchFilter(false)}>
                    <FormattedMessage
                        id='filter.savedFilter'
                        defaultMessage='SAVED FILTERS'
                    />
                </span>
            </div>
            {this.state.filterSwitch ?
                <Form
                    model="forms.filter"
                    onSubmit={(val) => this.handleSubmit(val)}>
                        <PerfectScrollbar>
                            <FilterGroup className="filterGroup"
                                         header='chemicalType'
                                         isVisible={!!this.props.chemicalName}
                                         data={this.props.filterData}
                                         isOpen={this.props.filterGroupStatus.chemName}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('chemName', value)}}
                                         inputs={[
                                             {
                                                 label: 'ChemicalNameCAS',
                                                 model: '.search',
                                                 type: 'text',
                                             }
                                         ]}/>
                            <FilterGroup className="filterGroup"
                                         isVisible={!!this.props.quantity}
                                         isOpen={this.props.filterGroupStatus.quantity}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('quantity', value)}}
                                         header='quantity'
                                         data={this.props.filterData}
                                         split
                                         inputs={[
                                             {
                                                 label: 'FromQuantity',
                                                 model: '.qntylb',
                                                 type: 'number',
                                                 placeholder: '0'
                                             },
                                             {
                                                 label: 'ToQuantity',
                                                 model: '.qntyub',
                                                 type: 'number',
                                                 placeholder: '0'
                                             }
                                         ]}/>
                            <FilterGroup className="filterGroup"
                                         header='price'
                                         split
                                         isVisible={!!this.props.price}
                                         data={this.props.filterData}
                                         isOpen={this.props.filterGroupStatus.price}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('price', value)}}
                                         inputs={[
                                             {
                                                 label: 'FromPrice',
                                                 model: '.prclb',
                                                 type: 'number',
                                                 placeholder: '0'
                                             },
                                             {
                                                 label: 'ToPrice',
                                                 model: '.prcub',
                                                 type: 'number',
                                                 placeholder: '0'
                                             }
                                         ]}/>
                            <FilterGroup className="filterGroup"
                                         header='packaging'
                                         isVisible={!!this.props.package}
                                         split
                                         data={this.props.filterData}
                                         isOpen={this.props.filterGroupStatus.packaging}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('packaging', value)}}
                                         checkboxModel='pckgs'
                                         inputs={this.props.packagingTypes.map(packagingType => ({
                                             label: packagingType.name,
                                             type: 'checkbox',
                                             id: packagingType.id,
                                             model: `.pckgs[${packagingType.id}]`
                                         }))}/>
                            <FilterGroup className="filterGroup"
                                        header='grade'
                                        isVisible={!!this.props.productGrade}
                                        split
                                        data={this.props.filterData}
                                        isOpen={this.props.filterGroupStatus.productGrade}
                                        onOpen={(value)=>{this.props.toggleFilterGroup('productGrade', value)}}
                                        checkboxModel='grade'
                                        inputs={this.props.productGradeTypes.map(productGradeType => ({
                                            label: productGradeType.name,
                                            type: 'checkbox',
                                            id: productGradeType.id,
                                            model: `.grade[${productGradeType.id}]`
                                        }))}/>
                            <FilterGroup className="filterGroup"
                                         header='condition'
                                         isVisible={!!this.props.condition}
                                         split
                                         data={this.props.productConditions}
                                         isOpen={this.props.filterGroupStatus.condition}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('condition', value)}}
                                         checkboxModel='cndt'
                                         inputs={this.props.productConditions.map(condition => ({
                                             label: condition.name,
                                             type: 'checkbox',
                                             id: condition.id,
                                             model: `.cndt[${condition.id}]`
                                         }))}/>
                            <FilterGroup className="filterGroup"
                                         header='form'
                                         isVisible={!!this.props.form}
                                         split
                                         data={this.props.productForms}
                                         isOpen={this.props.filterGroupStatus.form}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('form', value)}}
                                         checkboxModel='frm'
                                         inputs={this.props.productForms.map(form => (
                                             {
                                                 label: form.name,
                                                 type: 'checkbox',
                                                 id: form.id,
                                                 model: `.frm[${form.id}]`
                                            }
                                         ))}
                            />


                            <FilterGroup className="filterGroup"
                                         header='chemicalSearch'
                                         isVisible={!!this.props.chemicalSearch}
                                         data={this.props.filterData}
                                         isOpen={this.props.filterGroupStatus.chemSearch}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('chemSearch', value)}}
                                         inputs={[
                                             {
                                                 label: 'ChemicalSearch',
                                                 model: '.chemSearch',
                                                 type: 'text',
                                             }
                                         ]}/>
                            {/*Product Age and Location do not show on page*/}
                            <FilterGroup className="filterGroup"
                                         header='productAge'
                                         isVisible={!!this.props.productsAge}
                                         split
                                         data={this.props.filterData}
                                         isOpen={this.props.filterGroupStatus.productAge}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('productAge', value)}}
                                         dispatch={this.props.dispatch}
                                         inputs={[
                                             {
                                                 model: 'forms.filter.data.productAge',
                                                 type: 'radio',
                                             }
                                         ]}/>
                            <FilterGroup className="filterGroup"
                                         header='location'
                                         isVisible={!!this.props.loc}
                                         data={this.props.filterData}
                                         isOpen={this.props.filterGroupStatus.loc}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('loc', value)}}
                                         dispatch={this.props.dispatch}
                                         inputs={[
                                             {
                                                 label: 'Max. miles away',
                                                 model: 'forms.filter.data.loc',
                                                 type: 'dropdown',
                                             }
                                         ]}/>
                            <FilterGroup className="filterGroup"
                                         header='expiration'
                                         split
                                         isVisible={!!this.props.date}
                                         data={this.props.filterData}
                                         isOpen={this.props.filterGroupStatus.date}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('date', value)}}
                                         dispatch={this.props.dispatch}
                                         inputs={[
                                             {
                                                 label: 'From',
                                                 model: '.agelb',
                                                 type: 'date',
                                             },
                                             {
                                                 label: 'To',
                                                 model: '.ageub',
                                                 type: 'date',
                                             }
                                         ]}/>
                            <FilterGroup className="filterGroup"
                                         isVisible={!!this.props.assay}
                                         isOpen={this.props.filterGroupStatus.assay}
                                         onOpen={(value)=>{this.props.toggleFilterGroup('assay', value)}}
                                         header='Assay'
                                         data={this.props.filterData}
                                         split
                                         inputs={[
                                             {
                                                 label: 'Minimum(%)',
                                                 model: '.assaylb',
                                                 type: 'assay',
                                                 placeholder: '0'
                                             },
                                             {
                                                 label: 'Maximum(%)',
                                                 model: '.assayub',
                                                 type: 'assay',
                                                 placeholder: '0',
                                                 bigger:true
                                             }
                                         ]}/>
                            <div className="save-filter">
                                <div className="header">
                                    <FormattedMessage
                                        id='filter.saveFilter'
                                        defaultMessage='Save Filter'
                                    />
                                </div>
                                <div className='filter-input-text'>
                                    <label className="input-label">
                                        <FormattedMessage
                                            id='filter.enterFilterName'
                                            defaultMessage='Enter Filter Name'
                                        />
                                    </label>
                                    <React.Fragment>
                                        <input
                                            type="text"
                                            onChange={(e)=>this.changeFilterName(e)}
                                            placeholder={this.props.intl.formatMessage({
                                                id: 'filter.setFilterName',
                                                defaultMessage: 'Set Filter Name'
                                            })}
                                            className="input"
                                            value={this.state.filterName}/>
                                        {saveFilter}
                                    </React.Fragment>
                                </div>
                            </div>
                        </PerfectScrollbar>

                        <div className="filterBottom">
                            <button className='button filter-button'>
                                <FormattedMessage
                                    id='global.apply'
                                    defaultMessage='Apply'
                                />
                            </button>
                            <button
                                className='button disabled filter-button'
                                onClick={(e)=>{this.handleReset(e)}}>
                                    <FormattedMessage
                                        id='filter.clearFilter'
                                        defaultMessage='Clear Filter'
                                    />
                            </button>
                        </div>
                    </Form>
                :
                <SavedFilters
                    fetchSavedFilters={this.props.fetchSavedFilters}
                    deleteSaveFilter={(id) => this.deleteSaveFilter(id)}
                    fillFilter={(inputs) => this.props.fillFilter(inputs)}
                    filterFunc={(inputs) => this.handleSubmit(inputs)}
                    saveFilters={this.props.saveFilters}
                />
            }
        </div>
        : null;

    }
}

Filter.propTypes = {
    filterFunc: PropTypes.func,
};


export default injectIntl(Filter);
