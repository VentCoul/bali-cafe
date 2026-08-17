## settings.getPaymentMethods: Свойства методов оплаты

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/settings.getPaymentMethods'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&money_type=2'
 . '&payment_type=7';

$data = sendRequest($url);
```
> cURL пример: 
```php
curl -X GET \
  'https://joinposter.com/api/settings.getPaymentMethods?token=687409:4164553abf6a031302898da7800b59fb&money_type=2&payment_type=7' \
```

> Пример ответа:

```json
{
  "response": [
    {
      "payment_method_id": 2,
      "title": "Карта",
      "icon": "/i/manage/payment_methods/card.png",
      "color": "",
      "money_type": 2,
      "payment_type": 2,
      "is_active": 1,
      "percents_acquiring": [
        {
          "spot_id": 1,
          "percent_acquiring": 0.0
        }
      ]
    },
    {
      "payment_method_id": 6,
      "title": "menu.ua",
      "icon": "/i/manage/payment_methods/menu_ua.png",
      "color": "",
      "money_type": 2,
      "payment_type": 7,
      "is_active": 0,
      "percents_acquiring": [
        {
          "spot_id": 1,
          "percent_acquiring": 0.0
        }
      ]
    }
  ]
}
```

Метод возвращает свойства методов оплаты в разделе настроек.

### HTTP GET запрос

`GET https://joinposter.com/api/settings.getPaymentMethods`

### GET-параметры запроса settings.getPaymentMethods

Параметр | Описание
-------- | --------
money_type | Необязательный параметр, тип оплаты: 1 - наличные, 2 - карта, 3 - другой
payment_type | Необязательный параметр, тип метода оплаты: 1 — наличные, 2 — безналичные, 4 — сертификат, 5 — депозит, 7 — пользовательский

### Параметры ответа settings.getPaymentMethods

Параметр | Описание
-------- | --------
response | Объект ответа

Внутри `response` лежит массив объектов со следующими параметрами:

Параметр | Описание
-------- | --------
payment_method_id | ID метода оплаты
title | Название метода оплаты
icon | Путь к иконке
color | Цвет иконки
money_type | Тип оплаты: 1 - наличные, 2 - карта, 3 - другой
payment_type | Тип метода оплаты: 1 — наличные, 2 — безналичные, 4 — сертификат, 5 — депозит, 7 — пользовательский
is_active | Флаг активности
percents_acquiring | Процент за эквайринг по заведениям

Внутри `percents_acquiring` лежит массив с параметрами:

Параметр | Описание
-------- | --------
spot_id | ID заведения
percent_acquiring | Процент за эквайринг по заведению
