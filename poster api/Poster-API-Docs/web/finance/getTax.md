## finance.getTax: Свойства налога

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.getTax
?token=687409:4164553abf6a031302898da7800b59fb
&tax_id=3';

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.getTax'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&tax_id=3';

$data = sendRequest($url);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.getTax
 ?token=687409:4164553abf6a031302898da7800b59fb
 &tax_id=3

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
  "response":{  
    "tax_id":3,
    "country":"UA",
    "tax_name":"Налог с оборота",
    "tax_value":5,
    "type":2,
    "fiscal":1,
    "fiscal_program":0,
    "fixed":0,
    "delete":0
  }
}
```
</details>

Метод возвращает свойства налога.

### HTTP GET запрос

`https://joinposter.com/api/finance.getTax`

### GET-параметры запроса finance.getTax

Параметр | Описание
-------- | --------
tax_id | ID налога

### Параметры ответа finance.getTax

Параметр | Описание
-------- | --------
response | Объект ответа

Внутри параметра `response` лежит объект, внутри которого параметры:

Параметр | Описание
-------- | --------
tax_id | ID налога
country | Двухбуквенный код страны, формат ISO 3166
tax_name | Название налога
tax_value | Процент налога
type | Тип налога: 1 — налог с продаж, 2 — налог с оборота, 3 — НДС, 4 — без налога 
fiscal | Фискальность налога: 0 — не фискальный, 1 — фискальный
fiscal_program | Номер программы на фискальном регистраторе
fixed | Признак, фиксированный ли налог: 0 — не фиксированный, 1 — фиксированный
delete | Признак, удалён ли налог: 0 — не удалён, 1 — удалён
