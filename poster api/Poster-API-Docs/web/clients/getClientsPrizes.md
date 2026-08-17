## clients.getClientsPrizes: Список товаров выданных по акциям

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.getClientsPrizes
?token=687409:4164553abf6a031302898da7800b59fb

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.getClientsPrizes'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$data = sendRequest($url);
```
#### **Postman**

```json

url = https://joinposter.com/api/clients.getClientsPrizes
 ?token=687409:4164553abf6a031302898da7800b59fb

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
   "prize_product_id":"38",
   "transaction_id":"388689",
   "promotion_id":"8",
   "client_id":"38",
   "status":"1",
   "tr_product_id":"2125190",
   "num":"1.0000000",
   "conditions":{  
      "bonus_products":[  
         {  
            "type":"2",
            "id":"934"
         }
      ],
      "bonus_products_condition_type":"3",
      "bonus_products_condition_value":100
   },
   "date_accrual":"2018-05-02 11:03:50",
   "date_issuance":"2018-05-02 11:03:50",
   "master_id":"0",
   "weight_flag":"0"
}
```
</details>

Метод возвращает товары выданные по акциям.

### HTTP GET запрос

`GET https://joinposter.com/api/clients.getClientsPrizes`

### GET-параметры запроса clients.getClientsPrizes

| Параметр | Описание                        |
|----------|---------------------------------|
| prize_id | Уникальный ID отложенного приза |

### Параметры ответа clients.getClientsPrizes

| Параметр | Описание        |
|----------|-----------------|
| response | Массив объектов |

Внутри параметра `response` лежит массив, в каждом элементе которого есть параметры:

| Параметр         | Описание                                                  |
|------------------|-----------------------------------------------------------|
| prize_product_id | Уникальный ID отложенного приза                           |
| transaction_id   | ID транзакции                                             |
| promotion_id     | ID акции                                                  |
| client_id        | ID клиента                                                |
| status           | 0 — не получен, 1 — получен, 2 — удален                   |
| tr_product_id    | Уникальный ID товара в рамках всех транзакций             |
| num              | Количество товара который выдан                           |
| date_accrual     | Дата начала начисления                                    |
| date_issuance    | Дата выдачи подарка                                       |
| master_id        | ID мастер аккаунта                                        |
| weight_flag      | Признак весового товара, 0 — не весовой, 1 — если весовой |
| conditions       | Условия выдачи продукта                                   |

Внутри параметра `conditions` лежит массив, в каждом элементе которого есть параметры:

| Параметр                       | Описание                                                                                                                                                                                 |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| bonus_products                 | Товар который был выдан                                                                                                                                                                  |
| bonus_products_condition_type  | Условие получения бонусного товара: 1 — процент скидки на бонусные товары (от 0 до 100), 2 — фиксированная сумма скидки на бонусные товары, 3 — фиксированная стоимость бонусного товара. |
| bonus_products_condition_value | Количество начисленных бонусов.                                                                                                                                                           |

Внутри параметра `bonus_products` лежит массив, в каждом элементе которого есть параметры:

| Параметр | Описание                              |
|----------|---------------------------------------|
| type     | Тип товара: 1 — товар, 2 — тех. карта |
| id       | ID товара                             |
