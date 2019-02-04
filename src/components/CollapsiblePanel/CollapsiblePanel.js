import React, { Component, Children } from 'react'
import './style.css'
import {FormattedMessage} from 'react-intl'
import dropdown from '../../images/inv-filter/dropdown.png'
import dropdownClose from '../../images/inv-filter/dropdown-close.png'

export default class CollapsiblePanel extends Component {
    state = {
        open: true
    }
    render() {
        const { header, children } = this.props
        const { open } = this.state
        const styleOpen = this.state.open ? ' open' : ''

        return (
            <div className="add-group">
                <div className={'header-group' + styleOpen} onClick={() => this.setState({open: !open})}>
                    {open ?
                        <img src={dropdown} alt='drop'/>
                        : <img src={dropdownClose} alt='drop-close'/>
                    }
                    <h2>{header}</h2>
                </div>
                <div className={'add-body' + styleOpen}>
                    {children}
                </div>
            </div>
        )
    }
}