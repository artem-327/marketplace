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

    handleChange(date) {
        this.props.onChange(moment(date).format('YYYY-MM-DD'))
    }

    render () {
        let {value, placeholder} = this.props;
        return (
            <div className='datepicker'>
               <label>
                    <i className="far fa-calendar-alt datepicker-icon"></i>
                    <DatePicker
                        minDate={this.props.minDate}
                        maxDate={this.props.maxDate}
                        placeholder={placeholder}
                        dateFormat="YYYY-MM-DD"
                        selected={value && value!=="" ? moment(value, 'YYYY-MM-DD') : null}
                        onChange={this.handleChange}
                    />
               </label>
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