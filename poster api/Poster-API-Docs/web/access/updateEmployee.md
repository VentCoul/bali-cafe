## access.updateEmployee: Изменить свойства сотрудника

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->


#### **JS**

```javascript

const url = 'https://joinposter.com/api/access.updateEmployee?token=687409:4164553abf6a031302898da7800b59fb';

const employee = {
  user_id: 15,
  name: 'Олена Гончаренко',
  user_type: 2,
  pos_pass: '',
  login: 'heleh.gonchar@test.com',
  pass: 'aZntaeVP9h',
};


```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/access.updateEmployee'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$employee = [
    'user_id'   => 15,
    'name'      => 'Елена Гончаренко',
    'user_type' => 2,
    'pos_pass'  => '',
    'login'     => 'heleh.gonchar@test.com',
    'pass'      => 'aZntaeVP9h',
];

$data = sendRequest($url, 'post', $employee);
```

#### **Postman**

```json

url = https://joinposter.com/api/access.updateEmployee
 ?token=687409:4164553abf6a031302898da7800b59fb;

{
"user_id": 15,
"name": "Олена Гончаренко",
"user_type": 2,
"pos_pass": "",
"login": "heleh.gonchar@test.com",
"pass": "aZntaeVP9h"
}

```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
  "response":15
}
```
</details>


Метод изменяет свойства сотрудника. По умолчанию в Poster есть должности:

* Официант — нет доступа в админ-панель.
* Администратор зала — администрирование заказов на терминале.
* Маркетолог — доступ к статистике и маркетинговым инструментам.
* Кладовщик — доступ к складам и поставкам.

### HTTP POST запрос

`POST https://joinposter.com/api/access.updateEmployee`

### POST-параметры запроса access.updateEmployee

| Параметр  | Описание                                                                                             |
|-----------|------------------------------------------------------------------------------------------------------|
| user_id   | ID сотрудника.                                                                                        |
| name      | Имя и фамилия сотрудника.                                                                             |
| user_type | Роль сотрудника: 0 — официант, 2 — маркетолог, 3 — кладовщик, 4 — администратор зала.                 |
| pos_pass  | Pin-код официанта или администратора заведения для авторизации на терминале.                          |
| login     | Логин сотрудника для доступа к системе администрирования, нужен только для маркетолога и кладовщика.  |
| pass      | Пароль сотрудника для доступа к системе администрирования, нужен только для маркетолога и кладовщика. |

### Параметры ответа access.updateEmployee

Параметр | Описание
-------- | --------
response | ID измененного сотрудника.
