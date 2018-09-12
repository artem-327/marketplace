import React from 'react';
import ThreeDotsMenu from "./ThreeDotsMenu";
import PropTypes from "prop-types";


// export default function DotsMenuHOC(ComposedComponent) {
//     return class DotsMenuWrapper extends React.Component {
class DotsMenuHOC extends React.Component {
        render() {
            let dotsMenuLinks =
                [
                    {
                        url: '#',
                        label: 'Edit Listing',
                    },
                {
                    url: '#',
                    label: 'Custom Broadcast'
                },
                {
                    url: '#',
                    label: 'Delete Listing'
                }
        ];
            return (
                this.props.isOpen ?
                    <div>
                    <ThreeDotsMenu className={this.props.className} links={dotsMenuLinks}/>
                </div> : null
            );
        }
    }
ThreeDotsMenu.propTypes = {
    isOpen: PropTypes.bool,
};

    export default DotsMenuHOC;
