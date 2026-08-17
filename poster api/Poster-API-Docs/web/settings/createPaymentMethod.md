## settings.createPaymentMethod: Создание метода оплаты

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/settings.createPaymentMethod'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$paymentMethod = [
    'title' => 'New method',
    'money_type' => 2,
    'color' => 'red',
    'is_active' => 1,
    'percent_acquiring' => [
        1 => 5.125,
    ],
];

$data = sendRequest($url, 'post', $paymentMethod);
```

> cURL пример:  
```php
curl -X POST \
  'https://joinposter.com/api/settings.createPaymentMethod?token=687409:4164553abf6a031302898da7800b59fb' \
  -H 'Content-Type: application/json' \
  -d '{
     "title":"New method",
     "money_type":2,
     "color":"red",
     "is_active":1,
     "percent_acquiring":
        {
           1:5.125
        }
}'
```

> Пример ответа:

```json
{
  "response": 12
}
```

Метод создает пользовательский метод оплаты.

### HTTP POST запрос

`POST https://joinposter.com/api/settings.createPaymentMethod`

### POST-параметры запроса settings.createPaymentMethod

Параметр | Описание
-------- | --------
title | Обязательный параметр. Название метода оплаты
money_type | Обязательный параметр. Тип оплаты: 1 - наличные, 2 - карта
color | Необязательный параметр. Цвет иконки: 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'navy-blue', 'purple', 'black', 'mint-blue', 'lime-green', 'pink'
is_active | Необязательный параметр. Флаг активности
percent_acquiring | Необязательный параметр. Массив с процентом за эквайринг по заведениям. Ключ массива — id заведения.

### Параметры ответа settings.createPaymentMethod

Параметр | Описание
-------- | --------
response | ID созданного метода оплаты

