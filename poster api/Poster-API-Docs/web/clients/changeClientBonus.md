## clients.changeClientBonus: Изменить количество бонусов клиента

<details open> 
<summary>Пример запроса для начисления бонусов</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.changeClientBonus
?token=687409:4164553abf6a031302898da7800b59fb';

const bonus = {
  client_id: 7,
  count: 10,
};
```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.changeClientBonus'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$bonus = [
  'client_id' => 7,
  'count'     => 10,
];

$data = sendRequest($url, 'post', $bonus);
```

#### **Postman**

```javascript

url = https://joinposter.com/api/clients.changeClientBonus
?token=687409:4164553abf6a031302898da7800b59fb

{
    "client_id": 7,
    "count": 10
}

```

<!-- tabs:end -->

</details>

<details open> 
<summary>Пример запроса для списания бонусов</summary>

<!-- tabs:start -->

#### **JS**

```javascript
const url = 'https://joinposter.com/api/clients.changeClientBonus
?token=687409:4164553abf6a031302898da7800b59fb';

const bonus = {
  client_id: 7,
  count: -10,
};

```

#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/clients.changeClientBonus'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$bonus = [
  'client_id' => 7,
  'count'     => -10,
];

$data = sendRequest($url, 'post', $bonus);

```
#### **Postman**

```javascript

url = https://joinposter.com/api/clients.changeClientBonus
?token=687409:4164553abf6a031302898da7800b59fb

{
    "client_id": 7,
    "count": -10
}

```

<!-- tabs:end -->

</details>

<details open> 
<summary>Пример запроса c отменой вебхука</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.changeClientBonus
?token=687409:4164553abf6a031302898da7800b59fb';

const bonus = {
  client_id: 7,
  count: 10,
  block_webhook: "true",
};

```

#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/clients.changeClientBonus'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$bonus = [
  'client_id' => 7,
  'count'     => -10,
  'block_webhook' => 'true',
];

$data = sendRequest($url, 'post', $bonus);

```
#### **Postman**

```javascript

url = https://joinposter.com/api/clients.changeClientBonus
?token=687409:4164553abf6a031302898da7800b59fb

{
    "client_id": 7,
    "count": 10,
    "block_webhook": "true"
}

```

<!-- tabs:end -->

</details>


<details open> 
<summary>Пример ответа</summary>

```json
{
  "response":30
}
```
</details>

Метод изменяет количество бонусов клиента. Используется только для клиентов с бонусной системой лояльности.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.changeClientBonus`

### POST-параметры запроса clients.changeClientBonus

| Параметр      | Описание                                                                                                                      |
|---------------|-------------------------------------------------------------------------------------------------------------------------------|
| client_id     | ID клиента                                                                                                                    |
| count         | Количество бонусов, которые надо начислить клиенту. Если число положительное — начислить, если число отрицательное — списать. |
| block_webhook | Опциональный параметр, если true — в ответ не прийдет вебхук об измении данных этого клиента.                                  |

### Параметры ответа clients.changeClientBonus

| Параметр | Описание                                                             |
|----------|----------------------------------------------------------------------|
| response | Количество бонусов, которое стало у клиента после внесения изменений. |
