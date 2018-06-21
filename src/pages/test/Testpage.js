import React from 'react';
import Spinner from "../../components/Spinner/Spinner";
import Radio from "../../components/Radio/Radio";
import Checkbox from "../../components/Checkbox/Checkbox";

const TestPage = props => {
    return<div>
        <div>
            <br/>
            <button className='button big'>Submit</button><br/><br/>
            <button className='button'>Submit</button><br/><br/>
            <button className='button small'>Submit</button><br/><br/>
            <button className='button disabled'>Submit</button><br/><br/>
            <Radio name='foo' opns={[{value:23, label:'vysocina'}, {value:24, label:'Brno'}]} checked={24}/>
            <Radio style="small" name='foo2' opns={[{value:25, label:'jihocesky'}, {value:26, label:'Jihlava'}]} checked={25}/>
            <Checkbox name='fee3' label='foo' onChange={(value) => {console.log(value)}} />
            <Spinner/>
        </div>
    </div>;
};

export default TestPage;