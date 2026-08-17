## menu.recoverDish: Восстановление тех. карты

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/menu.recoverDish'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$product = [
    'product_id' => 48,
    'menu_category_id' => 10,
    'workshop' => 3,
    'tax_id' => 1,
];

$data = sendRequest($url, 'post', $product);
```

#### **cURL**

```php
curl -X POST \
  'http://poster.pos/api/menu.recoverDish?token=687409:4164553abf6a031302898da7800b59fb' \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data \
  -F product_id=38 \
  -F menu_category_id=5 \
  -F workshop=4 \
  -F tax_id=2

```

<!-- tabs:end -->
</details>

> Пример ответа:

```json
{  
  "response":true
}
```

Метод восстанавливает тех. карту.

### HTTP запрос

`POST https://joinposter.com/api/menu.recoverDish`

### POST-параметры запроса menu.recoverDish

Параметр | Описание
-------- | --------
product_id | ID тех. карты
menu_category | ID категории меню
workshop | ID цеха
tax_id | ID налога

### Параметры ответа menu.recoverDish

Параметр | Описание
-------- | --------
response | true, если тех. карта успешно восстановлена
