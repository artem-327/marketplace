import React, { Component } from 'react'
import './Administration.scss'

import AdministrationMenu from './AdministrationMenu'
import AdministrationContent from './AdministrationContent'

import Users from './users'
import CompaniesAdmin from './companiesAdmin'
import Offices from './officesAdmin/Offices'
import { FormattedMessage } from 'react-intl'
// import MerchantsTable from "./merchants"
// import Operators from "./operators"

export default class Administration extends Component {
  state = {
    content: 'Companies'
  }

  showContent = contentSelect => {
    switch (contentSelect) {
      case 'company':
        return <CompaniesAdmin />
      case 'users':
        return <Users />
      case 'offices':
        return <Offices />
      // case "operators":
      //   return <Operators />;
      // case "merchants":
      //   return <MerchantsTable />;
      default:
        return <CompaniesAdmin />
    }
  }

  contentHandler = e => {
    this.setState({ content: e.target.getAttribute('name') })
  }

  render() {
    const content = this.showContent(this.state.content)
    return (
      <>
        <h1 className='header'>
          <FormattedMessage id='administration' defaultMessage='ADMINISTRATION' />
        </h1>
        <div className='administration-wrapper'>
          <AdministrationMenu contentHandler={this.contentHandler} />
          <AdministrationContent administrComponent={content} />
        </div>
      </>
    )
  }
}
