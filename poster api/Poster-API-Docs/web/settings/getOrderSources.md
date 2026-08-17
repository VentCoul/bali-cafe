## settings.getOrderSources: Свойства источников заказа

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/settings.getOrderSources'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$data = sendRequest($url);
```

> cURL пример:
```php
curl -X GET \
  'https://joinposter.com/api/settings.getOrderSources?token=687409:4164553abf6a031302898da7800b59fb' \
```

> Пример ответа:

```json
{
      "response": [
        {
          "id": 1,
          "name": "В заведении",
          "visible": 1,
          "type": 0
        },
        {
          "id": 2,
          "name": "С собой",
          "visible": 1,
          "type": 0
        },
        {
          "id": 3,
          "name": "Bold food",
          "visible": 1,
          "type": 1
        }
      ]
}
```

Метод возвращает свойства источников заказа в разделе настроек.

### HTTP GET запрос

`GET https://joinposter.com/api/settings.getOrderSources`


### Параметры ответа settings.getOrderSources

Параметр | Описание
-------- | --------
response | Объект ответа

Внутри `response` лежит объект c параметрами:

Параметр | Описание
-------- | --------
id | ID источника заказа
name | Название источника заказа
visible | Отображать на POS-терминале. 1 - да, 0 - нет.
type | Тип: 0 - создан по умолчанию, 1 - создан пользователем.
