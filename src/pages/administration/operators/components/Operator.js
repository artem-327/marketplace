import React, {Component} from 'react'
import PropTypes from 'prop-types'
import OperatorEditation from './OperatorEditation'

class Operator extends Component {
  state = {
    isEditation: false
  }

  toogleEditation = () => {
    this.setState(prevState => ({
      isEditation: !prevState.isEditation
    }))
  }

  render() {
    const {deleteOperator, putOperatorEdit, ...operator} = this.props
    const {isEditation} = this.state
    if (isEditation) {
      return (
        <OperatorEditation
          operator={operator}
          putOperatorEdit={putOperatorEdit}
          toogleEditation={this.toogleEditation}
        />
      )
    }
    return (
      <tr className='admin-operators-new-item'>
        <td>{operator.firstname}</td>
        <td>{operator.middlename}</td>
        <td>{operator.lastname}</td>
        <td>{operator.email}</td>
        <td>{operator.login}</td>
        <td>
          <button className='button small red' onClick={() => deleteOperator(operator.id)}>
            Delete
          </button>
          <button className='button small' onClick={this.toogleEditation}>
            Edit
          </button>
        </td>
      </tr>
    )
  }
}

Operator.propTypes = {
  firstname: PropTypes.string,
  middlename: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  login: PropTypes.string
}

export default Operator
