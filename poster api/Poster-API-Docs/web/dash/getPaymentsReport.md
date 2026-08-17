## dash.getPaymentsReport: Получить статистику по дням/месяцам

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/dash.getPaymentsReport
?token=687409:4164553abf6a031302898da7800b59fb
&date_from=20240501
&date_to=20240531'

    
```

#### **PHP**

```php
    
v
```
#### **Postman**

```json

url = https://joinposter.com/api/dash.getPaymentsReport
    ?token=687409:4164553abf6a031302898da7800b59fb
    &dateFrom=20240920
    &dateTo=20240922

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
    "response": {
        "days": [
            {
                "date": "2024-05-23",
                "payed_cash_sum": "1607996",
                "payed_card_sum": "365552",
                "payed_cert_in_sum": "0",
                "payed_cert_out_sum": "0",
                "payed_bonus_sum": "0",
                "payed_incust_sum": "0",
                "payed_sum_sum": "1973548"
            },
            {
                "date": "2024-06-03",
                "payed_cash_sum": "1108969",
                "payed_card_sum": "1090915",
                "payed_cert_in_sum": "0",
                "payed_cert_out_sum": "0",
                "payed_bonus_sum": "0",
                "payed_incust_sum": "0",
                "payed_sum_sum": "2199884"
            }
        ],
        "total": {
            "payed_cash_sum": 2716965,
            "payed_card_sum": 1456467,
            "payed_third_party_sum": 0,
            "payed_cert_in_sum": 0,
            "payed_cert_out_sum": 0,
            "payed_bonus_sum": 0,
            "payed_incust_sum": 0,
            "payed_sum_sum": 4173432
        }
    }
}
```
</details>

<details open> 
<summary>Пример ответа по месяцам</summary>

```json
{
    "response": {
        "days": [
            {
                "date": "2024-06",
                "payed_cash_sum": "27286420",
                "payed_card_sum": "1951853",
                "payed_cert_in_sum": "0",
                "payed_cert_out_sum": "0",
                "payed_bonus_sum": "0",
                "payed_incust_sum": "0",
                "payed_sum_sum": "29234560"
            },
            {
                "date": "2024-05",
                "payed_cash_sum": "60273456",
                "payed_card_sum": "6290658",
                "payed_cert_in_sum": "0",
                "payed_cert_out_sum": "0",
                "payed_bonus_sum": "0",
                "payed_incust_sum": "0",
                "payed_sum_sum": "66564114"
            },
            {
                "date": "2024-04",
                "payed_cash_sum": "49090724",
                "payed_card_sum": "4782295",
                "payed_cert_in_sum": "0",
                "payed_cert_out_sum": "0",
                "payed_bonus_sum": "0",
                "payed_incust_sum": "0",
                "payed_sum_sum": "53873019"
            }
        ],
        "total": {
            "payed_cash_sum": 136650600,
            "payed_card_sum": 13024806,
            "payed_third_party_sum": 0,
            "payed_cert_in_sum": 0,
            "payed_cert_out_sum": 0,
            "payed_bonus_sum": 0,
            "payed_incust_sum": 0,
            "payed_sum_sum": 149671693
        }
    }
}
```
</details>

Метод возвращает статистику оплат по дням. При отрезке времени больше чем 65 дней — по месяцам.

### HTTP GET запрос

`GET https://joinposter.com/api/dash.getPaymentsReport`

### GET-параметры запроса dash.getPaymentsReport

| Параметр  | Описание                                                                                                 |
|-----------|----------------------------------------------------------------------------------------------------------|
| spot_id   | Опциональный параметр, ID заведения по которому возвращать статистику.                                    |
| date_from | Опциональный параметр, дата начала выборки в формате `Ymd`, включительно. По умолчанию дата месяц назад. |
| date_to   | Опциональный параметр, дата конца выборки в формате `Ymd`, включительно. По умолчанию дата текущего дня. |

### Параметры ответа dash.getPaymentsReport

| Параметр | Описание                                  |
|----------|-------------------------------------------|
| days     | Список дней/месяцов в которых были оплаты |
| total    | Общие суммы по всем дням                  |

Внутри элемента `days` лежит массив, в каждом элементе которого есть следующие свойства:

| Параметр           | Описание                                                                                                                                          |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| date               | Дата в формате `Y-m-d` или `Y-m` при выводе по месяцам                                                                                            |
| payed_cash_sum     | Оплата наличными в копейках                                                                                                                       |
| payed_card_sum     | Оплата карточкой в копейках                                                                                                                       |
| payed_cert_in_sum  | Оплата сертификатом в копейках. Приходит если в настройках администрирования включена опция "Учитывать оплату сертификатом".                      |
| payed_cert_out_sum | Оплата сертификатом в копейках. Приходит если в настройках администрирования выключена опция "Учитывать оплату сертификатом" и равноценна скидке. |
| payed_bonus_sum    | Оплата бонусами                                                                                                                                   |
| payed_incust_sum   | Оплата incust                                                                                                                                     |
| payed_sum_sum      | Общая сумма оплат за этот день в копейках.                                                                                                         |

Внутри элемента `total` есть следующие свойства:

| Параметр              | Описание                                                                                                                                                     |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| payed_cash_sum        | Общая сумма оплат наличными в копейках                                                                                                                       |
| payed_card_sum        | Общая сумма оплат карточкой в копейках                                                                                                                       |
| payed_third_party_sum | Общая сумма оплат третьей стороной                                                                                                                           |
| payed_cert_in_sum     | Общая сумма оплат сертификатом в копейках. Приходит если в настройках администрирования включена опция "Учитывать оплату сертификатом".                      |
| payed_cert_out_sum    | Общая сумма оплат сертификатом в копейках. Приходит если в настройках администрирования выключена опция "Учитывать оплату сертификатом" и равноценна скидке. |
| payed_bonus_sum       | Общая сумма оплат бонусами                                                                                                                                   |
| payed_incust_sum      | Общая сумма оплат incust                                                                                                                                     |
| payed_sum_sum         | Общая сумма всех оплат в копейках                                                                                                                            |
