# Industrial Equipment Pricing API — Mock Setup Guide

Visão Geral

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
