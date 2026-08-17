## settings.removePaymentMethod: Удаление метода оплаты

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/settings.removePaymentMethod'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$paymentMethod = [
    'payment_method_id' => 7,
];

$data = sendRequest($url, 'post', $paymentMethod);
```

> cURL пример:  
```php
curl -X POST \
  'https://joinposter.com/api/settings.removePaymentMethod?token=687409:4164553abf6a031302898da7800b59fb' \
  -H 'Content-Type: application/json' \
  -d '{
	 "payment_method_id":7
}'
```

> Пример ответа:

```json
{
  "response": true
}
```

Метод удаляет метод оплаты.

### HTTP POST запрос

`POST https://joinposter.com/api/settings.removePaymentMethod`

### POST-параметры запроса settings.removePaymentMethod

Параметр | Описание
-------- | --------
payment_method_id | Обязательный параметр, ID метода оплаты

### Параметры ответа settings.removePaymentMethod

Параметр | Описание
-------- | --------
response | true, если налог успешно удалён
