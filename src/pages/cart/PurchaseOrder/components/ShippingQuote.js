import React, { Component } from 'react'
import moment from 'moment'

import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Divider, Radio, Dimmer, Loader } from 'semantic-ui-react'
import styled from 'styled-components'



const InnerGrid = styled(Grid)`
  height: 260px;
  overflow-y: auto;
  padding-right: 5px !important;
`

const RelaxedColumn = styled(GridColumn)`
  padding-bottom: 0px !important;
`

const RelaxedRow = styled(GridRow)`
  padding-bottom: 0px !important;
  padding-top: 0px !important;
`

export default class ShippingQuote extends Component {
  state = {
    selectedItem: null
  }

  renderItem = (item, index) => {
    let timeObj = moment(item.estimatedDeliveryDate)
    let deliveryTime = timeObj.format('MMM D, YYYY')
    let daysLeft = timeObj.fromNow()

    let { handleQuoteSelect, selectedShippingQuote, currency } = this.props

    return (
      <>
        <RelaxedRow key={index}>
          <GridColumn computer={1}><Radio checked={selectedShippingQuote && selectedShippingQuote.index === index} onChange={() => handleQuoteSelect(index)} /></GridColumn>
          <GridColumn computer={4}>{item.carrierName}</GridColumn>
          <GridColumn computer={2}><FormattedNumber style='currency' currency={'USD'} value={item.estimatedPrice} /></GridColumn>
          <GridColumn computer={4}>{deliveryTime}</GridColumn>
          <GridColumn computer={2}>{daysLeft}</GridColumn>
          <GridColumn computer={3}>{item.serviceType}</GridColumn>
        </RelaxedRow>
        <Divider />
      </>
    )
  }

  render() {
    let { shippingQuotes, shippingQuotesAreFetching } = this.props


    if (shippingQuotesAreFetching) {
      return (
        <InnerGrid>
          <Dimmer active inverted>
            <Loader size='big' />
          </Dimmer>
        </InnerGrid>
      )
    }


    if (!shippingQuotes || shippingQuotes.length === 0) {
      return (
        <FormattedMessage
          id='cart.nothing'
          defaultMessage='Nothing to show'
        />
      )
    }

    return (
      <>

        <RelaxedColumn computer={16}>

          <Grid padded>
            <GridColumn computer={1} />
            <GridColumn computer={4}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.carrier'
                  defaultMessage='Carrier'
                />
              </Header>
            </GridColumn>
            <GridColumn computer={2}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.cost'
                  defaultMessage='Cost'
                />
              </Header>
            </GridColumn>

            <GridColumn computer={4}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.estimatedDelivery'
                  defaultMessage='Estimated Delivery'
                />
              </Header>
            </GridColumn>

            <GridColumn computer={2}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.etd'
                  defaultMessage='ETD'
                />
              </Header>
            </GridColumn>

            <GridColumn computer={3}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.serviceType'
                  defaultMessage='Service Type'
                />
              </Header>
            </GridColumn>
          </Grid>

        </RelaxedColumn>

        <InnerGrid padded verticalAlign='middle'>
          {shippingQuotes.map((el, i) => this.renderItem(el, i))}
        </InnerGrid>
      </>
    )
  }
}


// class ShippingQuote extends Component {
//     state = {}

//     constructor(props) {
//         super(props);

//         this.state = {
//             selectedItem: null,
//             shippingQuotesAreFetching: this.props.shippingQuotesAreFetching
//         };
//     }

//     changeRadio(value) {
//         this.setState({ selectedItem: value });
//     }

//     handleScrollY() {
//         // get table header height
//         const tableHeaderHeight = document.querySelector('.scrollbar-container.freight-selection-wrapper thead tr th:first-child').clientHeight;

//         // get position of scrollbar (0 - 1)
//         let freightWrapper = document.querySelector('.scrollbar-container.freight-selection-wrapper');
//         let scrollPosition = freightWrapper.scrollTop / (freightWrapper.scrollHeight - freightWrapper.clientHeight);

//         // get real scroll height (minus table header height)
//         let scrollHeight = (freightWrapper.scrollHeight - freightWrapper.clientHeight - tableHeaderHeight);

//         // floated header (move header together with scrolling)
//         let topPosition = document.querySelector('.scrollbar-container.freight-selection-wrapper').scrollTop;
//         let fixHeader = document.querySelectorAll('.freight-selection-wrapper th > .fix-header');
//         for (let i = 0; i < fixHeader.length; i++) {
//             fixHeader[i].style.top = topPosition + 'px';
//         }

//         // calculate scrollbar position
//         let yScrollbar = document.querySelector('.scrollbar-container.freight-selection-wrapper > .ps__rail-y');
//         yScrollbar.style.marginTop = scrollPosition * scrollHeight + 'px';
//     }

//     renderShippingQuotes() {
//         // if (typeof this.props.shippingQuotes.length === 'undefined' || this.props.shippingQuotes.length < 1 || typeof this.props.selectedAddress.id == 'undefined') {
//         //     return (
//         //         <div>
//         //             <FormattedMessage
//         //                 id='cart.nothing'
//         //                 defaultMessage='Nothing to show'
//         //             />
//         //         </div>
//         //     )
//         // }




//         return (
//             <PerfectScrollbar className="freight-selection-wrapper" onScrollY={this.handleScrollY}>
//                 <table className="freight-selection">
//                     <thead>
//                         <tr>
//                             <th>
//                                 <div className={'fix-header'}></div>
//                             </th>
//                             <th>
//                                 <FormattedMessage
//                                     id='cart.carrier'
//                                     defaultMessage='Carrier'
//                                 />
//                                 <div className={'fix-header'}>
//                                     <FormattedMessage
//                                         id='cart.carrier'
//                                         defaultMessage='Carrier'
//                                     />
//                                 </div>
//                             </th>
//                             <th className="a-right">
//                                 <FormattedMessage
//                                     id='cart.cost'
//                                     defaultMessage='Cost'
//                                 />
//                                 <div className={'fix-header'}>
//                                     <FormattedMessage
//                                         id='cart.cost'
//                                         defaultMessage='Cost'
//                                     />
//                                 </div>
//                             </th>
//                             <th>
//                                 <FormattedMessage
//                                     id='cart.estimatedDelivery'
//                                     defaultMessage='Estimated Delivery'
//                                 />
//                                 <div className={'fix-header'}>
//                                     <FormattedMessage
//                                         id='cart.estimatedDelivery'
//                                         defaultMessage='Estimated Delivery'
//                                     />
//                                 </div>
//                             </th>
//                             <th>
//                                 <FormattedMessage
//                                     id='cart.etd'
//                                     defaultMessage='ETD'
//                                 />
//                                 <div className={'fix-header'}>
//                                     <FormattedMessage
//                                         id='cart.etd'
//                                         defaultMessage='ETD'
//                                     />
//                                 </div>
//                             </th>
//                             <th>
//                                 <FormattedMessage
//                                     id='cart.serviceType'
//                                     defaultMessage='Service Type'
//                                 />
//                                 <div className={'fix-header'}>
//                                     <FormattedMessage
//                                         id='cart.serviceType'
//                                         defaultMessage='Service Type'
//                                     />
//                                 </div>
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {/* {this.props.shippingQuotes.map((sQuote, i) => { */}
//                             {mockData.map((sQuote, i) => {
//                             let now = moment();
//                             let deliveryDate = sQuote.estimatedDeliveryDate;
//                             let etd = now.diff(deliveryDate, 'days') * -1 + 1;
//                             const label = sQuote.carrierName;
//                             const radioOptions = [{ value: i.toString(), label: label }];

//                             return (
//                                 <tr key={i}>
//                                     <td>
//                                         <Radio onChange={(value) => this.changeRadio(value)}
//                                             name="freight"
//                                             opns={radioOptions}
//                                             checked={this.state.selectedItem} />
//                                     </td>
//                                     <td>{sQuote.carrierName}</td>
//                                     <td className="a-right"><NumberFormat
//                                         value={sQuote.estimatedPrice}
//                                         displayType={'text'}
//                                         prefix={'$'}
//                                         thousandSeparator={','}
//                                         decimalSeparator={'.'}
//                                         decimalScale={2}
//                                         fixedDecimalScale={true} /></td>
//                                     <td>{moment(sQuote.estimatedDeliveryDate).format('MMM D, YYYY')}</td>
//                                     <td>{etd + (etd == 1 ? ' Day' : ' Days')}</td>
//                                     <td>{sQuote.serviceType}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </PerfectScrollbar>
//         );
//     }

//     render() {
//         let sQuotes = this.renderShippingQuotes();
//         // if (this.props.shippingQuotesAreFetching) return <Dimmer><Loader /> </Dimmer>
//         return (
//             <div className="shopping-cart-items">
//                 <div className="purchase-order-section">
//                     <div className="group-item-wr">
//                         {this.props.shippingQuotesAreFetching ? <Spinner /> : sQuotes}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// export default ShippingQuote

// ShippingQuote.propTypes = {
//     selectedAddress: PropTypes.object,
//     shippingQuotes: PropTypes.array,
//     shippingQuotesAreFetching: PropTypes.bool
// }