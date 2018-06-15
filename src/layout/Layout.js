import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import PopUp from '../components/PopUp';
import {withAuth} from "../utils/auth";
import { withRouter } from "react-router-dom";


class Layout extends Component {
    render() {
        return <div>
            <Header/>
            <PopUp />
            {this.props.children}
            <Footer/>
        </div>
    }
}

export default withRouter(withAuth(Layout))