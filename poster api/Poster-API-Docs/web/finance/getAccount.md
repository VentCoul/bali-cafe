## finance.getAccount: Свойства счета

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.getAccount
?token=687409:4164553abf6a031302898da7800b59fb
&account_id=3';


```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.getAccount'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&account_id=3';

$data = sendRequest($url);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.getAccount
 ?token=687409:4164553abf6a031302898da7800b59fb
 &account_id=3

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
   "response":{  
      "account_id":"3",
      "name":"Сейф",
      "currency_id":"3",
      "type":"1",
      "balance":"56720000",
      "balance_start":"0",
      "percent_acquiring":"0.00",
      "currency_symbol":"$",
      "currency_code_iso":"USD",
      "currency_code":"usd"
   }
}
```
</details>

Метод возвращает свойства счета в разделе финансы.

### HTTP GET запрос

`GET https://joinposter.com/api/finance.getAccount`

### GET-параметры запроса finance.getAccount

| Параметр   | Описание                                                                                |
|------------|-----------------------------------------------------------------------------------------|
| type       | Тип счета: 1 — безналичный, 2 — банковская карта, 3 — наличные. По умолчанию все счета. |
| account_id | Обязательный параметр, id счета.                                                         |

### Параметры ответа finance.getAccount

| Параметр | Описание      |
|----------|---------------|
| response | Объект ответа |

Внутри параметра `response` лежит объект, внутри которого есть параметры:

| Параметр          | Описание                                                                                                    |
|-------------------|-------------------------------------------------------------------------------------------------------------|
| account_id        | ID счета                                                                                 |
| name              | Название счета                                                                                              |
| type              | Тип счета: 1 — безналичный, 2 — банковская карта, 3 — наличные.                                              |
| balance           | Баланс по счету в валюте.                                                                                    |
| balance_start     | Начальный баланс в валюте, остаток денег на счете на момент создания.                                        |
| percent_acquiring | Процент за эквайринг.                                                                                        |
| currency_id       | ID валюты в Poster: 1 — гривна, 3 — доллар, 4 — евро, 5 — тенге, 6 — лари, 7 — бат, 8 — armenia dram.        |
| currency_code     | Код валюты на терминале.                                                                                     |
| currency_symbol   | Unicode символ валюты, для драма и маната приходит HTML который на терминале отобразиться как иконка валюты. |
| currency_code_iso | Цифровой код валюты по стандарту ISO 4217.                                                                   |
