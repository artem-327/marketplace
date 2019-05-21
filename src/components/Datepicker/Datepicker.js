import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import './datepicker.scss'
import {Icon} from "semantic-ui-react"

class Datepicker extends React.Component {

    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(date) {
        this.props.onChange(date && date != '' ? moment(date).format('YYYY-MM-DD') : '')
    }

    render () {
        let {value, placeholder} = this.props;
        return (
            <div className='datepicker'>
               <label>
                    <Icon name='calendar alternate outline' style={{position: 'absolute', top: '8px', left: '8px', zIndex: '1'}} />
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