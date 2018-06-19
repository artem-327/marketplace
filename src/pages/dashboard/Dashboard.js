import React, {Component} from 'react';
import './dashboard.css'
import ConMess from '../../components/constructionMessage';
import Spinner from '../../components/Spinner/Spinner';

class Dashboard extends Component {

    render() {
        return (
            <div>
            <div className="dashboard">
                <h1 className='header'>Dashboard</h1>
                <ConMess/>
            </div>
                <div>
                    <button className='button big'>Submit</button><br/><br/>
                    <button className='button'>Submit</button><br/><br/>
                    <button className='button small'>Submit</button><br/><br/>
                    <button className='button disabled'>Submit</button><br/><br/>
                    <div>
                        <label className="rbutton">One
                            <input type="radio" checked="checked" name="radio" />
                                <span className="radiomark"></span>
                        </label>
                        <label className="rbutton">Two
                            <input type="radio" name="radio" />
                                <span className="radiomark"></span>
                        </label>
                        <label className="rbutton">Three
                            <input type="radio" name="radio" />
                                <span className="radiomark"></span>
                        </label>
                    </div>
                    <Spinner/>
            </div>
            </div>
        );
    }
}

export default Dashboard;
