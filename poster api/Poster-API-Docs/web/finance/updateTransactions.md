## finance.updateTransactions: Изменение транзакции

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.updateTransactions
?token=687409:4164553abf6a031302898da7800b59fb';


const transactionData = {
  transaction_id: 600,
  type: 2,
  category: 7,
  user_id: 4,
  amount_from: 1000,
  amount_to: 900,
  account_from: 1,
  account_to: 2,
  date: '2017-11-16',
  comment: 'My test finance transaction',
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.updateTransactions'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$transaction = [
    'transaction_id'    => 600,
    'type'              => 2,
    'category'          => 7,
    'user_id'           => 4,
    'amount_from'       => 1000,
    'amount_to'         => 900,
    'account_from'      => 1,
    'account_to'        => 2,
    'date'              => '16112017',
    'comment'           => 'My test finance transaction',
    'agreement_date'    => '2021-11-17 22:15:32',
];

$data = sendRequest($url, 'post', $transaction);

```

#### **Postman**

```json

url = https://joinposter.com/api/finance.updateTransactions
 ?token=687409:4164553abf6a031302898da7800b59fb

{
    "transaction_id": 600,
    "type": 2,
    "category": 7,
    "user_id": 4,
    "amount_from": 1000,
    "amount_to": 900,
    "account_from": 1,
    "account_to": 2,
    "date": "16112017",
    "comment": "My test finance transaction"
}
```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
  "response":600
}
```
</details>

Метод изменяет существующую транзакцию.

### HTTP запрос

`POST https://joinposter.com/api/finance.updateTransactions`

### POST-параметры запроса finance.createTransactions

Параметр | Описание
-------- | --------
transaction_id | ID транзакции для обновления  
type | Тип транзакции: 0 — расход, 1 — доход, 2 — перевод
category | ID категории
user_id | ID пользователя
date | Дата дата добавления в формате `Ymd`
comment | Комментарий к финансовой транзакции, по умолчанию не передается
agreement_date  | Дата соглашения, необязательный параметр

В зависимости от параметра `type` нужно передавать дополнительные параметры 

### type = 0 
Параметр | Описание
-------- | --------
amount_from | сумма расхода   
account_from | ID  счета

### type = 1
Параметр | Описание
-------- | --------
amount_to | сумма дохода 
account_to | ID  счета 

### type = 2
Параметр | Описание
-------- | --------
account_to | ID счета на который переводим деньги 
account_from | ID  счета с которого делаем перевод
amount_to | сумма перевода на счета  
amount_from | сумма перевода со счета

### Параметры ответа finance.updateTransactions

Параметр | Описание
-------- | --------
response | ID измененной транзакции
