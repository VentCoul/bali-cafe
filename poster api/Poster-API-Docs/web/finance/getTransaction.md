## finance.getTransaction: Свойства транзакции 

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.getTransaction
?token=687409:4164553abf6a031302898da7800b59fb
&transaction_id=538';


```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.getTransaction'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&transaction_id=538';


$data = sendRequest($url);

```

#### **Postman**

```json

url = https://joinposter.com/api/finance.getTransaction
 ?token=687409:4164553abf6a031302898da7800b59fb
 &transaction_id=538

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
    "response": {
        "transaction_id": "538",
        "account_id": "1",
        "user_id": "1",
        "category_id": "7",
        "type": "0",
        "amount": "-8137663",
        "balance": "545516997964",
        "date": "2024-08-31 09:20:22",
        "recipient_type": "0",
        "recipient_id": "0",
        "binding_type": "15",
        "binding_id": "400",
        "comment": "Корректирующая транзакция",
        "delete": "0",
        "account_name": "Наличные в заведении",
        "currency_symbol": "<i class=\"icon-rouble\"></i>",
        "category_name": "book_category_action_actualization",
        "agreement_date": "2017-09-01 09:20:22",
        "supplier_name": "METRO"
    }
}
```
</details>

Метод возвращает свойства транзакции. 

### HTTP запрос

`GET https://joinposter.com/api/finance.getTransaction`

### GET-параметры запроса finance.getTransaction

Параметр | Описание
-------- | --------
transaction_id | Обязательный параметр, ID транзакции

### Параметры ответа finance.getTransaction

Параметр | Описание
-------- | --------
response | Объект транзакции

Внутри параметра `response` лежит объект, в котором параметры:

Параметр | Описание
-------- | -------- 
transaction_id | ID транзакции 
account_id | ID счета 
user_id | ID официанта 
category_id | ID категории, по умолчанию по всем категориям
type | Тип транзакции: 0 — расход, 1 — доход
amount | Сумма транзакции в копейках
balance | Баланс на счете в копейках
date | Дата проведения транзакции
recipient_type | Тип принимающей сущности: 1 — перевод, 12 — поставщик
recipient_id | ID принимающей сущности
binding_type | Тип соответствующей сущности: 1 — перевод, 11 — закрытие смены, 12 — поставка, 14 — транзакции кассовой смены
binding_id | ID соответствующей сущности
comment | Комментарий
delete | Удалена ли транзакция: 0  — транзакция не удалена, 1 — транзакция удалена
account_name | Название счета
category_name | Название категории
currency_symbol | Unicode символ валюты, для драма и маната приходит HTML который на терминале отобразиться как иконка валюты
agreement_date | Дата соглашения
supplier_name | Название поставщика
