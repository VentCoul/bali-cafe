## products.getAll: Получить все товары

> Пример запроса:

```javascript
var result = await Poster.products.getAll();

console.log(result); // { success: true, products: Product[] }
```

Метод получает данные всех товаров на касе, тип данных [Product](/docs/v3/pos/types/product).


### Ответ

Функция возвращает `Promise`, который возвращает объект со списком товаров

| Параметр   | Описание                                                                                                 |
|------------|----------------------------------------------------------------------------------------------------------|
| success    | Результат, удалось ли вернуть все товары: `true` — удалось, `false` — произошла ошибка                |
| products   | Массив из объектов типа [Product](/docs/v3/pos/types/[product]). Возвращется если `success` равен `true` |
