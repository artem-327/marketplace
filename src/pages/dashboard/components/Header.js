import React from 'react';
import {Link} from 'react-router-dom'

import {scrollToComponent} from '../../../utils/scroll'
// import NavMenu from
import logo from '../../../logo.svg';

const imgStyle = {
    width: '50px',
    height: '50px',
};

const Header = () => {
    return <header>
        <div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <img src={logo} alt="Logo" className="headerLogo" style={imgStyle}/>
                    {/*<NavMenu/>*/}
                </div>
            </div>
        </div>
    </header>;
};


export default Header;