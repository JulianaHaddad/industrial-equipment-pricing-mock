# Industrial Pricing API — Mock Service

## Visão Geral

A Industrial Equipment Pricing API é um serviço REST mockado desenvolvido para simular um backend completo de precificação de equipamentos industriais. Este projeto oferece uma experiência profissional de integração com dados realistas de produtos, preços e categorias, ideal para demonstrações, testes de integração e PoCs (Proof of Concept).
O serviço disponibiliza 25 equipamentos industriais distribuídos em 8 categorias, com preços em múltiplas moedas (USD, BRL, MXN, ARS) e políticas de desconto para revendedores e volume.

## Destaques

   * Autenticação via Bearer Token
   * 25 produtos em 8 categorias
   * Preços em 4 moedas (USD, BRL, MXN, ARS)
   * Descontos por perfil e volume
   * Interface web interativa para exploração da API
   * Visualização em grade e tabela
   * Busca e filtros avançados
   * Exportação para CSV
   * Tema claro/escuro
   
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
    "id": 1,
    "product_code": "SKU-COMP-001",
    "product_name": "Compressor de Ar Industrial XR-200",
    "unit_price": 4850,
    "currency": "USD",
    "price_brl": 29100,
    "price_mxn": 83220,
    "price_ars": 4656000,
    "discount_reseller_pct": 12,
    "discount_volume_10_pct": 5,
    "discount_volume_20_pct": 8,
    "last_updated": "2026-03-01T00:00:00Z"
}
```

---

### Interface Web - Funcionalidades

  Catálogo Interativo
  
  * Design responsivo (mobile-first)
  * Busca em tempo real
  * Filtros por categoria
  * Visualização em grade ou tabela
  * Gráfico de comparação de preços
  
  API Explorer
  
  * Teste de endpoints em tempo real
  * Histórico de consultas (últimas 10)
  * Copiar resposta JSON
  * Botões rápidos para endpoints comuns
  
  Recursos Adicionais
  
  * Tema claro/escuro com toggle
  * Exportar catálogo para CSV
  * Botão "voltar ao topo"
  * Notificações toast elegantes
  * Persistência de preferências (localStorage)

## Tecnologias Utilizadas

  * Backend: Node.js + Express.js
  * Hospedagem: Railway (Cloud Platform)
  * Frontend: HTML5, CSS3, JavaScript vanilla
  * Visualização: Chart.js para gráficos
  * Design: Sistema de design customizado com suporte a tema claro/escuro
    

---

## Observações

Esta implementação representa **apenas uma simulação de um serviço de precificação** e não possui integração com sistemas reais de ERP, inventário ou motores de pricing corporativos.

Os dados retornados são estáticos e foram definidos exclusivamente para permitir testes de integração e demonstrações técnicas.

---

## Licença

Este projeto foi desenvolvido exclusivamente com a finalidade de demonstração técnica.
