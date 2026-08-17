## finance.createAccount: Создание нового счета

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.createAccount
?token=687409:4164553abf6a031302898da7800b59fb';

const account = {
  account_name: 'Сейф',
  currency_id: 3,
  type: 1,
  balance_start: 0,
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.createAccount'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$account = [
    'account_name' => 'Сейф',
    'currency_id' => 3,
    'type' => 1,
    'balance_start' => 0,
];

$data = sendRequest($url, 'post', $account);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.createAccount
 ?token=687409:4164553abf6a031302898da7800b59fb

{
    "account_name": "Сейф",
    "currency_id": 3,
    "type": 1,
    "balance_start": 0
  }
```

<!-- tabs:end -->
</details>

<details open>
<summary>Пример ответа</summary>

```json
{
  "response":4
}
```
</details>

Метод создает новый счет.

### HTTP POST запрос

`POST https://joinposter.com/api/finance.createAccount`

### POST-параметры запроса finance.createAccount

| Параметр      | Описание                                                                                             |
|---------------|------------------------------------------------------------------------------------------------------|
| account_name  | Название счета                                                                                       |
| type          | Тип счета: 1 — безналичный, 2 — банковская карта, 3 — наличные.                                       |
| balance_start | Остаток денег на счете на момент создания в валюте.                                                   |
| currency_id   | ID валюты в Poster: 1 — гривна, 3 — доллар, 4 — евро, 5 — тенге, 6 — лари, 7 — бат, 8 — armenia dram. |

### Параметры ответа finance.createAccount

| Параметр | Описание            |
|----------|---------------------|
| response | ID созданного счета |
