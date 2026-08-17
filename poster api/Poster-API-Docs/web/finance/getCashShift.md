## finance.getCashShift: Свойства кассовой смены

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.getCashShift
?token=687409:4164553abf6a031302898da7800b59fb
&cash_shift_id=333';


```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.getCashShift'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&cash_shift_id=333';

$data = sendRequest($url);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.getCashShift
 ?token=687409:4164553abf6a031302898da7800b59fb
 &cash_shift_id=333

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "response":{  
    "cash_shift_id":333,
    "spot_id":1,
    "timestart":1505977200000,
    "timeend":1505980800000,
    "amount_start":10000,
    "amount_end":10000,
    "amount_debit":0,
    "amount_sell_cash":0,
    "amount_sell_card":0,
    "amount_credit":0,
    "amount_collection":0,
    "user_id_start":3,
    "user_id_end":3,
    "comment":"Бар"
  }
}
```
</details>

Метод возвращает свойства кассовой смены.

### HTTP GET запрос

`GET https://joinposter.com/api/finance.getCashShift`

### GET-параметры запроса finance.getCashShift

| Параметр      | Описание                                 |
|---------------|------------------------------------------|
| cash_shift_id | Обязательный параметр, ID кассовой смены |

### Параметры ответа finance.getCashShift

| Параметр | Описание      |
|----------|---------------|
| response | Объект ответа |

Внутри параметра `response` лежит объект, внутри которого есть параметры:

| Параметр          | Описание                                               |
|-------------------|--------------------------------------------------------|
| cash_shift_id     | ID кассовой смены                                      |
| spot_id           | ID заведения                                           |
| timestart         | Дата и время открытия кассовой смены, формат microtime |
| timeend           | Дата и время закрытия кассовой смены, формат microtime |
| amount_start      | Сумма в кассе при открытии кассовой смены в копейках   |
| amount_end        | Сумма в кассе при закрытии кассовой смены в копейках   |
| amount_debit      | Сумма приходов в копейках                              |
| amount_sell_cash  | Сумма выручки наличной оплаты в копейках               |
| amount_sell_card  | Сумма выручки безналичной оплаты в копейках            |
| amount_credit     | Сумма расходов в копейках                              |
| amount_collection | Сумма инкассаций в копейках                            |
| user_id_start     | ID сотрудника открывшего кассовую смену                |
| user_id_end       | ID сотрудника закрывшего кассовую смену                |
| comment           | Комментарий                                            |
