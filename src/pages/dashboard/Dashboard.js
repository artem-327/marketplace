import React, {Component} from 'react';
import './dashboard.css'
import ConMess from '../../components/constructionMessage';
import Spinner from '../../components/Spinner/Spinner';
import Radio from "../../components/Radio/Radio";

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
                    <Spinner/>
                    <div className="input-checkbox">
                        <label htmlFor="test">
                            checkbox small
                            <input type="checkbox" id="test"/>
                            <span className="checkmark small">  </span>
                        </label>
                    </div>
                    <div className="input-checkbox">
                        <label htmlFor="test2">
                            checkbox default
                            <input type="checkbox" id="test2"/>
                            <span className="checkmark">  </span>
                        </label>
                    </div>
                    <div className="input-checkbox">
                        <label htmlFor="test3">
                            checkbox big
                            <input type="checkbox" id="test3"/>
                            <span className="checkmark big">  </span>
                        </label>
                    </div>
                    <Radio css="checkmark" name='foo' opns={[{value:23, label:'vysocina'}, {value:24, label:'Brno'}]} checked={24}/>
                    <Radio css="checkmark small" name='foo' opns={[{value:25, label:'jihocesky'}, {value:26, label:'Jihlava'}]} checked={25}/>
            </div>
            </div>
        );
    }
}

export default Dashboard;
