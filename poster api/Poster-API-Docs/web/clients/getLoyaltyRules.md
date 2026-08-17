## clients.getLoyaltyRules: Свойства правил перехода

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.getLoyaltyRules
?token=687409:4164553abf6a031302898da7800b59fb

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.getLoyaltyRules'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&loyalty_type=1';

$data = sendRequest($url);

```
#### **Postman**

```json

url = https://joinposter.com/api/clients.getLoyaltyRules
 ?token=687409:4164553abf6a031302898da7800b59fb

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json

{
  "response": [
    {
      "rule_id": 4,
      "loyalty_type": 1,
      "value": 1000,
      "group_id": 5
    },
    {
      "rule_id": 5,
      "loyalty_type": 1,
      "value": 2000,
      "group_id": 3
    },
    {
      "rule_id": 6,
      "loyalty_type": 1,
      "value": 3000,
      "group_id": 1
    }
  ]
}
```
</details>

Метод возвращает правила перехода программ лояльности.

### HTTP запрос

`GET https://joinposter.com/api/clients.getLoyaltyRules`

### GET-параметры запроса clients.getLoyaltyRules

| Параметр     | Описание                                                             |
|--------------|----------------------------------------------------------------------|
| loyalty_type | 1 - бонусная система, 2 - скидочная система, необязательный параметр. |

### Параметры ответа clients.getLoyaltyRules

| Параметр | Описание        |
|----------|-----------------|
| response | Массив объектов |

Внутри параметра `response` лежит массив с объектами, каждый содержит параметры:

| Параметр     | Описание                                        |
|--------------|-------------------------------------------------|
| rule_id      | ID правила перехода                             |
| loyalty_type | Тип лояльности (бонусная или скидочные системы) |
| value        | Сумма для перехода                              |
| group_id     | ID группы клиентов                              |
