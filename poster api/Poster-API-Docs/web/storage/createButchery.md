## POST storage/butcheries: Создание переработки

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/storage/butcheries'
    . '?token=687409:4164553abf6a031302898da7800b59fb';

$butchery = [
    "date"          => date("Y-m-d H:i:s"),
    "comment"       => "",
    "fromIngredients" => [
        [
            "ingredientId"   => 71,
            "storageId"      => 1,
            "count"          => 5,
        ]
    ],
    "toIngredients" => [
        [
            "ingredientId"   => 87,
            "storageId"      => 1,
            "count"          => 1,
            "selfpricePercent" => 40,
        ],
        [
            "ingredientId"   => 844,
            "storageId"      => 1,
            "count"          => 0.5,
            "selfpricePercent" => 60,
        ]
    ]
];

$data = sendRequest($url, 'post', $butchery);
```

> Пример ответа:

```json
{
  "response": {
    "id": 1,
    "date": "2024-09-16T11:36:00.000000Z",
    "comment": "",
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

Метод создает переработку, превращая одни ингредиенты в другие.

### HTTP запрос

`POST https://joinposter.com/api/storage/butcheries`

### POST-параметры запроса storage/butcheries

Объект `butchery` содержит следующие параметры:

Параметр | Описание
-------- | --------
date | Дата переработки в формате `Y-m-d H:i:s`
comment | Комментарий к переработке
fromIngredients | Массив ингредиентов, из которых происходит переработка
toIngredients | Массив ингредиентов, которые получены в результате переработки

### Содержимое массива `fromIngredients`

Параметр | Описание
-------- | --------
ingredientId | ID ингредиента
count | Количество ингредиента в шт или кг
storageId | ID склада, с которого списываются ингредиенты

### Содержимое массива `toIngredients`

Параметр | Описание
-------- | --------
ingredientId | ID ингредиента
count | Количество ингредиента в шт или кг
storageId | ID склада, на который поступают ингредиенты
selfpricePercent | Себестоимость ингредиента в процентах, общая себестоимость всех ингредиентов должна быть равна 100%

### Параметры ответа storage/butcheries

Параметр | Описание
-------- | --------
id | ID созданной переработки
date | Дата создания переработки
fromIngredients | Список исходных ингредиентов с их характеристиками
toIngredients | Список полученных ингредиентов с их характеристиками

### Возможные ошибки

| HTTP-код | Описание                                                 | Код | Сообщение|
|----------|----------------------------------------------------------|---|----------|
| 200      | Переработки недоступны из-за ограничений тарифного плана | 512 | Pricing plan restriction|
| 422      | Дата не входит в инвентаризационный период               | 219 | Make sure the date included in the 'date' request falls within the ongoing inventory check for the storage with ID 1|
| 422      | Ингредиент не найден                                     | 32 | ingredient is undefined|
| 422      | Склад не найден                                          | 32 | storage is undefined|
| 422      | Общая себестоимость всех ингредиентов не равна 100%      | 221  | The value for total selfpricePercent must be exactly 100.|
