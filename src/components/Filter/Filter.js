import { Form } from 'react-redux-form'
import './filter.scss'

import FilterGroup from './components/FilterGroup'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { filterNonEmptyAttributes } from "../../utils/functions"
import SavedFilters from "./components/SavedFilters/SavedFilters"
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import { checkToken } from "../../utils/auth"

import { Segment, Accordion, Button, Grid, Sidebar, GridRow, GridColumn } from 'semantic-ui-react'

const FlexContent = styled.div`
  flex: 1;
  overflow-y: auto;
`

const RelaxedSegment = styled(Segment)`
  padding-top: 0px;
  margin: 0 !important;
`

const GrayRow = styled(GridRow)`
  background-color: #ededed;
`

class Filter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      saveFilter: false,
      filterSwitch: true,
      filterName: "",
      loaded: false
    }
  }


  getContent = () => {
    return (
      <div>


        <FilterGroup className="filterGroup"
          header='order'
          isVisible={!!this.props.orderId}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.orderId}
          onOpen={(value) => { this.props.toggleFilterGroup('orderId', value) }}
          inputs={[
            {
              label: 'orderId',
              model: '.orderId',
              type: 'text'
            }
          ]} />
        <FilterGroup className="filterGroup"
          header='orderDate'
          isVisible={!!this.props.orderDate}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.orderDate}
          onOpen={(value) => { this.props.toggleFilterGroup('orderDate', value) }}
          split
          inputs={[
            {
              label: 'orderFrom',
              model: '.orderFrom',
              type: 'date'
            }, {
              label: 'orderTo',
              model: '.orderTo',
              type: 'date'
            }
          ]} />
        <FilterGroup className="filterGroup"
          header='customer'
          isVisible={!!this.props.customer}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.customer}
          onOpen={(value) => { this.props.toggleFilterGroup('customer', value) }}
          inputs={[
            {
              label: 'customerName',
              model: '.customer',
              type: 'search',
              placeholder: '',
              search: this.props.searchCompany,
              data: this.props.searchedCompanies
            }
          ]} />
        <FilterGroup className="filterGroup"
          header='product'
          isVisible={!!this.props.product}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.product}
          onOpen={(value) => { this.props.toggleFilterGroup('product', value) }}
          inputs={[
            {
              label: 'productName',
              model: '.product',
              type: 'text'
            }
          ]} />
        <FilterGroup className="filterGroup"
          header='orderStatus'
          isVisible={!!this.props.orderStatus}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.orderStatus}
          onOpen={(value) => { this.props.toggleFilterGroup('orderStatus', value) }}
          dispatch={this.props.dispatch}
          inputs={[
            {
              label: 'orderStatus',
              model: '.status',
              type: 'dropdown',
              data: [
                { id: 'All', name: 'All' },
                { id: 'Pending', name: 'Pending' },
                { id: 'In Transit', name: 'In Transit' },
                { id: 'Review', name: 'Review' },
                { id: 'Credit', name: 'Credit' },
                { id: 'Completed', name: 'Completed' },
                { id: 'Returned', name: 'Returned' },
                { id: 'Declined', name: 'Declined' }
              ],
              filterValue: this.props.orderStatus && this.props.orderStatus.filterValue ? this.props.orderStatus.filterValue : null
            }
          ]} />
        <FilterGroup className="filterGroup"
          header='chemicalType'
          isVisible={!!this.props.chemicalName}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.chemName}
          onOpen={(value) => { this.props.toggleFilterGroup('chemName', value) }}
          inputs={[
            {
              label: 'ChemicalNameCAS',
              model: '.search',
              type: 'text',
            }
          ]} />
        <FilterGroup className="filterGroup"
          isVisible={!!this.props.quantity}
          isOpen={this.props.filterGroupStatus.quantity}
          onOpen={(value) => { this.props.toggleFilterGroup('quantity', value) }}
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
          ]} />
        <FilterGroup className="filterGroup"
          header='price'
          split
          isVisible={!!this.props.price}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.price}
          onOpen={(value) => { this.props.toggleFilterGroup('price', value) }}
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
          ]} />
        <FilterGroup className="filterGroup"
          header='packaging'
          isVisible={!!this.props.package}
          split
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.packaging}
          onOpen={(value) => { this.props.toggleFilterGroup('packaging', value) }}
          checkboxModel='pckgs'
          inputs={this.props.packagingTypes.map(packagingType => ({
            label: packagingType.name,
            type: 'checkbox',
            id: packagingType.id,
            model: `.pckgs[${packagingType.id}]`
          }))} />
        <FilterGroup className="filterGroup"
          header='grade'
          isVisible={!!this.props.productGrade}
          split
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.productGrade}
          onOpen={(value) => { this.props.toggleFilterGroup('productGrade', value) }}
          checkboxModel='grade'
          inputs={this.props.productGradeTypes.map(productGradeType => ({
            label: productGradeType.name,
            type: 'checkbox',
            id: productGradeType.id,
            model: `.grade[${productGradeType.id}]`
          }))} />
        <FilterGroup className="filterGroup"
          header='condition'
          isVisible={!!this.props.condition}
          split
          data={this.props.productConditions}
          isOpen={this.props.filterGroupStatus.condition}
          onOpen={(value) => { this.props.toggleFilterGroup('condition', value) }}
          checkboxModel='cndt'
          inputs={this.props.productConditions.map(condition => ({
            label: condition.name,
            type: 'checkbox',
            id: condition.id,
            model: `.cndt[${condition.id}]`
          }))} />
        <FilterGroup className="filterGroup"
          header='form'
          isVisible={!!this.props.form}
          split
          data={this.props.productForms}
          isOpen={this.props.filterGroupStatus.form}
          onOpen={(value) => { this.props.toggleFilterGroup('form', value) }}
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
          onOpen={(value) => { this.props.toggleFilterGroup('chemSearch', value) }}
          inputs={[
            {
              label: 'ChemicalSearch',
              model: '.chemSearch',
              type: 'text',
            }
          ]} />
        <FilterGroup className="filterGroup"
          header='productAge'
          isVisible={!!this.props.productsAge}
          split
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.productAge}
          onOpen={(value) => { this.props.toggleFilterGroup('productAge', value) }}
          dispatch={this.props.dispatch}
          inputs={[
            {
              model: 'forms.filter.data.productAge',
              type: 'radio',
            }
          ]} />
        <FilterGroup className="filterGroup"
          header='location'
          isVisible={!!this.props.loc}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.loc}
          onOpen={(value) => { this.props.toggleFilterGroup('loc', value) }}
          dispatch={this.props.dispatch}
          inputs={[
            {
              label: 'Max. miles away',
              model: 'forms.filter.data.loc',
              type: 'dropdown',
            }
          ]} />
        <FilterGroup className="filterGroup"
          header='expiration'
          split
          isVisible={!!this.props.date}
          data={this.props.filterData}
          isOpen={this.props.filterGroupStatus.date}
          onOpen={(value) => { this.props.toggleFilterGroup('date', value) }}
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
          ]} />
        <FilterGroup className="filterGroup"
          isVisible={!!this.props.assay}
          isOpen={this.props.filterGroupStatus.assay}
          onOpen={(value) => { this.props.toggleFilterGroup('assay', value) }}
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
              bigger: true
            }
          ]} />
      </div>
    )
  }

  handleSubmit(inputs) {
    if (checkToken(this.props)) return

    let filter = Object.assign({}, inputs,
      { pckgs: Object.entries(inputs.pckgs || {}).filter(([key, value]) => value === 'true').map(([key]) => key) },
      { cndt: Object.entries(inputs.cndt || {}).filter(([key, value]) => value === 'true').map(([key]) => key) },
      { grade: Object.entries(inputs.grade || {}).filter(([key, value]) => value === 'true').map(([key]) => key) },
      { frm: Object.entries(inputs.frm || {}).filter(([key, value]) => value === 'true').map(([key]) => key) })

    let params = filterNonEmptyAttributes(filter)
    this.props.filterFunc(params)
    let filterTags = []
    for (let tag in params) filterTags.push({ name: tag, value: params[tag] })
    this.props.addFilterTag(filterTags)
    this.props.toggleFilter()
    this.switchFilter(true)
  }

  handleReset(e) {
    if (checkToken(this.props)) return
    e.preventDefault()
    this.props.resetForm('forms.filter')
    this.props.filterFunc({})
    this.props.addFilterTag([])
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchProductConditions(),
      this.props.fetchProductForms(),
      this.props.fetchPackagingTypes(),
      this.props.fetchWarehouseDistances(),
      this.props.fetchProductGrade()
    ]).finally(() => this.setState({ loaded: true }))
  }

  deleteSaveFilter(id) {
    this.props.deleteSaveFilter(id).then(() => this.props.fetchSavedFilters())

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.isOpen
    })
  }

  changeFilterName(e) {
    this.setState({ filterName: e.target.value })
  }

  switchFilter(value) {
    this.setState({ filterSwitch: value })
  }

  saveFilters() {
    let inputs = this.props.filterData
    let filter = Object.assign({}, inputs,
      { containers: Object.entries(inputs.pckgs || {}).filter(([key, value]) => value).map(([key]) => key) },
      { conditions: Object.entries(inputs.cndt || {}).filter(([key, value]) => value === 'true').map(([key]) => key) },
      { forms: Object.entries(inputs.frm || {}).filter(([key, value]) => value === 'true').map(([key]) => key) },
      { filterName: this.state.filterName },
      { quantityFrom: (inputs.qntylb || "") },
      { quantityTo: (inputs.qntyub || "") },
      { priceFrom: (inputs.prclb || "") },
      { priceTo: (inputs.prcub || "") },
      { chemicalName: (inputs.search || "") }
    )
    this.props.saveSaveFilter(filter).then(() => this.setState({ saveFilter: true }))
  }

  render() {
    if (!this.state.loaded) return null

    let saveFilter = this.state.saveFilter ?
      <span
        className="savedButton"
        onClick={() => this.saveFilters()}>
        <FormattedMessage
          id='filter.saved'
          defaultMessage='Saved'
        />
      </span>
      :
      <span
        className="saveButton"
        onClick={() => this.saveFilters()}>
        <FormattedMessage
          id='global.save'
          defaultMessage='Save'
        />
      </span>

    return (
        <Sidebar
          onHide={(event) => {
            // If we clicked on filter icon, prevent duplicate calls of action toggleFilter
            if (event !== null && !event.target.className.includes('submenu-filter')) {
              this.props.toggleFilter(false)
            }
          }}
          visible={this.state.isOpen} className='filter flex'
          width='very wide' direction='right' animation='overlay'>

          <FlexContent>
            <div className="filter-switch">
              <Button attached={this.props.savingFilters ? 'left' : ''} onClick={() => this.switchFilter(true)} primary={this.state.filterSwitch}>
                <FormattedMessage
                  id='filter.setFilters'
                  defaultMessage='SET FILTERS'
                />
              </Button>
              {this.props.savingFilters ? (
                <Button attached="right" onClick={() => this.switchFilter(false)} primary={!this.state.filterSwitch}>
                  <FormattedMessage
                    id='filter.savedFilter'
                    defaultMessage='SAVED FILTERS'
                  />
                </Button>
              ) : ''}
            </div>
            {this.state.filterSwitch ?
              <Form
                id="filter-form"
                model="forms.filter"
                onSubmit={(val) => this.handleSubmit(val)}>

                <Accordion>


                  {this.getContent()}
                  {this.props.savingFilters ? (
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
                            onChange={(e) => this.changeFilterName(e)}
                            placeholder={this.props.intl.formatMessage({
                              id: 'filter.setFilterName',
                              defaultMessage: 'Set Filter Name'
                            })}
                            className="input"
                            value={this.state.filterName} />
                          {saveFilter}
                        </React.Fragment>
                      </div>
                    </div>
                  ) : ''}
                </Accordion>
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
          </FlexContent>

          <RelaxedSegment basic>
            <Grid>
              <GrayRow columns={2}>
                <GridColumn>
                  <Button
                    fluid
                    floated='right'
                    size='large'
                    color='grey'
                    onClick={(e) => { this.handleReset(e) }}>
                    <FormattedMessage
                      id='filter.clearFilter'
                      defaultMessage='Clear Filter'
                    />
                  </Button>
                </GridColumn>

                <GridColumn>
                  <Button primary
                          fluid
                          floated='right'
                          size='large'
                          onClick={(e) => {
                            document.getElementById('filter-form').submit()
                          }}
                  >
                    <FormattedMessage
                      id='global.apply'
                      defaultMessage='Apply'
                    />
                  </Button>
                </GridColumn>
              </GrayRow>
            </Grid>


          </RelaxedSegment>
          {/* <div className="filterBottom">
          <Container textAlign='right' style={{ marginTop: '24px' }}>
            <Button
              size='large'
              color='grey'
              onClick={(e) => { this.handleReset(e) }}>
              <FormattedMessage
                id='filter.clearFilter'
                defaultMessage='Clear Filter'
              />
            </Button>
            <Button primary
              size='large'>
              <FormattedMessage
                id='global.apply'
                defaultMessage='Apply'
              />
            </Button>
          </Container>
        </div> */}

        </Sidebar>
  
    )
  }
}

Filter.propTypes = {
  filterFunc: PropTypes.func,
}


export default injectIntl(Filter)
