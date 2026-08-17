## finance.createCashShiftTransaction: Создание транзакции кассовой смены

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.createCashShiftTransaction
?token=687409:4164553abf6a031302898da7800b59fb';

const cash_shift_transaction = {
  cash_shift_id: 333,
  type_id: 3,
  category_id: 4,
  user_id: 1,
  amount: 499.99,
  time: '2024-09-21 15:00',
  is_fiscal: 1,
  comment: 'Расход',
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.createCashShiftTransaction'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$cash_shift_transaction = [
    'cash_shift_id' => 333,
    'type_id'       => 3,
    'category_id'   => 4,
    'user_id'       => 1,
    'amount'        => 499.99,
    'time'          => '2024-09-21 15:00',
    'is_fiscal'     => 1,
    'comment'       => 'Расход',
];

$data = sendRequest($url, 'post', $cash_shift_transaction);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.createCashShiftTransaction
 ?token=687409:4164553abf6a031302898da7800b59fb

{
    "cash_shift_id": 333,
    "type_id": 3,
    "category_id": 4,
    "user_id": 1,
    "amount": 499.99,
    "time": "2024-09-21 15:00",
    "is_fiscal": 1,
    "comment": "Расход"
  }

```
<!-- tabs:end -->
</details>

<details open>
<summary>Пример ответа</summary>

</details>
        
```json
{  
  "response":{  
    "cash_shift_transaction_id":1649
  }
}
```
</details>

Метод создаёт транзакцию кассовой смены.

### HTTP POST запрос

`POST https://joinposter.com/api/finance.createCashShiftTransaction`

### POST-параметры запроса finance.createCashShiftTransaction

| Параметр      | Описание                                                                                                                          |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------|
| cash_shift_id | ID кассовой смены                                                                                        |
| type_id       | Тип транзакции кассовой смены: 2 — доход, 3 — расход, 4 — инкассация.                                        |
| category_id   | ID финансовой категории. Обязательное поле, если тип транзакции кассовой смены 2 или 3  и к заведению привязан счёт для наличных. |
| user_id       | ID сотрудника                                                                                          |
| amount        | Сумма транзакции кассовой смены                                                                                                   |
| time          | Дата и время транзакции кассовой смены в формате `Y-m-d H:i`                                                                      |
| is_fiscal     | Признак, что транзакция кассовой смены фискальная: 0 — не фискальная, 1 — фискальная. По умолчанию принимает 0.                   |
| comment       | Комментарий                                                                                                                       |

### Параметры ответа finance.createCashShiftTransaction

| Параметр | Описание      |
|----------|---------------|
| response | Объект ответа |

Внутри параметра `response` лежит объект, внутри которого есть следующие параметры:

| Параметр                  | Описание                     |
|---------------------------|------------------------------|
| cash_shift_transaction_id | ID транзакции кассовой смены |
