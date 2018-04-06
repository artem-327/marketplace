import React, {Component} from 'react';

import CountUp from 'react-countup'

class Stats extends Component {

    componentDidMount(){
        this.props.callbackParent({avgPrice:this.avgPrice, perMobile:this.perMobile, peopleMobile:this.peopleMobile})
    }

    render() {
        return (<div className="stats" id="ScrollStats">
            <div className="landing-wr">
                <div className="item">
                    <h1>
                        <CountUp start={7000} end={13582} duration={3} suffix=" Kč" ref={(avgPrice) => {
                            this.avgPrice = avgPrice;
                        }}/>
                    </h1>
                    <p>je průměrná cena prodaného zájezdu</p>
                </div>
                <div className="item">
                    <h1>
                        <CountUp start={0} end={80} duration={3} suffix="%" ref={(perMobile) => {
                            this.perMobile = perMobile;
                        }}/>
                    </h1>
                    <p>uživatelé chce nakupovat přes telefon</p>
                </div>
                <div className="item">
                    <h1>
                        <CountUp start={0} end={150} duration={3} suffix="x" ref={(peopleMobile) => {
                            this.peopleMobile = peopleMobile;
                        }}/>
                    </h1>
                    <p>denně koukají lidé na mobil</p>
                </div>
                <div className="clearfix"> </div>
            </div>
        </div>)
    }
};


export default Stats;