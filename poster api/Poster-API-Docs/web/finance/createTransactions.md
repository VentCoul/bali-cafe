## finance.createTransactions: Создание новой транзакции

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.createTransactions?token=687409:4164553abf6a031302898da7800b59fb';

const transaction = {
  id: 1,
  type: 2,
  category: 7,
  user_id: 4,
  amount_from: 1000,
  amount_to: 900,
  account_from: 1,
  account_to: 2,
  date: '2024-11-16 22:15:32',
  comment: 'Моя тестовая транзакция',
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.createTransactions'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$transaction = [
    'id'             => 1,
    'type'           => 2,
    'category'       => 7,
    'user_id'        => 4,
    'amount_from'    => 1000,
    'amount_to'      => 900,
    'account_from'   => 1,
    'account_to'     => 2,
    'date'           => '2024-11-16 22:15:32',
    'comment'        => 'Моя тестовая транзакция',
    'agreement_date' => '2021-11-17 22:15:32',
];

$data = sendRequest($url, 'post', $transaction);

```
#### **Postman**

```json

url = https://joinposter.com/api/finance.createTransactions
 ?token=687409:4164553abf6a031302898da7800b59fb

{
  "id": 1,
  "type": 2,
  "category": 7,
  "user_id": 4,
  "amount_from": 1000,
  "amount_to": 900,
  "account_from": 1,
  "account_to": 2,
  "date": "2021-11-16 22:15:32",
  "comment": "Моя тестовая транзакция"
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

Метод создает новую транзакцию. 

### HTTP POST запрос

`POST https://joinposter.com/api/finance.createTransactions`

### POST-параметры запроса finance.createTransactions

| Параметр | Описание                                                  |
|----------|-----------------------------------------------------------|
| id       | ID группы                                                 |
| type     | Тип транзакции: 0 — расход, 1 — доход, 2 — перевод        |
| category | ID категории                                              |
| user_id  | ID пользователя                                           |
| date     | Дата дата добавления в формате `dmY` или `Y-m-d H:i:s`    |
| comment  | Комментарий к финансовой транзакции, по умолчанию не передается |
| agreement_date | Дата соглашения, необязательный параметр                  |

В зависимости от параметра `type` нужно передавать дополнительные параметры 

### type — 0 
| Параметр     | Описание                |
|--------------|-------------------------|
| amount_from  | Сумма расхода в гривнах |
| account_from | ID счета                |

### type — 1
| Параметр   | Описание               |
|------------|------------------------|
| amount_to  | Сумма дохода в гривнах |
| account_to | ID счета               |

### type — 2
| Параметр     | Описание                             |
|--------------|--------------------------------------|
| account_to   | ID счета на который переводим деньги |
| account_from | ID  счета с которого делаем перевод  |
| amount_to    | Сумма перевода на счет в гривнах     |
| amount_from  | Сумма перевода со счета в гривнах    |

### Параметры ответа finance.createTransactions

| Параметр | Описание                |
|----------|-------------------------|
| response | ID созданной транзакции |
