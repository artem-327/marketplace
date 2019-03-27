import React, {Component} from 'react';
import './operators.scss';
import Operator from "./components/Operator";
import Spinner from '../../../components/Spinner/Spinner'
import {FormattedMessage} from 'react-intl';

class Operators extends Component {

    componentDidMount(){
        this.props.getOperators();
    }

    render(){
        const {operators} = this.props
        if (this.props.isFetching) return <Spinner />;
        const operatorsData = operators.map((operator, index) => {
            return (
              <Operator
                deleteOperator={this.props.deleteOperator}
                putOperatorEdit={this.props.putOperatorEdit}
                {...operator}
                key={index}
              />)
        })
        return (
            <div className="admin-operators-wr">
                <h1 className="header">
                    <FormattedMessage
                        id='operators'
                        defaultMessage='Operators'
                    />
                </h1>
                <table className="admin-operators">
                <thead>
                    <tr>
                        <th>
                            <FormattedMessage
                                id='global.firstName'
                                defaultMessage='First Name'
                            />
                        </th>
                        <th>
                            <FormattedMessage
                                id='global.middleName'
                                defaultMessage='Middle Name'
                            />
                        </th>
                        <th>
                            <FormattedMessage
                                id='global.surname'
                                defaultMessage='Surname'
                            />
                        </th>
                        <th>
                            <FormattedMessage
                                id='global.email'
                                defaultMessage='E-mail'
                            />
                        </th>
                        <th>
                            <FormattedMessage
                                id='operators.login'
                                defaultMessage='Login'
                            />
                        </th>
                        <th className="settings"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {operatorsData}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Operators;