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
                        <label className="rbutton"><p>One</p>
                            <input type="radio" name="radio" value="One" />
                                <span className="radiomark"></span>
                        </label>
                        <label className="rbutton"><p>Two</p>
                            <input type="radio" name="radio" value="Two" />
                                <span className="radiomark"></span>
                        </label>
                        <label className="rbutton">Three
                            <input type="radio" name="radio" value="Three" />
                                <span className="radiomark small"></span>
                        </label>
                    </div>
                    <Spinner/>
            </div>
            </div>
        );
    }
}

export default Dashboard;
