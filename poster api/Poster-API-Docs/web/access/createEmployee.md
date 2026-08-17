## access.createEmployee: Создать сотрудника

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript
const url = 'https://joinposter.com/api/access.createEmployee
?token=687409:4164553abf6a031302898da7800b59fb';

const employee = {
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
$url = 'https://joinposter.com/api/access.createEmployee'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$employee = [
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

url = https://joinposter.com/api/access.createEmployee?token=687409:4164553abf6a031302898da7800b59fb

{
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

Метод создаёт сотрудника.

Все сотрудники имеют свою роль и права доступа. По умолчанию в Poster есть должности:

* Официант — нет доступа в админ-панель.
* Администратор зала — администрирование заказов на кассе.
* Маркетолог — доступ к статистике и маркетинговым инструментам.
* Кладовщик — доступ к складам и поставкам.

### HTTP POST запрос

`POST https://joinposter.com/api/access.createEmployee`

### POST-параметры запроса access.createEmployee

| Параметр  | Описание                                                                                             |
|-----------|------------------------------------------------------------------------------------------------------|
| name      | Имя и фамилия сотрудника.                                                                             |
| user_type | Роль сотрудника: 0 — официант, 2 — маркетолог, 3 — кладовщик, 4 — администратор зала.                 |
| pos_pass  | PIN-код официанта или администратора заведения для авторизации на кассе.                          |
| login     | Логин сотрудника для доступа к системе администрирования, нужен только для маркетолога и кладовщика.  |
| pass      | Пароль сотрудника для доступа к системе администрирования, нужен только для маркетолога и кладовщика. |

### Параметры ответа access.createEmployee

| Параметр | Описание                 |
|----------|--------------------------|
| response | ID созданного сотрудника |
