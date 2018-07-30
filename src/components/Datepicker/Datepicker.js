import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.css'

class Datepicker extends React.Component {

    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (date) {
        this.props.onChange(moment(date).format('MM-DD-YYYY'))
    }

    render () {
        const { value, placeholder,} = this.props;
        console.log(value);
        return (
            <div className='datepicker'>
                <i className="far fa-calendar-alt datepicker-icon"></i>
                <DatePicker
                    placeholder={placeholder}
                    dateFormat="MM/DD/YYYY"
                    selected={value && value!=="" ? moment(value, 'MM/DD/YYYY') : null}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

Datepicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
};

export default Datepicker