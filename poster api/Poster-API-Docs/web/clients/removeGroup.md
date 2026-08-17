## clients.removeGroup: Удалить группу клиентов

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.removeGroup
?token=687409:4164553abf6a031302898da7800b59fb';

const group = {
  group_id: 6,
};

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.removeGroup?'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$group = [
  'group_id' => 6,
];

$data = sendRequest($url, 'post', $group);
```
#### **Postman**

```json

url = https://joinposter.com/api/clients.removeGroup
 ?token=687409:4164553abf6a031302898da7800b59fb

  {
    "group_id": 6
  }

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>


```json
{
  "response":true
}
```
</details>

Метод удаляет группу клиентов.

!> Удаленные данные восстановить не вийдет!

### HTTP POST запрос

`POST https://joinposter.com/api/clients.removeGroup`

### POST-параметры запроса clients.removeGroup

| Параметр | Описание           |
|----------|--------------------|
| group_id | ID группы клиентов |

### Параметры ответа clients.removeGroup

| Параметр | Описание                                       |
|----------|------------------------------------------------|
| response | `true`, если группа клиентов успешно удалена   |

