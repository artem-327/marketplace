import React, {Component} from 'react'
import '../styles/orders.css'

class Orders extends Component {

    componentDidMount() {
        this.props.loadData()
    }

    render() {
        const {rows, isFetching} = this.props

        return (
            <div>
                <h1 className='header'>Orders {isFetching ? 'Loading...' : ''}</h1>
                <table>
                    {rows.map(r => (
                        <tr key={r.id}><td>{r.id}</td></tr>
                    ))}
                </table>
            </div>
        )
    }
}

export default Orders

