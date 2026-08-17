## settings.getPaymentMethod: Свойства метода оплаты

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/settings.getPaymentMethod'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&payment_method_id=3';

$data = sendRequest($url);
```

> cURL пример:  
```php
curl -X GET \
  'https://joinposter.com/api/settings.getPaymentMethod?token=687409:4164553abf6a031302898da7800b59fb&payment_method_id=3' \
```

> Пример ответа:

```json
{
  "response":
    {
      "payment_method_id": 3,
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
    }
}
```

Метод возвращает свойства метода оплаты в разделе настроек.

### HTTP GET запрос

`GET https://joinposter.com/api/settings.getPaymentMethod`

### GET-параметры запроса settings.getPaymentMethod

Параметр | Описание
-------- | --------
payment_method_id | Обязательный параметр, ID метода оплаты

### Параметры ответа settings.getPaymentMethod

Параметр | Описание
-------- | --------
response | Объект ответа

Внутри `response` лежит объект c параметрами:

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
