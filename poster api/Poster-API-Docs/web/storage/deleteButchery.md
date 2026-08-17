## DELETE storage/butcheries/{id}: Удаление переработки

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/storage/butcheries/1'
    . '?token=687409:4164553abf6a031302898da7800b59fb';

$data = sendRequest($url, 'delete');
```

> Пример ответа:

```json
{
  "response": true
}
```

Метод удаляет переработку ингредиентов по заданному ID.

### HTTP запрос

`DELETE https://joinposter.com/api/storage/butcheries/{id}`

### Параметры ответа storage/butcheries

Параметр | Описание
-------- | --------
response | Результат выполнения операции: true — успешно, false — ошибка

### Возможные ответы

HTTP-код | Описание
-------- | --------
200 | Переработка успешно удалена
404 | Переработка не найдена
500 | Внутренняя ошибка сервера

### Возможные ошибки

HTTP-код | Описание | Код | Сообщение
-------- | -------- | --- | --------
200 | Переработки недоступны из-за ограничений тарифного плана | 512 | Pricing plan restriction
404 | Переработка не найдена | 32 | Butchery is undefined
