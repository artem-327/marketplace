import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import PopUp from '../components/PopUp';


class Layout extends Component {
    render() {
        return (
            <div>
                <Header/>
                <PopUp />
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default Layout