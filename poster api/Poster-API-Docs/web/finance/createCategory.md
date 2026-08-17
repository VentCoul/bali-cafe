## finance.createCategory: Создание новой финансовой категории

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/finance.createCategory
?token=687409:4164553abf6a031302898da7800b59fb';

const category = {
  category_name: 'Коммуналка',
  category_parent: 0,
  operations_in: 0,
  operations_out: 1,
  visible_pnl: 1,
  pnl_group: 2,
};

```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/finance.createCategory'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$category = [
    'category_name'     => 'Коммуналка',
    'category_parent'   => 0,
    'operations_in'     => 0, 
    'operations_out'    => 1,
    'visible_pnl'       => 1,
    'pnl_group'         => 2
];

$data = sendRequest($url, 'post', $category);
```

#### **Postman**

```json

url = https://joinposter.com/api/finance.createCategory
 ?token=687409:4164553abf6a031302898da7800b59fb

{
    "category_name": "Коммуналка",
    "category_parent": 0,
    "operations_in": 0,
    "operations_out": 1,
    "visible_pnl": 1,
    "pnl_group": 2
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

Метод создает новую финансовую категорию.

### HTTP POST запрос

`POST https://joinposter.com/api/finance.createCategory`

### POST-параметры запроса finance.createCategory

| Параметр        | Описание                                                                                                                                                                                                                                                                                             |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| category_name   | Название категории                                                                                                                                                                                                                                                                                   |
| category_parent | ID родительской категории, если 0 то текущая категория отобразиться на самом верхнем уровне.                                                                                                                                                                                                          |
| operations_in   | Допустимы ли транзакции типа доходы: 1 — допустимы, 0 — нет.                                                                                                                                                                                                                                          |
| operations_out  | Допустимы ли транзакции типа расходы: 1 — допустимы, 0 — нет.                                                                                                                                                                                                                                         |
| visible_pnl     | Опциональный. Определяет отображение в отчете P&L: 0 - не отображать, 1 - отображать.                                                                                                                                                                                                                |
| pnl_group       | Опциональный. Группа в P&L. 0 - не отображать, 1 - доход, 2 - затраты, 3 - себестоимость, 4 - после прибыли после налогообложений. Если допустимые транзакции не выбраны, всегда 0. Если выбраны только доходы - 1, если выбраны доходы и затраты - 2. Если только затраты, можно выбирать 2, 3 и 4. |

### Параметры ответа finance.createCategory

| Параметр | Описание               |
|----------|------------------------|
| response | ID созданной категории |
