## menu.updateProductPrice: Изменение цены товара

> Пример запроса на изменение цены товара:

```php
<?php
$url = 'https://joinposter.com/api/menu.updateProductPrice'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$product = [
    'spot_id'          => 1,
    'price'            => '100',
    'product_id'       => 139,
    'modificator_id'   => 0,
];

$data = sendRequest($url, 'post', $product);
```

> Пример ответа:

```json
{  
  "success": 1
}
```

Метод изменяет цену одного или нескольких товаров.

### HTTP POST запрос

`POST https://joinposter.com/api/menu.updateProductPrice`

### POST-параметры запроса menu.updateProductPrice

Параметр | Описание
-------- | --------
spot_id | ID заведения, обязтаельный параметр для обновления цены с product_id
price | Стоимость товара в валюте аккаунта, обязательный параметр для обновления цены с product_id
product_id | ID товара, обязательный параметр, если нет массива products
modificator_id | ID модификатора, необязательный параметр
products | Массив товаров с ценами, необязательный параметр
modifications | Массив модификаций товара или модификаторов тех. карт

### POST-параметры массива products

Параметр | Описание
-------- | --------
id | ID товара
spot_id | ID заведения
price | Стоимость товара

### POST-параметры массива modifications

Параметр | Описание
-------- | --------
id | ID модификации товара или модификатора тех.карты
spot_id | ID заведения, если это модификатор товара
price | Стоимость модификации


### Параметры ответа menu.updateProductPrice без модификаций

Параметр | Описание
-------- | --------
success | 1 — в случае успешной операции

