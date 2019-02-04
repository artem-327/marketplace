import React, {Component} from 'react'
import CollapsiblePanel from '../../../components/CollapsiblePanel'
import '../../../pages/inventory/addInventory/AddInventory.css'
class Detail extends Component {

    componentWillMount() {
        this.props.loadDetail(this.props.match.params.id)
    }

    render() {
        const {detail, isDetailFetching} = this.props

        return (
            <div className="page">
                <h1 className='header'>Sales Order {isDetailFetching ? 'Loading...' : '# '+detail.id}</h1>

                <CollapsiblePanel header="Detail of order">
                <div><h4><span>SET PRICE &amp; RULES</span></h4><div><div className="group-item-wr"><label for=".pricePr"><span>Price per unit</span></label><input id=".pricePr" type="number" name="price" placeholder="$" value=""/></div><div className="group-item-wr"><label for=".costPr"><span>Cost per unit</span></label><input id=".costPr" type="number" name="cost" placeholder="$" value=""/></div><div className="group-item-wr"><div className="gross-margin"><label for=".marginPr"><span>Gross Margin %</span></label><div><input id=".marginPr" className="pricing-gross-margin" type="number" name="margin" placeholder="%" value="" /></div></div></div><div className="group-item-wr"><div className="total"><h5><span>Total Sales Price</span></h5><output>$0</output></div></div><div><div className="group-item-wr"><label><span>Splits</span></label><input id="forms.productMapping.packaging.splits" className="splits" type="number" min="1" name="forms.productMapping.packaging.splits" value="1" /></div><div className="group-item-wr"><label><span>Minimum</span></label><input id="forms.productMapping.packaging.minimum" className="minimum" type="number" min="0" name="forms.productMapping.packaging.minimum" value="1"/></div></div><div><div className="group-item-wr"><label className="input-checkbox "><p>Tier Pricing</p><input type="checkbox" name="incremental" /><span className="checkmark ">  </span></label></div></div><div></div></div></div>
                </CollapsiblePanel>
            </div>
        )
    }
}

export default Detail
