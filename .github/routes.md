## Principais Rotas

### /user

create
```json
{
  "name": "Jhon Doe",
  "email": "jhondoe@gmail.com",
  "password": "123456"
}
```

#### está rota precisa do token
update
```json
{
"name":"Jhon Doe",
  "email": "jhondoe@gmail.com",
  "password":"1234567",
  "address":{
    "cep": "214343",
    "street":"Rua pinheiro",
    "number":"182",
    "district":"Saltinho",
    "complement":"Próximo ao mercado"
}
```

index
```json
retorno da API
{
  "name": "Jhon Doe",
  "email": "jhondoe@gmail.com",
  "avatar": "https://github.com/gabrielsantos1101.png",
  "address":{
    "cep": "214343",
    "street":"Rua pinheiro",
    "number":"182",
    "district":"Saltinho",
    "complement":"Próximo ao mercado"
}
```

### /dishes
#### todas as rotas menos o index precisam do token

create
```json
{
  "name": "Salada de Frutas",
  "image": "https://my-image.jpg",
  "price": 5.00,
  "category": "Sobremesa",
  "ingredients": ["banana", "castanhas", "cereja", "framboesa", "mel", "passas"],
  "description": "Um prato delicioso"
}
```

index | retorna todos os pratos
```json
retorno da API
{
  "id": 1,
  "name": "Salada de Frutas secas",
  "image": "https://my-image2.jpg",
  "price": 5.00,
  "category": "Sobremesa",
  "ingredients": ["banana", "castanhas", "cereja", "framboesa", "mel", "passas"],
  "description": "Um prato delicioso"
}
```

update | nessa e nas proximas rotas é necessario passar o id do prato como por exemplo **json dishes/1**
```json
{
  "name": "Salada de Frutas secas",
  "image": "https://my-image2.jpg",
  "price": 5.00,
  "category": "Sobremesa",
  "ingredients": ["banana", "castanhas", "cereja", "framboesa", "mel", "passas"],
  "description": "Um prato delicioso"
}
```

show
```json
retorno da API
{
  "name": "Salada de Frutas secas",
  "image": "https://my-image2.jpg",
  "price": 5.00,
  "category": "Sobremesa",
  "ingredients": ["banana"],
  "description": "Um prato delicioso",
  "ingredients": [
    {
      "id": 1,
      "dish_id": 1,
      "name": "banana",
      "image": "https://my-image2.jpg",
    }
  ]
}
```

delete
```json
/dishes/id
exemplo: /dishes/1

```

### /favorites
#### todas as rotas precisam do token

create
```json
favorites/id
exemplo: "favorites/1"
```

index
```json
/favorites
```

delete
```json
/favorites/id
exemplo: /favorites/1
```

### /orders
#### todas as rotas precisam do token

create
```json
{
  "dishes":[{
    "dish_id":1,
    "amount":20
  },
  {
    "dish_id":2,
    "amount":8
  }]
}
```

index
```json
  exemplo: /orders/1
{
  "status":"Preparando"
}
```

delete
```json
exemplo: /orders/1
```


### session

create
```json
{
  "email": "jhondoe@gmail.com",
  "password": "123456"
}
```
