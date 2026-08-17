## clients.addEWalletPayment: Пополнить депозитный счет клиента

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

url = https://joinposter.com/api/clients.addEWalletPayment
 ?token=687409:4164553abf6a031302898da7800b59fb

{
    "client_id": 1,
    "transaction_id": 1,
    "amount": 200,
    "type": 1
}

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.addEWalletPayment'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$ewallet = [
  'client_id'      => 1,
  'transaction_id' => 1,
  'amount'         => 200,
  'type'           => 1,
];

$data = sendRequest($url, 'post', $ewallet);
```

<!-- tabs:end -->

</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
   "response":"1"
}
```

</details>
 
Метод пополняет депозитный счет клиента.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.addEWalletPayment`

### POST-параметры запроса clients.addEWalletPayment

| Параметр       | Описание                                              |
|----------------|-------------------------------------------------------|
| client_id      | ID клиента                                            |
| transaction_id | ID связанного чека                                    |
| amount         | Сумма, которая начисляется на депозитный счет клиента |
| type           | Тип пополнения: 1 — наличными, 2 — карточкой          |

> Пополнение картой недоступно в странах: Украина, Казахстан, Польша, Армения.

### Параметры ответа clients.addEWalletPayment

| Параметр | Описание                                    |
|----------|---------------------------------------------|
| response | ID, транзакции пополнения депозитного счета |
