## access.updateSpot: Изменить свойства заведения

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->


#### **JS**

```javascript

const url = 'https://joinposter.com/api/access.updateSpot?token=687409:4164553abf6a031302898da7800b59fb';

const spot = {
  spot_id: 2,
  spot_name: 'Измененное заведение',
  spot_adress: 'ул. Литейная 22',
};
```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/access.updateSpot'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$spot = [
    'spot_id'   => 2,
    'spot_name' => 'Измененное заведение',
    'spot_adress' => 'ул. Литейная 22',
];

$data = sendRequest($url, 'post', $spot);
```
#### **Postman**

```json
url = https://joinposter.com/api/access.updateSpot
 ?token=687409:4164553abf6a031302898da7800b59fb;
 
 {
    "spot_id": 2,
    "spot_name": "Измененное заведение",
    "spot_adress": "ул. Литейная 22"
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

Метод изменяет свойства заведения

### HTTP POST запрос

`POST https://joinposter.com/api/access.updateSpot`

### POST-параметры запроса access.updateSpot

| Параметр    | Описание           |
|-------------|--------------------|
| spot_id     | ID заведения.       |
| spot_name   | Название заведения. |
| spot_adress | Адрес заведения.    |

### Параметры ответа access.updateSpot

| Параметр | Описание                 |
|----------|--------------------------|
| response | ID изменённого заведения. |
