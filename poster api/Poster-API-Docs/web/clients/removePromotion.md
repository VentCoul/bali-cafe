## clients.removePromotion: Удалить акцию

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

const url = 'https://joinposter.com/api/clients.removePromotion?token=687409:4164553abf6a031302898da7800b59fb';

const promotion = {
  promotion_id: 6,
};

```
#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/clients.removePromotion?'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$promotion = [
  'promotion_id' => 6,
];

$data = sendRequest($url, 'post', $promotion);
```

#### **Postman**

```json

url = https://joinposter.com/api/clients.removePromotion
 ?token=687409:4164553abf6a031302898da7800b59fb

{
  "promotion_id": 6
}

```
<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
  "response":true
}
```
</details>

Метод удаляет указанную акцию.

!> Удаленные данные восстановить не получится!

### HTTP POST запрос

`POST https://joinposter.com/api/clients.removePromotion`

### POST-параметры запроса clients.removePromotion

| Параметр     | Описание                 |
|--------------|--------------------------|
| promotion_id | ID акции которую удаляем |

### Параметры ответа clients.removePromotion

| Параметр | Описание                           |
|----------|------------------------------------|
| response | `true`, если акция успешно удалена |

