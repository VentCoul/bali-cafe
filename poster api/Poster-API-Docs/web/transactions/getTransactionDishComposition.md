## transactions.getTransactionDishComposition: Состав проданной тех. карты

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/transactions.getTransactionDishComposition'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&transaction_id=76'
 . '&product_id=82'
 . '&modificator_id=22';

$data = sendRequest($url);
```

> Пример ответа:

```json
{  
  "response":{  
    "transaction_id":76,
    "product_id":82,
    "modificator_id":22,
    "num":1,
    "ingredients":[  
      {  
        "ingredient_id":135,
        "type":1,
        "weight":0.6
      },
      {  
        "ingredient_id":24,
        "type":2,
        "weight":0.05
      },
      {  
        "ingredient_id":136,
        "type":1,
        "weight":2
      }
    ]
  }
}
```

Метод возвращает состав проданной тех. карты.

### HTTP GET запрос

`https://joinposter.com/api/transactions.getTransactionDishComposition`

### GET-параметры запроса transactions.getTransactionDishComposition

Параметр | Описание
-------- | --------
transaction_id | ID чека
product_id | ID тех. карты
modificator_id | ID модификатора, по умолчанию принимает 0

### Параметры ответа transactions.getTransactionDishComposition

Внутри параметра `response` лежит объект, внутри которого есть следующие параметры:

Параметр | Описание
-------- | --------
transaction_id | ID чека
product_id | ID тех. карты
modificator_id | ID модификатора
num | Количество тех. карты в чеке
ingredients | Состав тех. карты на момент продажи

Внутри параметра `ingredients` лежит объект, внутри которого есть следующие параметры:

Параметр | Описание
-------- | --------
ingredient_id | ID ингредиента
product_id | ID тех. карты или полуфабриката, передается если `type` = 2 или 3
type | Тип: 1 — ингредиент, 2 — полуфабрикат, 3 — тех. карта 
weight | Количество
