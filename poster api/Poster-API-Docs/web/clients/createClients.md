## clients.createClients: Создать группу клиентов

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.createClients
?token=687409:4164553abf6a031302898da7800b59fb';

const clients = [
  {
    client_name: 'Елена Андрюшенко',
    client_sex: 2,
    client_groups_id_client: 7,
    card_number: '0000000000222',
    discount_per: 0,
    phone: '+380519911122',
    email: 'contact@joinposter.com',
    birthday: '1986-11-23',
    bonus: 10,
    total_payed_sum: 417000,
  },
  {
    client_name: 'Денис Александрович',
    client_sex: 1,
    client_groups_id_client: 7,
    card_number: '0000000000223',
    discount_per: 0,
    phone: '+380519998877',
    email: 'dev@joinposter.com',
    birthday: '1990-06-15',
    bonus: 10,
    total_payed_sum: 570000,
  },
];

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.createClients'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$clients = [
    [
        'client_name'             => 'Елена Андрюшенко',
        'client_sex'              => 2,
        'client_groups_id_client' => 7,
        'card_number'             => '0000000000222',
        'discount_per'            => 0,
        'phone'                   => '+380519911122',
        'email'                   => 'contact@joinposter.com',
        'birthday'                => '1986-11-23',
        'bonus'                   => 10,
        'total_payed_sum'         => 417000,
    ],
    [
        'client_name'             => 'Денис Александрович',
        'client_sex'              => 1,
        'client_groups_id_client' => 7,
        'card_number'             => '0000000000223',
        'discount_per'            => 0,
        'phone'                   => '+380519998877',
        'email'                   => 'dev@joinposter.com',
        'birthday'                => '1990-06-15',
        'bonus'                   => 10,
        'total_payed_sum'         => 570000,
    ]
];

$data = sendRequest($url, 'post', $clients);
```

#### **Postman**

```javascript

url = https://joinposter.com/api/clients.createClients
 ?token=687409:4164553abf6a031302898da7800b59fb
 
[
  {
    "client_name": "Елена Андрюшенко",
    "client_sex": 2,
    "client_groups_id_client": 7,
    "card_number": "0000000000222",
    "discount_per": 0,
    "phone": "+380519911122",
    "email": "contact@joinposter.com",
    "birthday": "1986-11-23",
    "bonus": 10,
    "total_payed_sum": 417000
  },
  {
    "client_name": "Денис Александрович",
    "client_sex": 1,
    "client_groups_id_client": 7,
    "card_number": "0000000000223",
    "discount_per": 0,
    "phone": "+380519998877",
    "email": "dev@joinposter.com",
    "birthday": "1990-06-15",
    "bonus": 10,
    "total_payed_sum": 570000
  }
]

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
  "response":[7, 8]
}
```
</details>

Метод создаёт несколько клиентов за один запрос.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.createClients`

### POST-параметры запроса clients.createClients

| Параметр                | Описание                                                                                                                                 |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| client_name             | Обязательный параметр, ФИО клиента                                                                                                       |
| client_groups_id_client | Обязательный параметр, ID группы клиентов                                                                                                |
| client_sex              | Пол клиента:0 — не указан, 1 — мужской, 2 — женский                                                                                      |
| card_number             | Номер карты клиента                                                                                                                      |
| discount_per            | Персональный процент скидки или бонусов. Будет использоваться, если больше, чем процент группы клиента.                                  |
| phone                   | Телефон клиента, уникальный, в системе не может быть два клиента с одинаковым номером                                                    |
| email                   | Адрес электронной почты клиента                                                                                                          |
| birthday                | Дата рождения клиента, формат "Y-m-d"                                                                                                    |
| city                    | Город клиента                                                                                                                            |
| country                 | Страна клиента                                                                                                                           |
| address                 | Адрес клиента                                                                                                                            |
| comment                 | Комментарий к учетной записи клиента                                                                                                     |
| bonus                   | Текущий размер накопленных бонусов клиента                                                                                               |
| total_payed_sum         | Общая сумма покупок в копейках                                                                                                           |
| skip_phone_validation   | Дает возможность пропустить валидацию для параметра `phone`: true — пропустить; false — не пропускать. Не доступно для Украины и франшиз | 


### Параметры ответа clients.createClients

| Параметр | Описание                       |
|----------|--------------------------------|
| response | Массив ID добавленных клиентов |
