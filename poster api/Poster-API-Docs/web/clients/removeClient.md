## clients.removeClient: Удалить клиента

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.removeClient
?token=687409:4164553abf6a031302898da7800b59fb';

const client = {
  client_id: 2,
};

```
#### **PHP**


```php
<?php
$url = 'https://joinposter.com/api/clients.removeClient'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$client = [
    'client_id' => 2,
];

$data = sendRequest($url, 'post', $client);
```

#### **Postman**

```json

url = https://joinposter.com/api/clients.removeClient
 ?token=687409:4164553abf6a031302898da7800b59fb

{
  "client_id": 2
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

Метод удаляет клиента.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.removeClient`

### POST-параметры запроса clients.removeClient

| Параметр  | Описание   |
|-----------|------------|
| client_id | ID клиента |

### Параметры ответа clients.removeClient

| Параметр | Описание                           |
|----------|------------------------------------|
| response | `true`, если клиент успешно удалён |
