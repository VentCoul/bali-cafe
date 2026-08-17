## access.updateTablet: Изменить свойств кассы

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/access.updateTablet?token=687409:4164553abf6a031302898da7800b59fb';

const tablet = {
  spot_tablet_id: 2,
  spot_id: 1,
  spot_tablet_name: 'Новая касса',
  spot_code: 'b3ss7m1p',
};
```

#### **PHP**


```php
<?php
$url = 'https://joinposter.com/api/access.updateTablet'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$tablet = [
    'spot_tablet_id'   => 2,
    'spot_id'          => 1,
    'spot_tablet_name' => 'Новая касса',
    'spot_code'        => 'b3ss7m1p',
];

$data = sendRequest($url, 'post', $tablet);
```
#### **Postman**

```json

url = https://joinposter.com/api/access.updateTablet
 ?token=687409:4164553abf6a031302898da7800b59fb;

{
    "spot_tablet_id": 2,
    "spot_id":"1",
    "spot_tablet_name": "Новая касса",
    "spot_code": "b3ss7m1p"
}

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "response":2
}
```
</details>

Метод изменяет свойства кассы.

### HTTP POST запрос

`POST https://joinposter.com/api/access.updateTablet`

### POST-параметры запроса access.updateTablet

| Параметр         | Описание                                |
|------------------|-----------------------------------------|
| spot_tablet_id   | ID кассы.                                |
| spot_id          | ID заведения к которому относится касса. |
| spot_tablet_name | Название кассы.                          |
| spot_code        | Пароль кассы.                            |

### Параметры ответа access.updateTablet

| Параметр | Описание            |
|----------|---------------------|
| response | ID измененной кассы. |
