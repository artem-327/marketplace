import { connect } from 'react-redux'
import RegisterBeneficialOwner from './RegisterBeneficialOwner'
//Actions
import * as Actions from '../actions'
//components
import { getSafe } from '~/utils/functions'
import Router from 'next/router'

const mapStateToProps = store => {
  return {
  ...store.vellociRegister,
  token: getSafe(() => Router.router.query.token, '')
}}

const mapDispatchToProps = {
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBeneficialOwner)