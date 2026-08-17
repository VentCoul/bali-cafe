## clients.addClientsAccumulations: Изменить накопление клиента по акциям

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

url = https://joinposter.com/api/clients.addClientsAccumulations
 ?token=687409:4164553abf6a031302898da7800b59fb';

{
    "accumulation_product_id": 1,
    "tr_product_id": 2125193,
    "promotion_id": 14,
    "client_id": 62,
    "product_id": 934,
    "modification_id": 122,
    "status": 1,
    "num": 1.0000000,
    "product_sum": 1476,
    "date_add": "2024-05-03 13:25:16",
    "date_close": "2024-05-03 13:26:00"
}

```

#### **PHP**

```php

$url = 'https://joinposter.com/api/clients.addClientsAccumulations'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$accumulations = [
  'accumulation_product_id' => 1,
  'tr_product_id'           => 2125193,
  'promotion_id'            => 14,
  'client_id'               => 62,
  'product_id'              => 934,
  'modification_id'         => 122,
  'status'                  => 1,
  'num'                     => 1.0000000,
  'product_sum'             => 1476,
  'prize_product_id'        => "1",
  'date_add'                => "2024-05-03 13:25:16",
  'date_close'              => "2024-05-03 13:26:00",
];

$data = sendRequest($url, 'post', $accumulations);
```

<!-- tabs:end -->

</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
   "response":"1"
}
```
</details>

<details open> 
<summary>Пример запроса, если менять только количество накоплений</summary>

</details>

<!-- tabs:start -->

#### **JS**

```javascript

{
    "accumulation_product_id": 1,
    "tr_product_id": 2125193,
    "promotion_id": 14,
    "client_id": 62,
    "product_id": 934,
    "modification_id": 122,
    "status": 1,
    "num": 2.0000000
    }

```

#### **PHP**

```php

$accumulations = [
  'accumulation_product_id' => 1,
  'tr_product_id' => 2125193,
  'promotion_id' => 14,
  'client_id' => 62,
  'product_id' => 934,
  'modification_id' => 122,
  'status' => 1,
  'num' => 2.0000000,
  ];
  
  $data = sendRequest($url, 'post', $accumulations);

```

<!-- tabs:end -->

</details> 
 
Метод изменяет накопления клиента по акциям

> Если модификатор необязательно выбирать или его нет для позиции, укажите:
> 
> "modification_id": "",

### HTTP POST запрос

`POST https://joinposter.com/api/clients.addClientsAccumulations`

### POST-параметры запроса clients.addClientsAccumulations

Параметры для изменения найдите в методе [clients.getClientsAccumulations: Список накоплений клиента по акциям](/docs/v3/web/clients/getClientsAccumulations)

| Параметр                | Описание                                                             |
|-------------------------|----------------------------------------------------------------------|
| accumulation_product_id | ID накопления                                                        |
| tr_product_id           | Уникальный ID товара в рамках всех транзакций                        |
| promotion_id            | ID акции                                                             |
| client_id               | ID клиента                                                           |
| product_id              | ID товара                                                            |
| modification_id         | ID модификации, если товар с модификациями, 0 — если нет модификации |
| status                  | Статус накопления: 1 — активное, 2 — закрыто, 3 — удалено            |
| num                     | Количество товара который выдан                                      |
| product_sum             | Стоимость одного купленного товара                                   |
| prize_product_id        | ID бонусного товара                                                  |
| date_add                | Дата начала накопления в формате `YYYY-MM-dd HH:mm:ss`               |
| date_close              | Дата окончания накопления в формате `YYYY-MM-dd HH:mm:ss`            |

### Параметры ответа clients.addClientsAccumulations

| Параметр | Описание                     |
|----------|------------------------------|
| response | 1, если накопления добавлены |
