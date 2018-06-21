import React, {Component} from 'react';
import './dashboard.css'
import ConMess from '../../components/constructionMessage';
import Spinner from '../../components/Spinner/Spinner';
import Radio from "../../components/Radio/Radio";
import Checkbox from "../../components/Checkbox/Checkbox";

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
                    <Radio name='foo' opns={[{value:23, label:'vysocina'}, {value:24, label:'Brno'}]} checked={24}/>
                    <Radio style="small" name='foo2' opns={[{value:25, label:'jihocesky'}, {value:26, label:'Jihlava'}]} checked={25}/>
                    <Checkbox name='fee3' label='foo' onChange={(value) => {console.log(value)}} />
                    {/*<div className="input-checkbox">*/}
                    {/*<label htmlFor="test2">*/}
                    {/*checkbox default*/}
                    {/*<input type="checkbox" id="test2"/>*/}
                    {/*<span className="checkmark">  </span>*/}
                    {/*</label>*/}
                    {/*</div>*/}
                    {/*<div className="input-checkbox">*/}
                    {/*<label htmlFor="test3">*/}
                    {/*checkbox big*/}
                    {/*<input type="checkbox" id="test3"/>*/}
                    {/*<span className="checkmark big">  </span>*/}
                    {/*</label>*/}
                    {/*</div>*/}
            </div>
            </div>
        );
    }
}

export default Dashboard;
