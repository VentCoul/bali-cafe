## clients.removeClients: Удалить группу клиентов

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.removeClients
?token=687409:4164553abf6a031302898da7800b59fb';

const client = {
  'ids' => [1, 2],
};

```
#### **PHP**


```php

```php
<?php
$url = 'https://joinposter.com/api/clients.removeClients'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$client = [
    'ids' => [1, 2],
];

$data = sendRequest($url, 'post', $client);
```

#### **Postman**

```json

url = https://joinposter.com/api/clients.removeClients
 ?token=687409:4164553abf6a031302898da7800b59fb

{
  "ids": [1,2]
}
```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>


```json
{  
  "response":[1,2]
}
```
</details>

Метод удаляет несколько клиентов.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.removeClients`

### POST-параметры запроса clients.removeClients

| Параметр | Описание           |
|----------|--------------------|
| ids      | Массив ID клиентов |

### Параметры ответа clients.removeClients

| Параметр | Описание                     |
|----------|------------------------------|
| response | Массив ID удаленных клиентов |
