import React, {Component} from 'react'

class Detail extends Component {

    componentWillMount() {
        this.props.loadDetail(this.props.match.params.id)
    }

    render() {
        const {detail, isDetailFetching} = this.props

        return (
            <div>
                <h1 className='header'>Sales Order {isDetailFetching ? 'Loading...' : '# '+detail.id}</h1>
            </div>
        )
    }
}

export default Detail
