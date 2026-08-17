## finance.getCashShiftTransactions: Список транзакций кассовой смены

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.getCashShiftTransactions
?token=687409:4164553abf6a031302898da7800b59fb&shift_id=333';


```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.getCashShiftTransactions'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&shift_id=333';

$data = sendRequest($url);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.getCashShiftTransactions
 ?token=687409:4164553abf6a031302898da7800b59fb
 &shift_id=333

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "response":[  
    {  
      "shift_tr_id":1648,
      "shift_id":333,
      "time":1505980800000,
      "type":5,
      "tr_amount":10000,
      "user_id":3,
      "comment":"бар",
      "shift_tr_id_edit":0,
      "user_id_edit":0,
      "edit_time":0,
      "edit":0,
      "delete":0,
      "is_fiscal":0
    },
    {  
      "shift_tr_id":1647,
      "shift_id":333,
      "time":1505977200000,
      "type":1,
      "tr_amount":10000,
      "user_id":3,
      "comment":"",
      "shift_tr_id_edit":0,
      "user_id_edit":0,
      "edit_time":0,
      "edit":0,
      "delete":0,
      "is_fiscal":1
    }
  ]
}
```
</details>

Метод возвращает список транзакций кассовой смены.

### HTTP запрос

`GET https://joinposter.com/api/finance.getCashShiftTransactions`

### GET-параметры запроса finance.getCashShiftTransactions

Параметр | Описание
-------- | --------
shift_id | Обязательный параметр, ID кассовой смены по которой возвращать транзкации.

### Параметры ответа finance.getCashShiftTransactions

Параметр | Описание
-------- | --------
response | Массив транзакций кассовой смены

Внутри параметра `response` лежит массив, в каждом элементе которого есть параметры:

Параметр | Описание
-------- | --------
shift_tr_id | ID транзакции кассовой смены
shift_id | ID кассовой смены
time | Дата и время транзакции кассовой смены, формат microtime
type | Тип транзакции кассовой смены: 1 — открытие, 2 — доход, 3 — расход, 4 — инкассация, 5 — закрытие.
tr_amount | Сумма транзакции кассовой смены
user_id | ID сотрудника
comment | Комментарий
shift_tr_id_edit | ID транзакции кассовой смены от которой было редактирование. Если редактирования не было, возвращает 0.
user_id_edit | ID сотрудника который редактировал транзакцию кассовой смены. Если редактирования не было, возвращает 0.
edit_time | Время редактирования транзакции кассовой смены. Если редактирования не было, возвращает 0.
edit | Признак, что транзакция кассовой смены отредактирована: 0 — не редактировалась, 1 — редактировалась.
delete | Признак, что транзакция кассовой смены удалена: 0 — не удалена, 1 — удалена.
is_fiscal | Признак, что транзакция кассовой смены фискальная: 0 — не фискальная, 1 — фискальная.
