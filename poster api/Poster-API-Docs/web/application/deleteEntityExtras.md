## application.deleteEntityExtras: Удалить дополнительные данные сущности 

<details open> 
<summary> Удалить из екстрас ID товара 1 и 3</summary>

<!-- tabs:start -->


#### **JS**

```javascript
const url = 'https://joinposter.com/api/application.deleteEntityExtras?token=687409:4164553abf6a031302898da7800b59fb';

const extras = {
  entity_type: "product",
  entity_id: 4,
  extras: [
    { "sideId": "1" },
    { "sideId": "3" }
  ]
};

```
#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/application.deleteEntityExtras'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$extras = [
    "entity_type"   => "product",
    "entity_id"     => 4,
    "extras"        => [
        "sideId" => "1",
        "sideId" => "3"
    ]
];

$data = sendRequest($url, 'post', $extras);

```
#### **Postman**

```json

url = https://joinposter.com/api/application.deleteEntityExtras
 ?token=687409:4164553abf6a031302898da7800b59fb;

{
    "entity_type": "product",
    "entity_id": 4,
    "extras": {
        "sideId": "1",
        "sideId": "3"
    }
}

```

<!-- tabs:end -->

<summary>Ответ</summary>

```json
{
  "response":true
}
```
</details>


<details open> 
<summary> Удалить из екстрас все sideID</summary>

<!-- tabs:start -->


#### **JS**

```javascript
url = https://joinposter.com/api/application.deleteEntityExtras
 ?token=687409:4164553abf6a031302898da7800b59fb;
 
{
    "entity_type": "product",
    "entity_id": 4,
    "extras": {
        "sideId": ""
    }
}

```

#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/application.deleteEntityExtras'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$extras = [
    "entity_type"   => "product",
    "entity_id"     => 4,
    "extras"        => [
        "sideId" => ""
    ]
];

$data = sendRequest($url, 'post', $extras);

```

<!-- tabs:end -->

<summary>Ответ</summary>

```json
{
  "response":true
}
```
</details>

<details open> 
<summary> Удалить из екстрас все по типу и ID</summary>

<!-- tabs:start -->


#### **JS**

```javascript
url = https://joinposter.com/api/application.deleteEntityExtras
 ?token=687409:4164553abf6a031302898da7800b59fb;
 
{
    "entity_type"   => "product",
    "entity_id"     => 4
}
 
```

#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/application.deleteEntityExtras'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$extras = [
    "entity_type"   => "product",
    "entity_id"     => 4,
];

$data = sendRequest($url, 'post', $extras);

```

<!-- tabs:end -->

<summary>Ответ</summary>

```json
{
  "response":true
}
```
</details>


<details open> 
<summary> Удалить токен авторизации в глобальных настройках</summary>

<!-- tabs:start -->


#### **JS**

```javascript
url = https://joinposter.com/api/application.deleteEntityExtras
 ?token=687409:4164553abf6a031302898da7800b59fb;
 
{
"entity_type": "settings",
    "extras": {
        "token" => ""
    }
}

```

#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/application.deleteEntityExtras'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$extras = [
    "entity_type"   => "settings",
    "extras"        => [
        "token" => ""
    ]
];

$data = sendRequest($url, 'post', $extras);

```

<!-- tabs:end -->

<summary>Ответ</summary>

```json
{
  "response":true
}
```
</details>

В Poster есть понятие сущности, например: кассы, столы в заведении, клиент, официант и т.п. 
Этим методом вы можете удалить доп информацию о любой сущности. 

Например, вы пишите приложение на POS платформе, вам нужно авторизовать пользователя и сохранить его токен для дальнейших запросов. 
При перезагрузке планшета, токен удалится из памяти, но вы можете сохранить его в сущности settings с помощью `setEntityExtras`. 
Теперь, когда касса загрузится, все настройки можно получить методом `settings.getAllSettings` или в объекте `Poster.settings.extras`.
А что бы их почистить используйте `deleteEntityExtras`.

### HTTP POST запрос

`POST https://joinposter.com/api/application.deleteEntityExtras`

### POST-параметры запроса application.deleteEntityExtras

| Параметр    | Описание                                                                                    |
|-------------|---------------------------------------------------------------------------------------------|
| entity_type | Обязательный параметр, тип сущности. Доступные варианты сущностей описаны ниже.             |
| entity_id   | Обязательный параметр, ID сущности. Например, для метода `access.getTablets` — `tablet_id`. |
| extras      | Необязательный параметр, нужен для уточнения того, какие экстрасы будут удалены.             |

### Параметры ответа application.deleteEntityExtras

| Параметр | Описание                                                 |
|----------|----------------------------------------------------------|
| response | Результат запроса, `true` — если запрос выполнен успешно. |

### Список сущностей которым можно добавлять/удалить extras

| Сущность             | Описание                                                                                  |
|----------------------|-------------------------------------------------------------------------------------------|
| spot                 | Заведение                                                                                 |
| tablet               | Касса                                                                                     |
| staff                | Сотрудник                                                                                 |
| clients_group        | Группа клиента                                                                            |
| product              | Товар или тех. карта                                                                      |
| ingredient           | Ингредиент                                                                                |
| menu_category        | Категория товара или модификатора                                                         |
| ingredients_category | Категория ингредиента                                                                     |
| client               | Клиент заведения                                                                          |
| settings             | Настройки аккаунта, глобальная сущность. В запросе `entity_id` передавать не обязательно. |
| transactions         | Чеки                                                                                      |

!> `extras` может удалить только то приложение, которое его установило.
