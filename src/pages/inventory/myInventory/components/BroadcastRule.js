import React, {Component} from 'react';
import './BroadcastRule.css';
import BroadcastTargets from "./BroadcastTargets";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import classnames from 'classnames';
import BroadcastAdd from "./BroadcastAdd";

class BroadcastRule extends Component {

    constructor(props) {
        super(props);
        this.broadcastRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            isOpen: this.props.visible,
            rawData:[]
        }
    }

    submitBroadcastData(){
        
        var tmp = [];
        Object.values(this.state.rawData).map((item)=>{
            item.map((item1)=>{
                tmp.push({visibility: item1.visibility, company: item1.company, [item1.updateType]: item1.amount})
                return null;
            })
            return null;
        })
        
        this.props.addPopup(<BroadcastAdd getProductOffers={this.props.getProductOffers} removePopup={this.props.removePopup} submitRules={this.props.submitRules} subjects={[{productOffer: this.props.productOffersSelection}]} targets={tmp} />)
        this.setState({isOpen: false})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible && nextProps.visible !== this.state.isOpen) this.setState({isOpen: nextProps.visible})
    }

    componentWillMount(){
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside(e) {
        if (this.broadcastRef.current.contains(e.target)) return;
        this.setState({isOpen: false})
    }

    render() {
        console.log(this.props);
        return (
            <div ref={this.broadcastRef} className={classnames("broadcast-rule", {'open': this.state.isOpen})}
                 style={{top: this.props.position ? this.props.position.y : 0}}>
                <div>
                    <div>
                        <span className="left header-section">
                            <h1 className='br-header'>CUSTOM BROADCAST</h1>
                            <div className='br-target'>Broadcasting to: x/x</div>
                        </span>
                    </div>
                    <div>
                        <span className="left">
                            <Dropdown opns={this.props.selections}
                                      onCustomChange={(type) => this.props.setFilter(type)}
                                      placeholder='Select filter'
                                      currentValue={this.props.currentSelected} />
                        </span>
                    </div>
                </div>
                <div>
                    <BroadcastTargets targetGroups={this.props.targetGroups} filter={this.props.currentSelected} getData={(data) => this.setState({rawData:data})}/>
                </div>
                <div className="br-buttons-wr">
                    <button className='button br-apply' onClick={()=>this.submitBroadcastData()}>Apply</button>
                    <div className="clearfix" />
                </div>
            </div>
        );
    }
}
export default BroadcastRule;