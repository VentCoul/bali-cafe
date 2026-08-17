## storage/butcheries/{id}: Получение одной переработки

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/storage/butcheries/1'
    . '?token=687409:4164553abf6a031302898da7800b59fb';

$data = sendRequest($url, 'get');
```

> Пример ответа:

```json
{
  "response": {
    "id": 3,
    "date": "2024-09-16T11:36:00.000000Z",
    "comment": "",
    "userId": 1,
    "fromIngredients": [
      {
        "ingredientId": 71,
        "storageId": 1,
        "name": "Семга",
        "unit": "kg",
        "count": 5,
        "sum": 2500,
        "sumNetto": 2500
      }
    ],
    "toIngredients": [
      {
        "ingredientId": 87,
        "storageId": 1,
        "name": "Семга стейк",
        "unit": "kg",
        "count": 1,
        "selfpricePercent": 40,
        "sum": 1000,
        "sumNetto": 1000
      },
      {
        "ingredientId": 844,
        "storageId": 1,
        "name": "семга филе",
        "unit": "kg",
        "count": 0.5,
        "selfpricePercent": 60,
        "sum": 1500,
        "sumNetto": 1500
      }
    ]
  }
}
```

Метод возвращает одну переработку ингредиентов по заданному ID.

### HTTP запрос

`GET https://joinposter.com/api/storage.getButchery/{id}`

### Параметры ответа storage.getButchery

Параметр | Описание
-------- | --------
id | ID переработки
date | Дата переработки в формате ISO 8601
comment | Комментарий к переработке
userId | ID пользователя, создавшего переработку
fromIngredients | Массив исходных ингредиентов
toIngredients | Массив полученных ингредиентов

### Возможные ответы

HTTP-код | Описание
-------- | --------
200 | Запрос выполнен успешно
404 | Переработка не найдена
500 | Внутренняя ошибка сервера

### Возможные ошибки

HTTP-код | Описание | Код | Сообщение
-------- | -------- | --- | --------
200 | Переработки недоступны из-за ограничений тарифного плана | 512 | Pricing plan restriction
404 | Переработка не найдена | 32 | Butchery is undefined
