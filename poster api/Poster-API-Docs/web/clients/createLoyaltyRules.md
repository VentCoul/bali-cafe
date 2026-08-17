## clients.createLoyaltyRules: Создать правила перехода

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.createLoyaltyRules
?token=687409:4164553abf6a031302898da7800b59fb';

const rules = {
  rules: [
    {
      loyalty_type: 2,
      value: 1000,
      group_id: 1,
    },
    {
      loyalty_type: 2,
      value: 1500,
      group_id: 7,
    }
  ],
};

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.createLoyaltyRules'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$rules = [
    'rules' => [
        [
            'loyalty_type' => 2,
            'value' => 1000,
            'group_id' => 1,
        ],
        [
            'loyalty_type' => 2,
            'value' => 1500,
            'group_id' => 7,
        ]
    ],
];

$data = sendRequest($url, 'post', $rules);
```
#### **Postman**

```json

url = https://joinposter.com/api/clients.createLoyaltyRules
 ?token=687409:4164553abf6a031302898da7800b59f

{
    "rules": [
        {
            "loyalty_type": 2,
            "value": 1000,
            "group_id": 1
        },
        {
            "loyalty_type": 2,
            "value": 1500,
            "group_id": 7
        }
    ]
}
```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>


```json
{
  "response": [
    3,
    4
  ]
}
```
</details>

Метод создает правила перехода программ лояльности.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.createLoyaltyRules`

### POST-параметры запроса clients.createLoyaltyRules

| Параметр | Описание        |
|----------|-----------------|
| rules    | Массив объектов |

Внутри параметра `rules` лежит массив, в каждом элементе которого есть следующие параметры:

| Параметр     | Описание                                    |
|--------------|---------------------------------------------|
| loyalty_type | 1 - бонусная система, 2 - скидочная система |
| value        | Сумма оплаты в копейках                     |
| group_id     | ID группы клиентов                          |

### Параметры ответа clients.createLoyaltyRules

| Параметр | Описание                                               |
|----------|--------------------------------------------------------|
| response | Массив созданых правил перехода в программе лояльности |
