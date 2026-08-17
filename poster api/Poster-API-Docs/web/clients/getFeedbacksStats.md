## feedbacks.stats: Получить статистику по отзывам

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript

url = https://joinposter.com/api/feedbacks/stats?token=687409:4164553abf6a031302898da7800b59fb';

```

#### **PHP**

```php

$url = 'https://joinposter.com/api/feedbacks/stats?token=687409:4164553abf6a031302898da7800b59fb';

$data = sendRequest($url, 'get');
```

<!-- tabs:end -->

</details>

<details open> 
<summary>Пример ответа</summary>

```json
{  
   "count":0,
   "averageRating": 5
}
```
</details>

Метод для получения статистики по отзывам

### HTTP GET запрос

`GET https://joinposter.com/api/feedbacks/stats`
