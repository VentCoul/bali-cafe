## GET storage/butcheries: Получение списка переработок

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/storage/butcheries'
    . '?token=687409:4164553abf6a031302898da7800b59fb';

$data = sendRequest($url, 'get');
```

> Пример ответа:

```json
{
  "response": {
    "data": [
      {
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
    ],
    "pagination": {
      "total": 1,
      "perPage": 100,
      "currentPage": 1,
      "totalPages": 1
    }
  }
}
```

Метод возвращает список переработок ингредиентов.

### HTTP запрос

`GET https://joinposter.com/api/storage/butcheries`

### GET-параметры запроса storage/butcheries

Параметр | Описание
-------- | --------
page | Номер страницы для пагинации
perPage | Количество переработок на одной странице
dateFrom | Дата начала периода выборки в формате ISO 8601
dateTo | Дата окончания периода выборки в формате ISO 8601

### Параметры ответа storage/butcheries

Параметр | Описание
-------- | --------
data | Массив переработок с подробной информацией
pagination | Объект с информацией о пагинации, включая общее количество страниц, текущую страницу и количество переработок на странице

### Возможные ответы

HTTP-код | Описание
-------- | --------
200 | Запрос выполнен успешно
422 | Ошибка валидации параметров
500 | Внутренняя ошибка сервера

### Возможные ошибки

HTTP-код | Описание | Код | Сообщение
-------- | -------- | --- | --------
200 | Переработки недоступны из-за ограничений тарифного плана | 512 | Pricing plan restriction
422 | Неправильное значение параметра `page` | 164 | Page field must be integer
422 | Неправильное значение параметра `perPage` | 164 | PerPage field must be integer
422 | Неправильный формат даты в параметрах `dateFrom`, `dateTo` | 186 | Invalid date format
