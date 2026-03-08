const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// ─────────────────────────────────────────────
// Auth Middleware — Bearer Token (mock)
// Token: mock-token-latam-2026
// ─────────────────────────────────────────────
server.use((req, res, next) => {
  const auth = req.headers['authorization']
  const skipAuth = process.env.SKIP_AUTH === 'true'

  if (skipAuth || auth === 'Bearer mock-token-latam-2026') {
    next()
  } else {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or invalid Bearer token. Use: Bearer mock-token-latam-2026',
      code: 401
    })
  }
})

server.use(middlewares)

// ─────────────────────────────────────────────
// Custom Route: GET /prices/:product_code
// Used by Agentforce Action to query real-time price
// Example: GET /prices/SKU-COMP-001
// ─────────────────────────────────────────────
server.get('/prices/:product_code', (req, res) => {
  const db = router.db
  const productCode = req.params.product_code
  const price = db.get('prices').find({ product_code: productCode }).value()

  if (price) {
    res.json(price)
  } else {
    res.status(404).json({
      error: 'Product not found',
      message: `No pricing data found for product code: ${productCode}`,
      code: 404
    })
  }
})

// ─────────────────────────────────────────────
// Custom Route: GET /products/:id (by SKU)
// Example: GET /products/SKU-COMP-001
// ─────────────────────────────────────────────
server.get('/products/:id', (req, res) => {
  const db = router.db
  const productId = req.params.id
  const product = db.get('products').find({ id: productId }).value()

  if (product) {
    res.json(product)
  } else {
    res.status(404).json({
      error: 'Product not found',
      message: `No product found with SKU: ${productId}`,
      code: 404
    })
  }
})

// ─────────────────────────────────────────────
// Mount JSON Server router
// ─────────────────────────────────────────────
server.use(router)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`\n Industrial Equipment Pricing API`)
  console.log(` Running on port ${PORT}`)
  console.log(` Auth Token: Bearer mock-token-latam-2026`)
  console.log(`\n Available endpoints:`)
  console.log(`  GET /products            — Full product catalog`)
  console.log(`  GET /products/:sku       — Product by SKU`)
  console.log(`  GET /prices              — All prices`)
  console.log(`  GET /prices/:sku         — Price by SKU (used by Agentforce)`)
  console.log(`  GET /categories          — Product categories\n`)
})
