## clients.set1cClientId: Изменить ID клиента в системе 1С

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.set1cClientId?token=687409:4164553abf6a031302898da7800b59fb';

const client = {
  id: [
    {
      client_id: 38,
      id_1c: 'b80ffc81-0fc9-11e7-9ab4-ace01035e460',
    },
  ],
};

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.set1cClientId'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$client = [
    'id' => [
        [
            'client_id' => 38,
            'id_1c'     => 'b80ffc81-0fc9-11e7-9ab4-ace01035e460',
        ],
    ],
];

$data = sendRequest($url, 'post', $client);
```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "success":1
}
```
</details>

Метод изменяет id клиента в системе 1С.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.set1cClientId`

### POST-параметры запроса clients.set1cClientId

| Параметр | Описание        |
|----------|-----------------|
| id       | Массив объектов |

В свою очередь, каждый объект должен содержать свойства:

| Параметр  | Описание                |
|-----------|-------------------------|
| client_id | ID клиента              |
| id_1c     | ID клиента в системе 1С |

### Параметры ответа clients.set1cClientId

| Параметр | Описание                                        |
|----------|-------------------------------------------------|
| success  | 1, если ID клиента в системе 1С успешно изменён |
