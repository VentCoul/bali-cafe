## settings.getOrderSource: Свойства источника заказа

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/settings.getOrderSource'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&id=3';

$data = sendRequest($url);
```

> cURL пример:
```php
curl -X GET \
  'https://joinposter.com/api/settings.getOrderSource?token=687409:4164553abf6a031302898da7800b59fb&id=3' \
```

> Пример ответа:

```json
{
  "response":
    {
      "id": 3,
      "name": "Bold food",
      "visible": 1,
      "type": 1
    }
}
```

Метод возвращает свойства источника заказа в разделе настроек.

### HTTP GET запрос

`GET https://joinposter.com/api/settings.getOrderSource`

### GET-параметры запроса settings.getOrderSource

Параметр | Описание
-------- | --------
id | Обязательный параметр, id источника заказа

### Параметры ответа settings.getOrderSource

Параметр | Описание
-------- | --------
response | Объект ответа

Внутри `response` лежит объект c параметрами:

Параметр | Описание
-------- | --------
id | ID источника заказа
name | Название источника заказа
visible | Отображать на POS-кассе. 1 - да, 0 - нет.
type | Тип. 0 - создан по умолчанию, 1 - создан пользователем.
