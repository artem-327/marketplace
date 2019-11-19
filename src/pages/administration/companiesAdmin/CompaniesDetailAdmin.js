import React, {Component} from 'react'
import './companiesAdmin.scss'
import {connect} from 'react-redux'
import {
  postNewOffice,
  putCompanyEdit,
  putOfficeEdit,
  fetchDetail,
  deleteCompany,
  postNewCompany,
  deleteOffice,
  getOffices
} from '../../../modules/companies'
import {bindActionCreators} from 'redux'
import Office from './components/Office'
import {fetchLocations} from '../../../modules/location'
import Spinner from '../../../components/Spinner/Spinner'
import InputControlled from '../../../components/InputControlled/InputControlled'
import Button from '../../../components/Button/Button'
import Dropdown from '../../../components/Dropdown/Dropdown'
import {FormattedMessage, injectIntl} from 'react-intl'

class CompaniesDetailAdmin extends Component {
  state = {
    name: '',
    officeId: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    new Promise(resolve => {
      this.props.fetchDetail(this.props.match.params.id, resolve)
    }).then(() => {
      this.setState({name: this.props.company.name})
    })
    this.props.getOffices(this.props.match.params.id)
  }

  renderOffices() {
    //TODO: map only office of certain company
    return this.props.isFetching || !Object.keys(this.props.offices).length ? (
      <Spinner />
    ) : (
      this.props.offices.map(office => (
        <Office
          deleteOffice={id => this.props.deleteOffice(id, this.props.company)}
          key={office.id}
          id={office.id}
          office={office}
          history={this.props.history}
        />
      ))
    )
  }

  getOfficePayload = officeId => {
    const {offices} = this.props
    const selectedOffice = offices.find(i => i.id === officeId)
    return {
      id: parseInt(officeId),
      name: selectedOffice.name,
      company: this.props.match.params.id
    }
  }

  render() {
    const {formatMessage} = this.props.intl
    return (
      <div className='admin-companies'>
        <h1 className='header'>
          <FormattedMessage
            id='administration.companyAdministration'
            defaultMessage={`Companies administration - ${this.props.company.name}`}
            values={{company: this.props.company.name}}
          />
        </h1>
        <div className='list-companies'>
          <h4>
            <FormattedMessage id='administration.companyDetail' defaultMessage='Company Detail' />
          </h4>
          <div className='company-detail'>
            <InputControlled
              value={this.state.name}
              handleChange={this.handleChange}
              name='name'
              data-test='administration_companies_name_inp'
            />
            <Button
              color='red'
              onClick={() =>
                this.props.deleteCompany(this.props.company.id, () =>
                  this.props.history.push('/administration/companies/')
                )
              }
              data-test='administration_companies_delete_btn'>
              <FormattedMessage id='global.delete' defaultMessage='Delete' />
            </Button>
            <Button
              color='blue'
              onClick={() => this.props.putCompanyEdit(Object.assign({}, this.props.company, {name: this.state.name}))}
              data-test='administration_companies_edit_btn'>
              <FormattedMessage id='global.edit' defaultMessage='Edit' />
            </Button>
          </div>
          <h4>
            <FormattedMessage id='administration.companyOffices' defaultMessage='Company Offices' />
          </h4>
          <table className='company-table'>
            <thead>
              <tr>
                <th>
                  <FormattedMessage id='global.name' defaultMessage='Name' />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.renderOffices()}</tbody>
          </table>
        </div>

        <div className='add-new-company'>
          <Dropdown
            opns={this.props.offices} //TODO: only offices without company
            placeholder={formatMessage({
              id: 'administration.addNewOffice',
              defaultMessage: 'Add New Office To Company'
            })}
            onChange={value => {
              this.setState({officeId: value})
            }}
            data-test='administration_companies_addNewOffice_drpdn'
          />

          <Button
            color='green'
            onClick={() => this.props.putOfficeEdit(this.getOfficePayload(this.state.officeId), () => {})}
            data-test='administration_companies_add_btn'>
            <FormattedMessage id='global.addNew' defaultMessage='Add New' />
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    isFetching: store.companies.isFetching,
    company: store.companies.detail,
    isFetchingLocation: store.location.locationFetching,
    locations: store.location.locations,
    offices: store.companies.offices
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchDetail,
      getOffices,
      putOfficeEdit,
      putCompanyEdit,
      postNewCompany,
      fetchLocations,
      postNewOffice,
      deleteOffice,
      deleteCompany
    },
    dispatch
  )
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CompaniesDetailAdmin))
