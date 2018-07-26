import React,{Component} from 'react';
import Spinner from "../../components/Spinner/Spinner";
import Radio from "../../components/Radio/Radio";
import Checkbox from "../../components/Checkbox/Checkbox";
import FilterTag from "../../components/Filter/components/FilterTag/FilterTag";
import ThreeDots from "../../components/ThreeDots/ThreeDots";
import KeepShopping from "../../components/KeepShopping/";

class TestPage extends Component {

    keepShopping(){
        console.log(this.props);
        this.props.addPopup(<KeepShopping/>);
    }

    render(){
        return (
            <div>
                <div>
                    <br/>
                    <button onClick={()=>{this.keepShopping()}} className='button big'>Submit</button><br/><br/>
                    <button className='button'>Submit</button><br/><br/>
                    <button className='button small'>Submit</button><br/><br/>
                    <button className='button disabled'>Submit</button><br/><br/>
                    <Radio name='foo' opns={[{value:23, label:'vysocina'}, {value:24, label:'Brno'}]} checked={24}/>
                    <Radio className='small' name='foo2' opns={[{value:25, label:'jihocesky'}, {value:26, label:'Jihlava'}]} checked={25}/>
                    <Checkbox name='fee3' label='foo' onChange={(value) => {console.log(value)}} />
                    <ThreeDots/>
                    <br/>
                    <ThreeDots className="small"/>
                    <Spinner/>
                    <FilterTag/>
                </div>
            </div>
        )
    }
}

export default TestPage;