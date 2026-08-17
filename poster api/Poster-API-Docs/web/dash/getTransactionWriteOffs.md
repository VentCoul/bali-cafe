## dash.getTransactionWriteOffs: Получить списание по чеку 

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/dash.getTransactionWriteoffs?token=687409:4164553abf6a031302898da7800b59fb&transaction_id=388678';


```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/dash.getTransactionWriteoffs'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&transaction_id=388678';

$data = sendRequest($url);
```
#### **Postman**

```json

url = https://joinposter.com/api/dash.getTransactionWriteoffs
?token=687409:4164553abf6a031302898da7800b59fb
&transaction_id=388678;

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
  "response":[
    {
      "write_off_id":"1518199",
      "tr_product_id":"2125168",
      "storage_id":"1",
      "ingredient_id":"833",
      "product_id":"168",
      "modificator_id":"0",
      "prepack_id":"0",
      "weight":"1.00000",
      "unit":"p",
      "cost":22.13,
      "cost_netto":18.44,
      "time":"1507703520358"
    },
    {
      "write_off_id":"1518200",
      "tr_product_id":"2125169",
      "storage_id":"1",
      "ingredient_id":"85",
      "product_id":"169",
      "modificator_id":"0",
      "prepack_id":"0",
      "weight":0.04,
      "unit":"l",
      "cost":1.24,
      "cost_netto":1.03,
      "time":"1507703520358"
    },
    {
      "write_off_id":"1518201",
      "tr_product_id":"2125169",
      "storage_id":"1",
      "ingredient_id":"78",
      "product_id":"169",
      "modificator_id":"0",
      "prepack_id":"0",
      "weight":0.059,
      "unit":"kg",
      "cost":2.12,
      "cost_netto":1.77,
      "time":"1507703520358"
    },
    {
      "write_off_id":"1518202",
      "tr_product_id":"2125169",
      "storage_id":"1",
      "ingredient_id":"84",
      "product_id":"169",
      "modificator_id":"0",
      "prepack_id":"0",
      "weight":0.128,
      "unit":"kg",
      "cost":2.68,
      "cost_netto":2.23,
      "time":"1507703520358"
    },
    {
      "write_off_id":"1518203",
      "tr_product_id":"2125169",
      "storage_id":"1",
      "ingredient_id":"86",
      "product_id":"169",
      "modificator_id":"0",
      "prepack_id":"0",
      "weight":0.608,
      "unit":"kg",
      "cost":37.35,
      "cost_netto":31.13,
      "time":"1507703520358"
    },
    {
      "write_off_id":"1518204",
      "tr_product_id":"2125170",
      "storage_id":"1",
      "ingredient_id":"97",
      "product_id":"908",
      "modificator_id":"68",
      "prepack_id":"918",
      "weight":0.15,
      "unit":"kg",
      "cost":0.43,
      "cost_netto":0.36,
      "time":"1507703520358"
    }
  ]
}
```
</details>

Метод получает все списания по чеку. 

### HTTP GET запрос

`GET https://joinposter.com/api/dash.getTransactionWriteoffs`

### GET-параметры запроса dash.getTransactionWriteOffs

| Параметр       | Описание                                          |
|----------------|---------------------------------------------------|
| transaction_id | Обязательный параметр, id заказа (номер чека)     |

### Параметры ответа dash.getTransactionWriteOffs

| Параметр | Описание      |
|----------|---------------|
| response | Объект ответа |

Внутри параметра `response` лежит объект, внутри которого есть следующие параметры:

| Параметр       | Описание                                                                                                                                   |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| write_off_id   | ID списания                                                                                                                                |
| transaction_id | Номер чека                                                                                                                    |
| storage_id     | ID склада откуда произошло списание                                                                                                        |
| to_storage     | ID склада куда переместили, передается если проводили перемещение                                                                          |
| ingredient_id  | ID ингредиента                                                                                                                             |
| product_id     | ID товара                                                                                                                                  |
| modificator_id | ID модификатора, если без модификатора — 0                                                                                                 |
| prepack_id     | ID полуфабриката                                                                                                                           |
| weight         | Количество                                                                                                                                 |
| unit           | Единица измерения ингредиента: kg — килограммы, p — штуки, l — литры                                                                       |
| cost           | Стоимость ингредиента умноженная на кол-во в гривнах                                                                                       |
| cost_netto     | Стоимость ингредиента умноженная на кол-во в гривнах без НДС. Возвращается если включена настройка «Считать себестоимость и прибыль нетто». |
| user_id        | ID официанта                                                                                                                               |
| type           | Тип действия: 4 — перемещение, 1 — списание, 2 — ручное списание                                                                           |
| time           | Дата списания в формате unixtimestamp                                                                                                      |
| reason         | Причина списания                                                                                                                           |
