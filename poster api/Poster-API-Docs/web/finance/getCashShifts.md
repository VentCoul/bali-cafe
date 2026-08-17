## finance.getCashShifts: Список кассовых смен

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.getCashShifts
?token=687409:4164553abf6a031302898da7800b59fb
&dateFrom=20170701
&dateTo=20170901';


```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.getCashShifts'
    . '?token=687409:4164553abf6a031302898da7800b59fb'
    . '&dateFrom=20170701'
    . '&dateTo=20170901';

$data = sendRequest($url);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.getCashShifts
    ?token=687409:4164553abf6a031302898da7800b59fb
    &dateFrom=20170701
    &dateTo=20170901

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "response":[  
    {  
      "cash_shift_id":333,
      "spot_id":1,
      "timestart":1505977200000,
      "timeend":1505980800000,
      "date_start": "2024-10-18 13:45:46",
      "date_end": "2024-10-18 23:00:00",
      "amount_start":10000,
      "amount_end":10000,
      "amount_debit":0,
      "amount_sell_cash":0,
      "amount_sell_card":0,
      "amount_credit":0,
      "amount_collection":0,
      "user_id_start":3,
      "user_id_end":3,
      "comment":"Бар",
      "spot_name":"Киоск",
      "spot_adress":"ул. Вокзальная, 12",
      "table_num":"0"
    }
  ]
}
```
</details>


Метод возвращает список кассовых смен.

### HTTP GET запрос

`GET https://joinposter.com/api/finance.getCashShifts`

### GET-параметры запроса finance.getCashShifts

| Параметр | Описание                                                                                                    |
|----------|-------------------------------------------------------------------------------------------------------------|
| spot_id  | Опциональный параметр, ID заведения по которому возвращать статистику                                       |
| dateFrom | Обязательный параметр, дата начала выборки в формате `Ymd`, включительно. По умолчанию дата месяц назад.    |
| dateTo   | Обязательный параметр, дата конца выборки в формате `Ymd`, включительно. По умолчанию дата текущего дня.    |
| timezone | Опциональный параметры, если равен `client` то date_start и date_end возвращаются в часовом поясе аккаунта. |

### Параметры ответа finance.getCashShifts

| Параметр | Описание             |
|----------|----------------------|
| response | Массив кассовых смен |

Внутри параметра `response` лежит массив, в каждом элементе которого есть параметры:

| Параметр          | Описание                                                   |
|-------------------|------------------------------------------------------------|
| cash_shift_id     | ID кассовой смены                                          |
| spot_id           | ID заведения                                               |
| timestart         | Дата и время открытия кассовой смены, формат microtime     |
| timeend           | Дата и время закрытия кассовой смены, формат microtime     |
| date_start        | Дата и время открытия кассовой смены, формат “Y-m-d H:i:s” |
| date_end          | Дата и время закрытия кассовой смены, формат “Y-m-d H:i:s” |
| amount_start      | Сумма в кассе при открытии кассовой смены в копейках       |
| amount_end        | Сумма в кассе при закрытии кассовой смены в копейках       |
| amount_debit      | Сумма приходов в копейках                                  |
| amount_sell_cash  | Сумма выручки наличной оплаты в копейках                   |
| amount_sell_card  | Сумма выручки безналичной оплаты в копейках                |
| amount_credit     | Сумма расходов в копейках                                  |
| amount_collection | Сумма инкассаций в копейках                                |
| user_id_start     | ID сотрудника открывшего кассовую смену                    |
| user_id_end       | ID сотрудника закрывшего кассовую смену                    |
| comment           | Комментарий                                                |
| spot_name         | Название заведения                                         |
| spot_adress       | Адрес заведения                                            |
