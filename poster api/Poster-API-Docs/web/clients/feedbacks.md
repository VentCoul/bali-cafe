## clients.feedbacks: Добавить отзыв

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

url = https://joinposter.com/api/clients.feedbacks?token=687409:4164553abf6a031302898da7800b59fb';

{
    "transaction_id": 12,
    "rating": 5,
    "comment": "The best!",
    "date_from": "2024-11-12 21:16:01"
}

```

#### **PHP**

```php

$url = 'https://joinposter.com/api/clients.feedbacks?token=687409:4164553abf6a031302898da7800b59fb';

$feedback = [
  'transaction_id' => 12,
  'rating'         => 5,
  'comment'        => "The best!",
  'date_from'      => "2024-11-12 21:16:01"
];

$data = sendRequest($url, 'post', $feedback);
```

<!-- tabs:end -->

</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
   "response":"12"
}
```
</details>

Метод добавляет отзыв о заведении. Отзывы отображаются в админ-панели, во вкладке **Статистика → Отзывы**.

### HTTP POST запрос

`POST https://joinposter.com/api/clients.feedbacks`

### POST-параметры запроса clients.feedbacks

| Параметр                | Описание                                                             |
|-------------------------|----------------------------------------------------------------------|
| transaction_id | ID чека к которому относится отзыв |
| rating | Оценка, принимает значения от 0 до 5 |
| comment | Комментарий к оценке |
| date_from | Дата и время отзыва в формате `YYYY-MM-DD hh:mm:ss` |
