## clients.getClients: Список клиентов

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.getClients
?token=687409:4164553abf6a031302898da7800b59fb
&num=100
&offset=0';

```
#### **PHP**
```php

<?php
$url = 'https://joinposter.com/api/clients.getClients'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&num=100'
 . '&offset=0';

$data = sendRequest($url);

```
#### **Postman**

```json

url = https://joinposter.com/api/clients.getClients
 ?token=687409:4164553abf6a031302898da7800b59fb
 &num=100
 &offset=0

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "response":[  
    {  
      "client_id":"55",
      "firstname":"",
      "lastname":"Антон",
      "patronymic":"",
      "discount_per":"0",
      "bonus":"10000",
      "total_payed_sum":"0",
      "date_activale":"2017-10-09 15:28:14",
      "phone":"+380981111111",
      "phone_number":"380981111111",
      "email":"bezmuki@gmail.com",
      "birthday":"0000-00-00",
      "card_number":"0",
      "client_sex":"0",
      "country":"Украина",
      "city":"Киев",
      "comment":"",
      "address":"улица Крещатик дом 1 этаж 2",
      "addresses": [
          {
            "id": 2,
            "delivery_zone_id": null,
            "country": "Украина",
            "city": "Киев",
            "address1": "улица Крещатик дом 1",
            "address2": "этаж 2",
            "comment": "",
            "lat": null,
            "lng": null,
            "zip_code": "",
            "sort_order": 0
          }
         ],
      "client_groups_id":"3",
      "client_groups_name":"Накопительная скидка",
      "client_groups_discount":"0",
      "loyalty_type":"1",
      "birthday_bonus":"0",
      "delete":"0",
      "ewallet": "0"
    },
    {  
      "client_id":"54",
      "firstname":"",
      "lastname":"Вася",
      "patronymic":"",
      "discount_per":"0",
      "bonus":"10000",
      "total_payed_sum":"0",
      "date_activale":"2017-10-09 11:39:59",
      "phone":"+380981111112",
      "phone_number":"380981111112",
      "email":"sdfs@ffy.hu",
      "birthday":"0000-00-00",
      "card_number":"0",
      "client_sex":"0",
      "country":"Ukraine",
      "city":"Kyiv",
      "comment":"",
      "address":"Khreshchatyk, 1, house 1, floor 2",
      "addresses": [
          {
            "id": 3,
            "delivery_zone_id": null,
            "country": "Ukraine",
            "city": "Kyiv",
            "address1": "Khreshchatyk, 1",
            "address2": "house 1, floor 2",
            "comment": "",
            "lat": null,
            "lng": null,
            "zip_code": "",
            "sort_order": 0
          }
         ],
      "client_groups_id":"2",
      "client_groups_name":"Скидка Выходной",
      "client_groups_discount":"15",
      "loyalty_type":"1",
      "birthday_bonus":"0",
      "delete":"0",
      "ewallet": "0"
    }
  ]
}
```
</details>

Метод возвращает список клиентов.

### HTTP GET запрос

`GET https://joinposter.com/api/clients.getClients`

### GET-параметры запроса clients.getClients

| Параметр       | Описание                                                                                                                        |
|----------------|---------------------------------------------------------------------------------------------------------------------------------|
| num            | Количество клиентов, которое необходимо получить. По умолчанию не передаётся.                                                   |
| offset         | Количество клиентов, которое необходимо пропустить от начала. По умолчанию не передаётся.                                       |
| group_id       | ID группы клиентов. По умолчанию не передаётся.                                                                                 |
| phone          | Номер телефона клиента в международном формате. По умолчанию не передаётся.                                                     |
| birthday       | Дата дня рождения клиентов, формат "md". По умолчанию не передаётся.                                                            |
| client_id_only | Опциональный параметр, позволяет возвращать только `client_id` клиентов. В качестве значения необходимо указать `true`.         |
| 1c             | Позволяет вернуть в ответе ID клиента в системе 1С. В качестве значения необходимо передать `true`. По умолчанию не передаётся. |
| order_by       | Поле, по которому происходит сортировка. По умолчанию принимает `client_id`.                                                    |
| sort           | Порядок сортировки: `asc` — по возрастанию, `desc` — по убыванию. По умолчанию принимает `desc`.                                |
| loyalty_type   | Тип лояльности: 1 — бонусная, 2 — скидочная. По умолчанию не передаётся.                                                        |

!> Если `num` и `offset` не указывать, то будут возвращены все клиенты без постраничной разбивки

### Параметры ответа clients.getClients

| Параметр | Описание        |
|----------|-----------------|
| response | Массив объектов |

Внутри параметра `response` лежит массив, в каждом элементе которого есть параметры:

| Параметр               | Описание                                                                                                                                                                   |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| client_id              | ID клиента                                                                                                                                                                 |
| firstname              | Имя клиента                                                                                                                                                                |
| lastname               | Фамилия клиента                                                                                                                                                            |
| patronymic             | Отчество клиента                                                                                                                                                           |
| discount_per           | Персональный процент скидки или бонусов. Будет использоваться, если больше, чем процент группы клиента.                                                                    |
| bonus                  | Текущий размер накопленных бонусов клиента в копейках.                                                                                                                      |
| total_payed_sum        | Общая сумма покупок в копейках                                                                                                                                             |
| date_activale          | Дата создания клиента                                                                                                                                                      |
| phone                  | Телефон клиента                                                                                                                                                            |
| phone_number           | Телефон клиента в формате цифр                                                                                                                                             |
| email                  | Адрес электронной почты клиента                                                                                                                                            |
| birthday               | Дата рождения клиента                                                                                                                                                      |
| card_number            | Номер карты                                                                                                                                                                |
| client_sex             | Пол клиента: 0 — не указан, 1 — мужской, 2 — женский.                                                                                                                       |
| country                | Страна клиента                                                                                                                                                             |
| city                   | Город клиента                                                                                                                                                              |
| address                | Адрес клиента                                                                                                                                                              |
| addresses              | Адреса доставки клиента                                                                                                                                                    |
| comment                | Комментарий к учетной записи клиента                                                                                                                                       |
| id_1c                  | ID клиента в системе 1С                                                                                                                                                    |
| client_groups_id       | ID группы клиента                                                                                                                                                          |
| client_groups_name     | Название группы клиента                                                                                                                                                    |
| loyalty_type           | Тип группы клиента: 1 — бонусная, 2 — скидочная                                                                                                                            |
| client_groups_discount | Процент группы. Если группа бонусная — 1, то будет начислять бонусы на оплаченную сумму заказа. Если группа скидочная — 1, то будет давать процент скидки на сумму заказа. |
| birthday_bonus         | Количество бонусов в копейках начисляемые в день рождения клиента. Используется только бонусными группами.                                                                 |
| delete                 | Удален: 0 — нет, 1 — да                                                                                                                                                    |
| ewallet                | Баланс депозита в копейках                                                                                                                                                 |

Внутри параметра `addresses` лежит массив, в каждом элементе которого должны быть параметры:

| Параметр         | Описание                                       |
|------------------|------------------------------------------------|
| id               | ID адреса доставки                             |
| delivery_zone_id | ID зоны доставки                               |
| country          | Страна                                         |
| city             | Город                                          |
| address1         | Улица и номер дома                             |
| address2         | Дополнительно: подъезд, этаж, квартира и т. д. |
| comment          | Комментарий                                    |
| lat              | Широта                                         |
| lng              | Долгота                                        |
| zip_code         | Почтовый индекс                                |
| sort_order       | Порядок сортировки                             |
