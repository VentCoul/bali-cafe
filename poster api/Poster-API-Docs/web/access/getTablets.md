## access.getTablets: Список касс

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->


#### **JS**

```javascript

const url = 'https://joinposter.com/api/access.getTablets
?token=687409:4164553abf6a031302898da7800b59fb';

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/access.getTablets'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$data = sendRequest($url);
```

#### **Postman**

```json

url = https://joinposter.com/api/access.getTablets
 ?token=687409:4164553abf6a031302898da7800b59fb;

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>


```json
{
  "response":[
    {
      "tablet_id":"1",
      "tablet_name":"Основной на Мадридской",
      "spot_id":"1",
      "type": "mobile"
    },
    {
      "tablet_id":"2",
      "tablet_name":"Бар на Мадридской",
      "spot_id":"1",
      "type": "default"
    },
    {
      "tablet_id":"3",
      "tablet_name":"Касса на Римской",
      "spot_id":"2",
      "type": "mobile"
    }
  ]
}
```
</details>

Метод возвращает список касс.

### HTTP GET запрос

`GET https://joinposter.com/api/access.getTablets`

### Параметры ответа access.getTablets

| Параметр | Описание        |
|----------|-----------------|
| response | Массив объектов |

Внутри параметра `response` лежит массив, в каждом элементе которого есть параметры:

| Параметр    | Описание                                 |
|-------------|------------------------------------------|
| tablet_id   | ID кассы.                                |
| tablet_name | Название кассы.                          |
| spot_id     | ID заведения к которому относится касса. |
| type        | Тип кассы (mobile/default)               |    
