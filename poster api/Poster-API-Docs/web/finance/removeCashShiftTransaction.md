## finance.removeCashShiftTransaction: Удаление транзакции кассовой смены

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.removeCashShiftTransaction
?token=687409:4164553abf6a031302898da7800b59fb';

const cashShiftTransactionData = {
  cash_shift_transaction_id: 611,
};

```

#### **PHP**


```php
<?php
$url = 'https://joinposter.com/api/finance.removeCashShiftTransaction'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$cash_shift_transaction = [
    'cash_shift_transaction_id' => 611,
];

$data = sendRequest($url, 'post', $cash_shift_transaction);
```

#### **Postman**
```json

url = https://joinposter.com/api/finance.removeCashShiftTransaction
 ?token=687409:4164553abf6a031302898da7800b59fb

{
  "cash_shift_transaction_id": 611
}

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "response":true
}
```
</details>

Метод удаляет транзакцию кассовой смены. 
!>  Удалять транзакцию кассовой смены можно только с типом "Доход", "Расход" или "Инкассация"

### HTTP запрос

`GET https://joinposter.com/api/finance.removeCashShiftTransaction`

### POST-параметры запроса finance.removeCashShiftTransaction

Параметр | Описание
-------- | --------
cash_shift_transaction_id | ID транзакции кассовой смены.

### Параметры ответа finance.removeCashShiftTransaction

Параметр | Описание
--------- | -----------
response | true, если транзакция кассовой смены успешно удалена.
