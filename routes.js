const routes = module.exports = require('next-routes')()
 
routes
  .add('orders', '/orders/:type')
  .add('orders/detail', '/orders/:type/:id')