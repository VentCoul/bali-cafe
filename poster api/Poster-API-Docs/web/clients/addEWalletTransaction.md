## clients.addEWalletTransaction: Списать с депозитного счет клиента

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.addEWalletTransaction?token=687409:4164553abf6a031302898da7800b59fb';

const ewallet = {
  client_id: 1,
  amount: 200,
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.addEWalletTransaction'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$ewallet = [
  'client_id' => 1,
  'amount'    => 200,
];

$data = sendRequest($url, 'post', $ewallet);
```
#### **Postman**

```json

url = https://joinposter.com/api/clients.addEWalletTransaction
 ?token=687409:4164553abf6a031302898da7800b59fb
 
 {
    "client_id": 1,
    "amount": 200
 }

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
 
Метод списывает с депозитного счета клиента.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.addEWalletTransaction`

### POST-параметры запроса clients.addEWalletTransaction

| Параметр  | Описание                                               |
|-----------|--------------------------------------------------------|
| client_id | ID клиента                                             |
| amount    | Сумма, которая списывается с депозитного счета клиента |

### Параметры ответа clients.addEWalletTransaction

| Параметр | Описание                                    |
|----------|---------------------------------------------|
| response | ID, транзакции списания с депозитного счета |
