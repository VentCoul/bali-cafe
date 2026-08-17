## finance.removeTax: Удаление налога

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
$url = 'https://joinposter.com/api/finance.removeTax'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$tax = [
    'tax_id' => 3,
];

$data = sendRequest($url, 'post', $tax);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.removeTax
 ?token=687409:4164553abf6a031302898da7800b59fb

{
  "tax_id": 3
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

Метод удаляет налог.

### HTTP POST запрос

`https://joinposter.com/api/finance.removeTax`

### POST-параметры запроса finance.removeTax

Параметр | Описание
-------- | --------
tax_id | ID налога

### Параметры ответа finance.removeTax

Параметр | Описание
-------- | --------
response | true, если налог успешно удалён
