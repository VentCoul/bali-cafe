## transactions.removeTransactionProduct: Удалить товар из чека

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/transactions.removeTransactionProduct'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$transaction = [
    'spot_id'        => 1,
    'spot_tablet_id' => 1,
    'transaction_id' => 1950,
    'product_id'     => 113,
];

$data = sendRequest($url, 'post', $transaction);
```

> Пример ответа:

```json
{  
  "response":{  
    "err_code":0
  }
}
```

Метод удаляет товар из чека.

### HTTP запрос

`POST https://joinposter.com/api/transactions.removeTransactionProduct`

### POST-параметры запроса transactions.removeTransactionProduct

Параметр | Описание
-------- | --------
spot_id | ID заведения
spot_tablet_id | ID кассы
transaction_id | ID чека
product_id | ID товара или тех. карты
modificator_id | ID модификации товара, по умолчанию не передаётся
modification | Модификатора тех. карты, по умолчанию не передаётся
time | Время операции в формате microtime, по умолчанию принимает текущее время

Внутри параметра `modification` должна быть JSON `строка`. JSON должен состоять из массива объектов, где в каждом объекте должны быть следующие параметры:

Параметр | Описание
-------- | --------
m | ID модификации тех. карты
a | Количество модификации тех. карты

### Параметры ответа transactions.removeTransactionProduct

Параметр | Описание
-------- | --------
response | Объект ответа

Внутри параметра `response` лежит объект, внутри которого есть следующие параметры:

Параметр | Описание
-------- | --------
err_code | 0, если товар или тех. карта успешно удалена из чека

В ходе выполнения могут произойти общие ошибки, их описание находится в разделе [Коды ошибок](/docs/v3/web/errors).
