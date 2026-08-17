## PUT storage/butcheries/{id}: Редактирование переработки

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/storage/butcheries/1'
    . '?token=687409:4164553abf6a031302898da7800b59fb';

$butchery = [
    "date" => "2024-09-16T11:36Z",
    "comment" => "",
    "fromIngredients" => [
        [
            "ingredientId" => 71,
            "storageId" => 1,
            "count" => 5
        ]
    ],
    "toIngredients" => [
        [
            "ingredientId" => 87,
            "storageId" => 1,
            "count" => 1,
            "selfpricePercent" => 40
        ],
        [
            "ingredientId" => 844,
            "storageId" => 1,
            "count" => 0.5,
            "selfpricePercent" => 40
        ],
        [
            "ingredientId" => 70,
            "storageId" => 1,
            "count" => 2.5,
            "selfpricePercent" => 20
        ]
    ]
];

$data = sendRequest($url, 'put', $butchery);
```

> Пример ответа:

```json
{
    "response": {
        "id": 2,
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
                "selfpricePercent": 40,
                "sum": 1000,
                "sumNetto": 1000
            },
            {
                "ingredientId": 70,
                "storageId": 1,
                "name": "Семга с/с",
                "unit": "kg",
                "count": 2.5,
                "selfpricePercent": 20,
                "sum": 500,
                "sumNetto": 500
            }
        ]
    }
}
```

Метод редактирует существующую переработку ингредиентов.

### HTTP запрос

`PUT https://joinposter.com/api/storage/butcheries/{id}`

### PUT-параметры запроса storage/butcheries/{id}

Параметр | Описание
-------- | --------
date | Дата переработки в формате ISO 8601
comment | Комментарий к переработке
fromIngredients | Список ингредиентов, из которых происходит переработка
toIngredients | Список ингредиентов, полученных в результате переработки

### Содержимое массива `fromIngredients`

Параметр | Описание
-------- | --------
ingredientId | ID ингредиента
count | Количество в шт или кг
storageId | ID склада, с которого списываются ингредиенты

### Содержимое массива `toIngredients`

Параметр | Описание
-------- | --------
ingredientId | ID ингредиента
count | Количество в шт или кг
storageId | ID склада, на который поступают ингредиенты
selfpricePercent | Себестоимость ингредиента в процентах

### Параметры ответа storage/butcheries/{id}

Параметр | Описание
-------- | --------
id | ID переработки
date | Дата переработки в формате ISO 8601
comment | Комментарий к переработке
userId | ID пользователя, создавшего переработку
fromIngredients | Массив исходных ингредиентов с их характеристиками
toIngredients | Массив полученных ингредиентов с их характеристиками

### Возможные ответы

HTTP-код | Описание
-------- | --------
200 | Переработка успешно сохранена
404 | Переработка не найдена
422 | Ошибка валидации данных
500 | Внутренняя ошибка сервера

### Возможные ошибки

HTTP-код | Описание | Код | Сообщение
-------- | -------- | --- | --------
200 | Переработки недоступны из-за ограничений тарифного плана | 512 | Pricing plan restriction
422 | Дата не входит в инвентаризационный период | 219 | Make sure the date included in the 'date' request falls within the ongoing inventory check for the storage with ID 1
422 | Ингредиент не найден | 32 | Ingredient is undefined
404 | Переработка не найдена | 32 | Butchery is undefined
422 | Склад не найден | 32 | Storage is undefined
422 | Общая себестоимость всех ингредиентов не равна 100% | 221 | The value for total selfpricePercent must be exactly 100.
