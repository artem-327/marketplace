import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Motion, spring } from "react-motion"

import {scrollToComponent} from '../../utils/scroll'

import './nav.css'

import logo from '../../images/logo.png';
import menuIcon from '../../images/menu_icon.png';
import profileIcon from '../../images/profile_icon.png';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {

        const profileLink = <div>
            <Link to="/" name="ScrollInfo"> <div className="nav-menu-profile"> <img src={profileIcon} alt="Logo" /></div><span> John Dee</span></Link>
        </div>;

        let filter =
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-12">
                    <input></input>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <input></input>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <input></input>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <input></input>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <input></input>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <input></input>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <input></input>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                    <button>SET ALERTS</button>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12">
                    <button>SAVE SEARCH</button>
                </div>
            </div>;

        return (
            <nav className="App-filter">
                {filter}
                <div className="clearfix"> </div>
            </nav>
        );
    }
}

export default Filter;