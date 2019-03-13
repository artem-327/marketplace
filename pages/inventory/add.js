import securePage from '../../hocs/securePage'
import Layout from 'components/Layout'
import AddInventory from "~/src/pages/inventory/addInventory"

export default securePage(() => (
  <Layout title="Add Inventory">
    <h2>Add Inventory</h2>
    <AddInventory />
  </Layout>
))