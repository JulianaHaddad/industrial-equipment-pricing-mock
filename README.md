# Industrial Pricing API — Mock Service

## Visão Geral

A **Industrial Pricing API** é um serviço REST mockado desenvolvido para simular um backend de precificação de equipamentos industriais. O objetivo deste serviço é disponibilizar dados de produtos e preços por meio de endpoints HTTP simples, permitindo a integração com aplicações externas que necessitem consultar informações de catálogo e precificação em tempo real.

Esta API foi construída exclusivamente para fins de demonstração e testes de integração, representando de forma simplificada um sistema corporativo de precificação normalmente encontrado em ambientes empresariais.

---

## Características da API

O serviço oferece:

* Consulta de catálogo de produtos
* Recuperação de dados de produto por SKU
* Consulta de preços por código de produto
* Listagem de categorias de produtos
* Autenticação via **Bearer Token**

A API segue princípios REST e retorna respostas no formato **JSON**.

---

## URL Base

```
https://industrial-equipment-pricing-mock-production.up.railway.app
```

---

## Autenticação

Todas as requisições exigem um header de autorização utilizando **Bearer Token**.

Exemplo de header:

```
Authorization: Bearer mock-token-latam-2026
```

Caso o header não seja enviado ou o token seja inválido, a API retornará:

```
401 Unauthorized
```

---

## Endpoints Disponíveis

### 1. Listar Produtos

Retorna todos os produtos disponíveis no catálogo.

**Método**

```
GET /products
```

**Resposta**

Lista de produtos contendo informações básicas de identificação.

---

### 2. Consultar Produto por SKU

Retorna os detalhes de um produto específico utilizando seu identificador (SKU).

**Método**

```
GET /products/:id
```

**Exemplo**

```
GET /products/SKU-COMP-001
```

---

### 3. Listar Todos os Preços

Retorna todos os registros de preço disponíveis no sistema.

**Método**

```
GET /prices
```

---

### 4. Consultar Preço por Código de Produto

Retorna o preço associado a um SKU específico.

**Método**

```
GET /prices/:product_code
```

**Exemplo**

```
GET /prices/SKU-COMP-001
```

**Exemplo de resposta**

```
{
  "product_code": "SKU-COMP-001",
  "currency": "USD",
  "price": 1250
}
```

---

### 5. Listar Categorias

Retorna as categorias disponíveis no catálogo.

**Método**

```
GET /categories
```

---

## Exemplo de Requisição

```
GET /prices/SKU-COMP-001
Authorization: Bearer mock-token-latam-2026
```

Resposta esperada:

```
{
  "product_code": "SKU-COMP-001",
  "currency": "USD",
  "price": 1250
}
```

---

## Tecnologias Utilizadas

Esta API mock foi implementada utilizando uma arquitetura leve baseada em serviços REST e hospedada em ambiente de nuvem para disponibilização pública do endpoint.

O objetivo da implementação é permitir:

* Testes de integração entre sistemas
* Validação de chamadas HTTP autenticadas
* Simulação de serviços externos de dados

---

## Observações

Esta implementação representa **apenas uma simulação de um serviço de precificação** e não possui integração com sistemas reais de ERP, inventário ou motores de pricing corporativos.

Os dados retornados são estáticos e foram definidos exclusivamente para permitir testes de integração e demonstrações técnicas.

---

## Uso em Ambientes de Integração

A API pode ser utilizada por qualquer aplicação capaz de realizar requisições HTTP autenticadas, incluindo:

* Plataformas de CRM
* Agentes conversacionais
* Sistemas de automação
* Serviços de backend

As requisições devem sempre incluir o header de autorização conforme descrito na seção de autenticação.

---

## Licença

Este projeto foi desenvolvido exclusivamente com a finalidade de demonstração técnica.
