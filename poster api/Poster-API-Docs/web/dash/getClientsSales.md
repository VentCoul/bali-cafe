## dash.getClientsSales: Получить продажи по клиентам

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/dash.getClientsSales
?token=687409:4164553abf6a031302898da7800b59fb
&dateFrom=20240920
&dateTo=20240922';


```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/dash.getClientsSales'
  . '?token=687409:4164553abf6a031302898da7800b59fb'
  . '&dateFrom=20240920'
  . '&dateTo=20240922';

$data = sendRequest($url);
```
#### **Postman**

```json

url = https://joinposter.com/api/dash.getClientsSales
    ?token=687409:4164553abf6a031302898da7800b59fb
    &dateFrom=20240920
    &dateTo=20240922

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Приклад ответа</summary>

```json

{
  "response":[
    {
      "client_id": "4",
      "firstname":"",
      "lastname": "Владислав",
      "sum": "1030000",
      "profit": "825364",
      "profit_netto":"687803",
      "revenue": "907000",
      "clienst": "3",
      "middle_invoice":3433.3333333333
    }
  ]
}
```
</details>

Метод возвращает продажи по клиентам.

### HTTP GET запрос

`GET https://joinposter.com/api/dash.getClientsSales`

### GET-параметры запроса dash.getClientsSales

| Параметр | Описание                                                                                           |
|----------|----------------------------------------------------------------------------------------------------|
| dateFrom | Дата начала для выборки в формате `Ymd`. Если не указана, начальная дата считается на месяц позже. |
| dateTo   | Дата конца для выборки в формате `Ymd`. Если не указана, конечная дата считается текущей.          |

### Параметры ответа dash.getClientsSales

| Параметр | Описание      |
|----------|---------------|
| response | Объект ответа |

Внутри параметра `response` лежит массив объектов. Внутри каждого объекта есть следующие параметры:

| Параметр       | Описание                                                                                                 |
|----------------|----------------------------------------------------------------------------------------------------------|
| client_id      | ID клиента                                                                                               |
| firstname      | Имя клиента                                                                                              |
| lastname       | Фамилия клиента                                                                                          |
| sum            | Общая сумма заказов в копейках                                                                           |
| profit         | Прибыль в копейках                                                                                       |
| profit_netto   | Прибыль без НДС в копейках. Возвращается если включена настройка «Считать себестоимость и прибыль нетто». |
| revenue        | Сумма выручки в копейках                                                                                 |
| clients        | Количество чеков                                                                                         |
| middle_invoice | Сумма среднего чека в гривнах                                                                            |
