## clients.getClientsAccumulations: Список накоплений клиента по акциям

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.getClientsAccumulations
?token=687409:4164553abf6a031302898da7800b59fb

```
#### **PHP**
```php

<?php
$url = 'https://joinposter.com/api/clients.getClientsAccumulations'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$data = sendRequest($url);
```
#### **Postman**

```json

url = https://joinposter.com/api/clients.getClientsAccumulations
 ?token=687409:4164553abf6a031302898da7800b59fb

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
   "response":[  
      {  
         "accumulation_product_id":"1",
         "tr_product_id":"2125193",
         "promotion_id":"14",
         "client_id":"61",
         "product_id":"934",
         "modification_id":"0",
         "status":"1",
         "num":"1.0000000",
         "product_sum":"1476",
         "prize_product_id":"",
         "date_add":"2018-05-02 13:25:16",
         "date_close":null,
         "weight_flag":"0"
      }
   ]
}
```
</details>
 
Метод возвращает накопления клиента по акциям.

### HTTP GET запрос

`GET https://joinposter.com/api/clients.getClientsAccumulations`

### GET-параметры запроса clients.getClientsAccumulations

| Параметр | Описание                                                                        |
|----------|---------------------------------------------------------------------------------|
| num      | Кол-во клиентов в ответе                                                        |
| offset   | Количество клиентов, которое необходимо пропустить от начала. По умолчанию — 0. |

### Параметры ответа clients.getClientsAccumulations

| Параметр | Описание        |
|----------|-----------------|
| response | Массив объектов |

Внутри параметра `response` лежит массив, в каждом элементе которого есть параметры:

| Параметр                | Описание                                                             |
|-------------------------|----------------------------------------------------------------------|
| accumulation_product_id | ID накопления                                                        |
| tr_product_id           | Уникальный ID товара в рамках всех транзакций                        |
| promotion_id            | ID акции                                                             |
| client_id               | ID клиента                                                           |
| product_id              | ID товара                                                            |
| modification_id         | ID модификации, если товар с модификациями, 0 — если нет модификации |
| status                  | Статус накопления: 1 — активное, 2 — закрыто, 3 — удалено            |
| num                     | Количество выданного товара                                          |
| product_sum             | Стоимость одного купленного товара                                   |
| prize_product_id        | ID бонусного товара                                                  |
| date_add                | Дата начала накопления в формате `YYYY-MM-dd HH:mm:ss`               |
| date_close              | Дата окончания накопления в формате `YYYY-MM-dd HH:mm:ss`            |
| weight_flag             | Обозначение весового товара: 0 — товар не весовой, 1 — товар весовой |
