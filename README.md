# Industrial Equipment Pricing API — Mock Setup Guide

## Visão Geral

Esta API mockada simula um sistema de precificação de equipamentos industriais para revendedores LATAM.
Ela foi criada para ser usada como backend do Agentforce (Salesforce) no Panel Interview.

### Endpoints disponíveis
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /products | Lista todos os produtos do catálogo |
| GET | /products/:id | Retorna produto por SKU (ex: SKU-COMP-001) |
| GET | /prices | Lista todos os preços |
| GET | /prices/:product_code | Retorna preço por código SKU ← **usado pelo Agentforce** |
| GET | /categories | Lista as categorias |

---

## OPÇÃO 1 — MockAPI.io (mais rápido, sem instalação)

### Passo a passo:

1. Acesse https://mockapi.io e crie uma conta gratuita
2. Crie um novo projeto com o nome: `industrial-latam`
3. Para cada recurso abaixo, clique em **"New Resource"** e configure:

#### Recurso: products
- Resource name: `products`
- Em "Schema", adicione os campos: id, name, category, brand, model, unit_price, currency, stock, lead_time_days, description, warranty_months
- Após criar, clique em **"Data"** e importe os dados do arquivo `db.json` (array "products")

#### Recurso: prices
- Resource name: `prices`  
- Em "Schema", adicione: id, product_code, product_name, unit_price, currency, price_brl, price_mxn, discount_reseller_pct, last_updated
- Após criar, importe os dados do array "prices" do `db.json`

4. Sua URL base será algo como: `https://XXXXXXXX.mockapi.io/api/v1`
5. Endpoint para o Agentforce: `GET https://XXXXXXXX.mockapi.io/api/v1/prices/{product_code}`

> ⚠️ **Limitação MockAPI.io**: O filtro por campo customizado (product_code) pode exigir o formato:
> `GET /prices?product_code=SKU-COMP-001` em vez de `/prices/SKU-COMP-001`
> Neste caso, ajuste a query no Flow do Salesforce para usar query parameter.

---

## OPÇÃO 2 — JSON Server no Railway (mais profissional, URL pública permanente)

### Pré-requisitos
- Conta no GitHub (gratuita): https://github.com
- Conta no Railway (gratuita): https://railway.app

### Passo a passo:

#### 1. Criar repositório no GitHub
```bash
mkdir industrial-pricing-api
cd industrial-pricing-api
npm init -y
npm install json-server
```

#### 2. Copiar os arquivos
- Copie o `db.json` para a pasta do projeto
- Crie o arquivo `server.js`:

```javascript
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Auth middleware (mock token)
server.use((req, res, next) => {
  const auth = req.headers['authorization']
  if (auth === 'Bearer mock-token-latam-2026' || process.env.SKIP_AUTH === 'true') {
    next()
  } else {
    res.status(401).json({ error: 'Unauthorized', message: 'Invalid or missing Bearer token' })
  }
})

server.use(middlewares)

// Custom route: GET /prices/:product_code
server.get('/prices/:product_code', (req, res) => {
  const db = router.db
  const productCode = req.params.product_code
  const price = db.get('prices').find({ product_code: productCode }).value()
  if (price) {
    res.json(price)
  } else {
    res.status(404).json({ error: 'Product not found', code: 404 })
  }
})

// Custom route: GET /products/:id (by SKU)
server.get('/products/:id', (req, res) => {
  const db = router.db
  const product = db.get('products').find({ id: req.params.id }).value()
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ error: 'Product not found', code: 404 })
  }
})

server.use(router)
server.listen(process.env.PORT || 3000, () => {
  console.log('Industrial Equipment API running on port', process.env.PORT || 3000)
})
```

#### 3. Atualizar package.json
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

#### 4. Deploy no Railway
1. Acesse https://railway.app e faça login com GitHub
2. Clique em **"New Project"** → **"Deploy from GitHub repo"**
3. Selecione o repositório criado
4. O Railway detecta automaticamente o `package.json` e faz o deploy
5. Após o deploy, clique em **"Settings"** → **"Domains"** → **"Generate Domain"**
6. Sua URL ficará disponível em: `https://industrial-pricing-api-xxx.railway.app`

#### 5. Testar a API
```bash
# Listar todos os preços
curl https://SUA-URL.railway.app/prices \
  -H "Authorization: Bearer mock-token-latam-2026"

# Consultar preço de produto específico (usado pelo Agentforce)
curl https://SUA-URL.railway.app/prices/SKU-COMP-001 \
  -H "Authorization: Bearer mock-token-latam-2026"

# Listar produtos
curl https://SUA-URL.railway.app/products \
  -H "Authorization: Bearer mock-token-latam-2026"
```

---

## Configuração no Salesforce (Named Credential)

Após obter sua URL pública, configure no Salesforce:

### External Credential
- **Label**: PricingAPI Credential
- **Name**: PricingAPI_Credential  
- **Authentication Protocol**: Custom
- Em **Principals**: adicione o token `mock-token-latam-2026`

### Named Credential
- **Label**: Industrial Pricing API
- **Name**: PricingAPI_NC
- **URL**: `https://SUA-URL.railway.app` (ou MockAPI URL)
- **External Credential**: PricingAPI_Credential
- **Generate Authorization Header**: ON
- **Header Name**: Authorization
- **Header Value**: Bearer mock-token-latam-2026

### No Flow (Get_Product_Price_From_API)
Endpoint do HTTP Callout:
```
{!$Credential.PricingAPI_NC}/prices/{!productCode}
```
Método: GET  
Retorno esperado: JSON com `unit_price`, `currency`, `product_name`

---

## Produtos disponíveis para teste

| SKU | Produto | Preço USD |
|-----|---------|-----------|
| SKU-COMP-001 | Compressor de Ar XR-200 | $4,850 |
| SKU-COMP-002 | Compressor de Parafuso SR-500 | $12,400 |
| SKU-BOMB-001 | Bomba Hidráulica BH-50 | $2,750 |
| SKU-BOMB-002 | Bomba Centrífuga BC-200 | $1,890 |
| SKU-MOTOR-001 | Motor Elétrico ME-300 | $3,200 |
| SKU-MOTOR-002 | Motor a Diesel MD-450 | $18,500 |
| SKU-PECA-001 | Filtro de Ar FA-XR200 | $85 |
| SKU-PECA-002 | Válvula de Segurança VS-12BAR | $145 |
| SKU-PECA-003 | Óleo Lubrificante OL-46 | $38 |
| SKU-COMP-003 | Secador Frigorífico SF-100 | $3,100 |

---

## Dicas para o Panel Interview

1. **Demonstração ao vivo**: Durante o panel, chame o endpoint diretamente no browser ou Postman para mostrar os dados reais
2. **Cenário de teste**: Use `SKU-COMP-001` (compressor) para demonstrar o fluxo completo: pergunta → preço → cotação
3. **Cache no Salesforce**: Explique que o Flow verifica o objeto `Product_Price_Cache__c` antes de chamar a API, mostrando consciência sobre rate limits e performance
4. **Erro controlado**: Para demonstrar tratamento de erro, use o SKU `SKU-INVALIDO-999` — a API retorna 404 e o Flow encaminha para escalação

---

## Arquivo openapi.json

O arquivo `openapi.json` contém o schema completo da API no formato OpenAPI 3.0.
Use-o para importar como **External Service** no Salesforce:
- Setup → External Services → New External Service
- Selecione "Upload OpenAPI Schema" e faça upload do `openapi.json`
- Configure a Named Credential associada
