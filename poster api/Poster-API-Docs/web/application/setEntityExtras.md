## application.setEntityExtras: Изменить дополнительные данные сущности 

<details open> 
<summary>Сохранить ID товара в сторонней системе</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/application.setEntityExtras
?token=687409:4164553abf6a031302898da7800b59fb';

const extras = {
  entity_type: "product",
  entity_id: 4,
  extras: [
    { "sideId": "1" }
  ]
};

```
#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/application.setEntityExtras'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$extras = [
    "entity_type"   => "product",
    "entity_id"     => 4,
    "extras"        => [
        "sideId" => "1"
    ]
];

$data = sendRequest($url, 'post', $extras);

```
#### **Postman**

```json

url = https://joinposter.com/api/application.setEntityExtras
 ?token=687409:4164553abf6a031302898da7800b59fb;
 
 {
    "entity_type": "product",
    "entity_id": 4,
    "extras": {
        "sideId": "1"
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
<summary>Сохранить токен авторизации в глобальных настройках </summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/application.setEntityExtras
?token=687409:4164553abf6a031302898da7800b59fb';

const extras = {
  entity_type: "settings",
  extras: [
    { "token": "lva23gds1793skd0123apsod10230wqoe0oe01" }
  ]
};


```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/application.setEntityExtras'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$extras = [
    "entity_type"   => "settings",
    "extras"        => [
        "token" => "lva23gds1793skd0123apsod10230wqoe0oe01"
    ]
];

$data = sendRequest($url, 'post', $extras);

```
#### **Postman**

```json

url = https://joinposter.com/api/application.setEntityExtras
 ?token=687409:4164553abf6a031302898da7800b59fb;

{
    "entity_type": "settings",
    "extras": {
        "token": "lva23gds1793skd0123apsod10230wqoe0oe01"
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



В Poster есть понятие сущности, например: кассы, столы в заведении, клиент, официант и т.п. 
Этим методом можете расширить информацию о любой сущности. 

Например, пишите приложение на POS платформе, необходимо авторизовать пользователя и сохранить его токен для дальнейших запросов. 
При перезагруке планшета, токен удалится из памяти, но можно сохранить его в сущности settings. 
Теперь когда касса загрузится, все настройки можно получить методом `settings.getAllSettings` или в объекте `Poster.settings.extras`.      


### HTTP POST запрос

`POST https://joinposter.com/api/application.setEntityExtras`

### POST-параметры запроса application.setEntityExtras

| Параметр    | Описание                                                                                                                            |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------|
| entity_type | Обязательный параметр, тип сущности в которую записываются параметры. Доступные варианты сущностей описаны ниже.                    |
| entity_id   | Обязательный параметр, ID сущности в которую будет записан объект `extras`. Например, для метода `access.getTablets` — `tablet_id`. |
| extras      | Обязательный параметр, объект поля которого будут записаны в сущность.                                                               |

### Параметры ответа application.setEntityExtras

| Параметр | Описание                                                 |
|----------|----------------------------------------------------------|
| response | Результат запроса, `true` — если запрос выполнен успешно. |

### Список сущностей которым можно добавлять extras

| Сущность             | Описание                                                                                  |
|----------------------|-------------------------------------------------------------------------------------------|
| spot                 | Заведение                                                                                 |
| tablet               | Касса                                                                                     |
| staff                | Сотрудник                                                                                 |
| clients_group        | Группа клиента                                                                            |
| product              | Товар или тех. картра                                                                     |
| ingredient           | Ингредиент                                                                                |
| menu_category        | Категория товара или модификатора                                                         |
| ingredients_category | Категория ингредиента                                                                     |
| client               | Клиент заведения                                                                          |
| settings             | Настройки аккаунта, глобальная сущность. В запросе `entity_id` передавать не обязательно. |
| transactions         | Чеки                                                                                      |

!> `extras` может получить только то приложение, которое его установило. 
