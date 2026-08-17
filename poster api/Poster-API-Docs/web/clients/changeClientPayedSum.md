## clients.changeClientPayedSum: Изменить общую сумму покупок клиента

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.changeClientPayedSum?token=687409:4164553abf6a031302898da7800b59fb';

const sum = {
  client_id: 50,
  count: 20,
};
```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.changeClientPayedSum'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$sum = [
  'client_id' => 50,
  'count'     => 20,
];

$data = sendRequest($url, 'post', $sum);
```

#### **Postman**

```javascript

url = https://joinposter.com/api/clients.changeClientPayedSum?token=687409:4164553abf6a031302898da7800b59fb

{
    "client_id": 50,
    "count": 20
}

```

<!-- tabs:end -->

</details>

<details open> 
<summary>Пример запроса c отменой вебхука</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.changeClientPayedSum?token=687409:4164553abf6a031302898da7800b59fb';

const sum = {
  client_id: 50,
  count: 20,
  block_webhook: "true",
};

```

#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/clients.changeClientPayedSum'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$sum = [
  'client_id' => 50,
  'count'     => 20,
  'block_webhook' => 'true',
];

$data = sendRequest($url, 'post', $sum);

```
#### **Postman**

```javascript

url = https://joinposter.com/api/clients.changeClientPayedSum?token=687409:4164553abf6a031302898da7800b59fb

{
    "client_id": 50,
    "count": 20,
    "block_webhook": "true"
}

```

<!-- tabs:end -->

</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
  "response":110
}
```
</details>

Метод изменяет общую сумму покупок клиента.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.changeClientPayedSum`

### POST-параметры запроса clients.changeClientPayedSum

| Параметр      | Описание                                                                                                                 |
|---------------|--------------------------------------------------------------------------------------------------------------------------|
| client_id     | ID клиента                                                                                                               |
| count         | Сумма покупок, которую надо начислить клиенту. Если число положительное — начислить, если число отрицательное — списать. |
| block_webhook | Опциональный параметр, если `true` — в ответ не придет вебхук об изменении данных этого клиента.                          |

### Параметры ответа clients.changeClientPayedSum

| Параметр | Описание                                                              |
|----------|-----------------------------------------------------------------------|
| response | Общая сумма покупок, которая стала у клиента после внесения изменений. |
