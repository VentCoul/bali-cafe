## clients.createGroup: Создать группу клиентов

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.createGroup?token=687409:4164553abf6a031302898da7800b59fb';

const group = {
  client_groups_name: 'Постоянный посетитель',
  loyalty_type: 1,
  client_groups_discount: 10,
  birthday_bonus: 50.00,
};

```

#### **PHP**

```php

<?php
$url = 'https://joinposter.com/api/clients.createGroup'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$group = [
    'client_groups_name'     => 'Постоянный посетитель',
    'loyalty_type'           => 1,
    'client_groups_discount' => 10,
    'birthday_bonus'         => 50.00,
];

$data = sendRequest($url, 'post', $group);
```

#### **Postman**

```javascript
url = https://joinposter.com/api/clients.createGroup
 ?token=687409:4164553abf6a031302898da7800b59fb

{
  "client_groups_name": "Постоянный посетитель",
  "loyalty_type": 1,
  "client_groups_discount": 10,
  "birthday_bonus": 50.00
}

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>


```json
{
  "response":6
}
```
</details>

Метод создаёт группу клиентов.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.createGroup`

### POST-параметры запроса clients.createGroup

| Параметр               | Описание                                                                                                                                                                   |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| client_groups_name     | Название группы клиентов                                                                                                                                                   |
| loyalty_type           | Тип группы клиентов: 1 — бонусная, 2 — скидочная                                                                                                                           |
| client_groups_discount | Процент группы. Если группа бонусная - 1, то будет начислять бонусы на оплаченную сумму заказа. Если группа скидочная — 2, то будет давать процент скидки на сумму заказа. |
| birthday_bonus         | Количество бонусов в копейках начисляемые в день рождения клиента. Используется только бонусными группами.                                                                 |
| use_ewallet            | Признак для использования депозитных счетов в группе клиентов: 0 — не использовать, 1 — использовать.                                                                       |

### Параметры ответа clients.createGroup

| Параметр | Описание                     |
|----------|------------------------------|
| response | ID созданной группы клиентов |
