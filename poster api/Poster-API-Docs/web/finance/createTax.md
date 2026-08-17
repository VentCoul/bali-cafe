## finance.createTax: Создание налога

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.createTax?token=687409:4164553abf6a031302898da7800b59fb';

const tax = {
  name: 'Налог с оборота',
  value: 5,
  type: 2,
  fiscal: 1,
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.createTax'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$tax = [
    'name'   => 'Налог с оборота',
    'value'  => 5,
    'type'   => 2,
    'fiscal' => 1,
];

$data = sendRequest($url, 'post', $tax);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.createTax
 ?token=687409:4164553abf6a031302898da7800b59fb

{
    "name": "Налог с оборота",
    "value": 5,
    "type": 2,
    "fiscal": 1
  }


```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>


```json
{  
  "response":{  
    "tax_id":3
  }
}
```
</details>

Метод создаёт налог

### HTTP POST запрос

`POST https://joinposter.com/api/finance.createTax`

### POST-параметры запроса finance.createTax

| Параметр       | Описание                                                                          |
|----------------|-----------------------------------------------------------------------------------|
| name           | Название налога                                                                   |
| value          | Процент налога                                                                    |
| type           | Тип налога: 1 — налог с продаж, 2 — налог с оборота, 3 — НДС, 4 — без налога.      |
| fiscal         | Фискальность налога: 0 — не фискальный, 1 — фискальный. По умолчанию принимает 0. |
| fiscal_program | Номер программы на фискальном регистраторе. По умолчанию принимает 0.             |

### Параметры ответа finance.createTax

| Параметр | Описание      |
|----------|---------------|
| response | Объект ответа |

Внутри параметра `response` лежит объект, внутри которого есть следующие параметры:

| Параметр | Описание             |
|----------|----------------------|
| tax_id   | ID созданного налога |
