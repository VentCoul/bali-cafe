## clients.removeLoyaltyRules: Удалить правила перехода

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.removeLoyaltyRules?token=687409:4164553abf6a031302898da7800b59fb';

const rules = {
  rule_ids: [3, 4],
};

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.removeLoyaltyRules'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$rules = [
    'rule_ids' => [
        3,
        4,
    ],
];

$data = sendRequest($url, 'post', $rules);
```

#### **Postman**

```json

url = https://joinposter.com/api/clients.removeLoyaltyRules
 ?token=687409:4164553abf6a031302898da7800b59fb

 {
    "rule_ids": [3, 4]
}

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
  "response": true
}
```
</details>

Метод удаляет правила перехода программ лояльности.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.removeLoyaltyRules`

### POST-параметры запроса clients.removeLoyaltyRules

| Параметр | Описание                  |
|----------|---------------------------|
| rule_ids | Массив ID правил перехода |

### Параметры ответа clients.removeLoyaltyRules

| Параметр | Описание                                                     |
|----------|--------------------------------------------------------------|
| response | Результат удаления правил перехода: `true` – если обновлено  |
