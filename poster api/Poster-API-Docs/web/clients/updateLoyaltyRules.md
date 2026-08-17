## clients.updateLoyaltyRules: Изменить правила перехода

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.updateLoyaltyRules?token=687409:4164553abf6a031302898da7800b59fb';

const rules = {
  rules: [
    {
      rule_id: 3,
      value: 1200,
      group_id: 1,
    },
    {
      rule_id: 4,
      value: 1700,
      group_id: 7,
    }
  ],
};

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.updateLoyaltyRules'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$rules = [
    'rules' => [
        [
            'rule_id' => 3,
            'value' => 1200,
            'group_id' => 1,
        ],
        [
            'rule_id' => 4,
            'value' => 1700,
            'group_id' => 7,
        ]
    ],
];

$data = sendRequest($url, 'post', $rules);
```
#### **Postman**

```json

url = https://joinposter.com/api/clients.updateLoyaltyRules
 ?token=687409:4164553abf6a031302898da7800b59fb


  "rules": [
    {
      "rule_id": 3,
      "value": 1200,
      "group_id": 1
    },
    {
      "rule_id": 4,
      "value": 1700,
      "group_id": 7
    }
  ]


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

Метод обновляет правила перехода программ лояльности.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.updateLoyaltyRules`

### POST-параметры запроса clients.updateLoyaltyRules

| Параметр | Описание        |
|----------|-----------------|
| rules    | Массив объектов |

Внутри параметра `rules` лежит массив, в каждом элементе которого:

| Параметр | Описание                |
|----------|-------------------------|
| rule_id  | ID программы лояльности |
| value    | Сумма оплаты в копейках |
| group_id | ID группы клиентов      |

### Параметры ответа clients.updateLoyaltyRules

| Параметр | Описание                                                                                    |
|----------|---------------------------------------------------------------------------------------------|
| response | Результат обновления правил перехода: `true` – если обновлено, иначе вернется объект ошибки |
