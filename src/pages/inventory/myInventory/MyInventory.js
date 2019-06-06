import React, { Component } from 'react'
import ProductOffers from "./components/ProductOffers"
import Filter from '../../../components/Filter'
import './myInventory.scss'
import Spinner from "../../../components/Spinner/Spinner"
import FilterTag from "../../../components/Filter/components/FilterTag"
import { getSelectedDataTable } from "../../../utils/functions"
import SubMenu from '../../../components/SubMenu'
import { FormattedMessage } from 'react-intl'
import { Container, Menu, Header } from 'semantic-ui-react'

const GROUP_BY_ALL_COMPANIES = 1
const GROUP_BY_REGIONS = 2

class MyInventory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      targetGroups: [],
      currentSelected: 'All companies',
      selections: [
        { name: 'All companies', id: GROUP_BY_ALL_COMPANIES },
        // {name: 'Region', id: GROUP_BY_REGIONS}
      ]
    }
  }

  componentDidMount() {
    this.props.fetchMyProductOffers()
    this.props.getCompanies()
  }

  componentWillReceiveProps(nextProps) {
    this.setFilter(GROUP_BY_ALL_COMPANIES, nextProps.companies)
  }

  componentWillUnmount() {
    this.props.resetFilterTags()
    this.props.deleteProductOffersList()
    this.props.resetForm('forms.filter')
  }

  setActiveBroadcastButton(active) {
    this.setState({ brActive: active })
  }

  setFilter(type, companies = this.props.companies) {
    switch (type) {
      case GROUP_BY_ALL_COMPANIES: {
        this.groupByAllCompanies(companies)
        break
      }
      case GROUP_BY_REGIONS: {
        this.groupByRegions(companies)
        break
      }
      default: this.groupByAllCompanies(companies)
    }
  }

  groupByAllCompanies(companies) {
    let targets = companies.map(company => ({ name: company.name, company: company.id }))
    this.setState({
      currentSelected: 'All companies',
      targetGroups: [{ name: 'All Companies', type: 'company', visible: true, targets: targets }],
    })
  }

  groupByRegions(companies) {
    let targetsGroups = Object.values(companies.reduce((carry, company) => {
      let locations = company.offices.map(office => office.location)
      locations.forEach(location => {
        (carry[location.id] = carry[location.id] || { name: location.state, type: 'location', id: location.id, visible: true, targets: [] })
          .targets
          .push({ name: company.name, company: company.id })
      })
      return carry
    }, {}))
    this.setState({
      targetGroups: targetsGroups,
      currentSelected: 'Regions'
    })
  }

  render() {
    let content = this.props.isFetching ? <Spinner /> :
      <ProductOffers
        productOffers={this.props.productOffers}
        fetchMyProductOffers={this.props.fetchMyProductOffers}
        submitRules={this.props.sendRules}
        addPopup={this.props.addPopup}
        removePopup={this.props.removePopup}
        deleteProductOffer={this.props.deleteProductOffer}
        getProductOffers={this.props.fetchMyProductOffers}
        targetGroups={this.state.targetGroups}
        setFilter={(type) => this.setFilter(type)}
        history={this.props.history}
        selections={this.state.selections}
        currentSelected={this.state.currentSelected}
        setActiveBroadcastButton={active => this.setActiveBroadcastButton(active)}
        broadcastActive={this.state.brActive}
        offerBroadcast={this.props.offerBroadcast}
        {...this.props} />
        
    const number = getSelectedDataTable(this.props.productOffersTable)
    return (
      <div id='page' className='my-inventory flex stretched scrolling'>
        <div className='header-top'>
          <Container fluid>
            <Menu secondary>
              <Menu.Item header>
                <Header as='h1' size='medium'>
                  <FormattedMessage id='myInventory.myInventory'
                    defaultMessage='MY INVENTORY' />
                </Header>
              </Menu.Item>
              {number ? (
                <Menu.Item>
                  <Header as='h3' size='small' color='grey'>
                    <FormattedMessage id='myInventory.smallHeader'
                      defaultMessage={number + ' products offerings selected'}
                      values={{ number: number }} />
                  </Header>
                </Menu.Item>
              ) : ''}

              <Menu.Menu position='right'>
                <Menu.Item>
                  <FilterTag
                    dispatch={this.props.dispatch}
                    closeFunc={(filter) => { this.props.fetchMyProductOffers({ ...filter }) }}
                  />
                </Menu.Item>
                <Menu.Item>
                  <SubMenu />
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Container>
        </div>
        <Filter
          chemicalName
          productAgeFilter
          date
          assay
          quantity
          price
          package
          condition
          productGrade
          form
          filterFunc={(filter) => { this.props.fetchMyProductOffers({ ...filter }) }}
          {...this.props}
        />
        {content}
      </div>
    )
  }
}

export default MyInventory