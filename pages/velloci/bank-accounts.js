import React from 'react'
//Components
import Layout from '~/components/LayoutUnauthorized'
import AddBankAccounts from '../../modules/add-bank-accounts'

const AddBankAccountsPage = () => {
  return (
    <Layout>
      <AddBankAccounts />
    </Layout>
  )
}

export default AddBankAccountsPage
