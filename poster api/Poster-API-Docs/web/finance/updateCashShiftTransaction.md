## finance.updateCashShiftTransaction: Изменение свойств транзакции кассовой смены

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.updateCashShiftTransaction
?token=687409:4164553abf6a031302898da7800b59fb';

const cashShiftTransactionData = {
  cash_shift_transaction_id: 611,
  type_id: 3,
  category_id: 4,
  user_id: 3,
  amount: 499.99,
  time: '2024-09-21 15:00',
  is_fiscal: 1,
  comment: 'Расход',
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.updateCashShiftTransaction'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$cash_shift_transaction = [
    'cash_shift_transaction_id' => 611,
    'type_id'                   => 3,
    'category_id'               => 4,
    'user_id'                   => 3,
    'amount'                    => 499.99,
    'time'                      => '2024-09-21 15:00',
    'is_fiscal'                 => 1,
    'comment'                   => 'Расход',
];

$data = sendRequest($url, 'post', $cash_shift_transaction);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.updateCashShiftTransaction
 ?token=687409:4164553abf6a031302898da7800b59f

{
  "cash_shift_transaction_id":611,
  "type_id":3,  
  "category_id":4,
  "user_id":3,  
  "amount":499.99,
  "time":"2024-09-21 15:00",
  "is_fiscal":1,
  "comment":"Расход"
}

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "response":{  
    "cash_shift_transaction_id":1650
  }
}
```
</details>

Метод изменяет свойства транзакции кассовой смены.

!>     Тип транзакции "открытие" и "закрытие" изменять нельзя.

### HTTP запрос

`GET https://joinposter.com/api/finance.updateCashShiftTransaction`

### POST-параметры запроса finance.updateCashShiftTransaction

Параметр | Описание
-------- | --------
cash_shift_transaction_id | ID транзакции кассовой смены
type_id | Тип транзакции кассовой смены: 1 — открытие, 2 — доход, 3 — расход, 4 — инкассация, 5 — закрытие. Типы 1 и 5 изменять нельзя. По умолчанию принимает предыдущее значение редактируемой транзакции кассовой смены.
category_id | ID финансовой категории. Обязательное поле, если тип транзакции кассовой смены 2 или 3 и к заведению привязан счёт для наличных. По умолчанию принимает предыдущее значение редактируемой транзакции кассовой смены.
user_id | ID сотрудника. По умолчанию принимает предыдущее значение редактируемой транзакции кассовой смены.
amount | Сумма транзакции кассовой смены. По умолчанию принимает предыдущее значение редактируемой транзакции кассовой смены.
time | Дата и время транзакции кассовой смены, формат "Y-m-d H:i". По умолчанию принимает предыдущее значение редактируемой транзакции кассовой смены.
is_fiscal | Признак, что транзакция кассовой смены фискальная: 0 — не фискальная, 1 — фискальная. По умолчанию принимает предыдущее значение редактируемой транзакции кассовой смены.
comment | Комментарий. По умолчанию принимает предыдущее значение редактируемой транзакции кассовой смены.

### Параметры ответа finance.updateCashShiftTransaction

Параметр | Описание
--------- | -----------
response | Объект ответа

Внутри параметра `response` лежит объект, внутри которого параметры:

Параметр | Описание
--------- | -----------
cash_shift_transaction_id | Новый ID транзакции кассовой смены
