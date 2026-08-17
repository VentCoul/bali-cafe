## finance.closeCashShift: Закрытие кассовой смены

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.closeCashShift
?token=687409:4164553abf6a031302898da7800b59fb';

const cash_shift = {
  cash_shift_id: 335,
  user_id: 3,
  amount: 234.56,
  time: '2024-09-21 20:00',
  is_fiscal: 1,
  comment: 'бар',
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.closeCashShift'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$cash_shift = [
    'cash_shift_id' => 335,
    'user_id'       => 3,
    'amount'        => 234.56,
    'time'          => '2024-09-21 20:00',
    'is_fiscal'     => 1,
    'comment'       => 'бар',
];

$data = sendRequest($url, 'post', $cash_shift);
```
#### **Postman**

```json

url = https://joinposter.com/api/finance.closeCashShift
 ?token=687409:4164553abf6a031302898da7800b59fb
        
{
    "cash_shift_id": 335,
    "user_id": 3,
    "amount": 234.56,
    "time": "2024-09-21 20:00",
    "is_fiscal": 1,
    "comment": "бар"
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

Метод закрывает кассовую смену.

### HTTP POST запрос

`POST https://joinposter.com/api/finance.closeCashShift`

### POST-параметры запроса finance.closeCashShift

| Параметр      | Описание                                                                                                                 |
|---------------|--------------------------------------------------------------------------------------------------------------------------|
| cash_shift_id | ID кассовой смены                                                                         |
| user_id       | ID сотрудника                                                                                    |
| amount        | Сумма в кассе при закрытии кассовой смены в гривнах                                                                      |
| time          | Дата и время закрытия кассовой смены с точностью до минут в формате `Y-m-d H:i`                                          |
| is_fiscal     | Признак, что транзакция закрытия кассовой смены фискальная: 0 — не фискальная, 1 — фискальная. По умолчанию принимает 0. |
| comment       | Комментарий к кассовой смене. По умолчанию не передаётся.                                                                |

### Параметры ответа finance.closeCashShift

| Параметр | Описание                                    |
|----------|---------------------------------------------|
| response | `true`, если кассовая смена успешно закрыта |
