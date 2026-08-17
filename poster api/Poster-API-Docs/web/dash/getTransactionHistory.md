## dash.getTransactionHistory: Получить историю чека

<details open> 
<summary>Пример запроса</summary>

<!-- tabs:start -->

#### **JS**

```javascript
const url = 'https://joinposter.com/api/dash.getTransactionHistory?token=687409:4164553abf6a031302898da7800b59fb&transaction_id=388678';
```

#### **PHP**

```php
<?php
$url = 'https://joinposter.com/api/dash.getTransactionHistory'
 . '?token=687409:4164553abf6a031302898da7800b59fb'
 . '&transaction_id=388678';

$data = sendRequest($url);
```

#### **Postman**

```json
url = https://joinposter.com/api/dash.getTransactionHistory
 ?token=687409:4164553abf6a031302898da7800b59fb
 &transaction_id=388678;
```

<!-- tabs:end -->
</details>

<details open> 
<summary>Пример ответа</summary>

```json
{
  "response":[
    {
      "transaction_id":"388678",
      "type_history":"print",
      "time":"1507703522429",
      "value":"1",
      "value2":"2147483647",
      "value3":"0",
      "value_text":null,
      "spot_tablet_id":"1"
    },
    {
      "transaction_id":"388678",
      "type_history":"close",
      "time":"1507703520358",
      "value":"3",
      "value2":"145000",
      "value3":"0",
      "value_text":"{\"payments\":{\"cash\":1450}}",
      "spot_tablet_id":"1"
    },
    {
      "transaction_id":"388678",
      "type_history":"additem",
      "time":"1507703508927",
      "value":"168",
      "value2":"0",
      "value3":"0",
      "value_text":"{\"price\":450}",
      "spot_tablet_id":"1"
    },
    {
      "transaction_id":"388678",
      "type_history":"open",
      "time":"1507703507594",
      "value":"1",
      "value2":"95",
      "value3":"3",
      "value_text":null,
      "spot_tablet_id":"1"
    }
  ]
}
```
</details>

Метод возвращает историю действий по чеку.

### HTTP GET запрос

`GET https://joinposter.com/api/dash.getTransactionHistory`

### GET-параметры запроса dash.getTransactionHistory

| Параметр        | Описание                                      |
|----------------|-----------------------------------------------|
| transaction_id | Обязательный параметр, номер чека             |

### Параметры ответа dash.getTransactionHistory

| Параметр | Описание         |
|----------|------------------|
| response | Объект ответа    |

Внутри параметра `response` находится массив объектов, каждый из которых содержит:

| Параметр         | Описание                                                                 |
|------------------|--------------------------------------------------------------------------|
| transaction_id   | Номер чека                                                               |
| type_history     | Действие, совершённое над чеком. Возможные значения указаны ниже        |
| time             | Время действия в миллисекундах                                           |
| spot_tablet_id   | ID кассы                                                                  |
| value_text       | Текстовое значение, соответствующее действию. Может содержать JSON       |
| value, value2, value3 | В зависимости от type_history обозначает следующее:             |

Значения параметров `value`, `value2`, `value3` в зависимости от `type_history`:

### open - Открыт счёт

 * value - id официанта  
 * value2 - id стола  
 * value3 - 0  
 * value4 - тип заказа: 1 — в заведении, 2 — с собой, 3 — доставка

### comment - Добавлен комментарий

 * value - 0  
 * value2 - 0  
 * value3 - 0  
 * value_text - текст комментария  

### close - Напечатан чек и закрыт счёт

 * value - 0  
 * value2 - Общая сумма  
 * value3 - 0  
 * value_text - JSON строка. В поле `payments` находится объект с полями: `cash` — сумма наличными, `card` — картой, `cert` — сертификатом

### delete - Чек удалён

 * value - id товара  
 * value2 - 0  
 * value3 - id модификатора. Если без модификатора — 0

### print - Напечатан чек

 * value - id официанта  
 * value2 - время  
 * value3 - 0  

### sendtokitchen - Отправлен бегунок на кухню

 * value - 0  
 * value2 - 0  
 * value3 - 0  
 * value_text - JSON строка, список блюд, отправленных на кухню

 > Пример `value_text`:

 ```json
[{
  "product_id": 6,
  "modification": "[{\"m\":2,\"a\":1},{\"m\":16,\"a\":1}]",
  "count": 1,
  "guestNumber": 0
}]
 ```

### additem - Добавлен товар

 * value - id добавленного товара  
 * value2 - 0  
 * value3 - id модификатора. Если без модификатора — 0  
 * value4 - id акции, если товар в рамках акции  
 * value_text - JSON строка: поле `price` — цена товара, `modificationData` — массив модификаторов

### settable - Перенос заказа на другой стол

 * value - id стола  
 * value2 - 0  
 * value3 - 0  

### changeitemcount - Изменено количество товара, если `value2` = 0 — товар удалён

 * value - id товара  
 * value2 - количество товара  
 * value3 - id модификатора. Если без модификатора — 0  
 * value4 - id акции, если товар в рамках акции  
 * value_text - JSON строка с полями: `price` — цена товара, `modificationData` — массив модификаторов

### deleteitem - Удалён товар

 * value - id удалённого товара  
 * value2 - 0  
 * value3 - id модификатора. Если без модификатора — 0

### changeorderstatus - Изменён статус заказа

 * value - Статус заказа: 1 — принят, 4 — отменён

### changeservicemode - Изменён тип заказа

 * value - тип заказа: 1 — в заведении, 2 — с собой, 3 — доставка

### setclient - Добавлен клиент

 * value - id клиента  
 * value2 - Размер скидки  
 * value3 - 0

### addpromotion - Применена акция

 * value - id акции  
 * value_text - JSON строка с полями: `promotion` — детали акции, `involved_products` — массив участвующих товаров, `result_products` — массив товаров, полученных в результате акции

### removepromotion - Отменена акция

 * value - id акции  
 * value_text - JSON строка с полями: `promotion` — детали акции, `involved_products` — массив участвующих товаров, `result_products` — массив товаров, полученных в результате акции

### changepromotioncount - Изменено количество акционных товаров

 * value - id товара  
 * value2 - количество товара  
 * value3 - id модификатора. Если товар без модификатора — 0  
 * value4 - id акции, если отмена  
 * value5 - id акции, если применение  
 * value_text - для тех. карт с модификаторами, JSON строка с параметром `modification_id` — массив модификаторов

### splitorder - Разделение чека

 * value - 0  
 * value2 - 0  
 * value3 - 0

### toggle_tip - Добавлен/удален % за обслуживание

 * value - значение % за обслуживание, 0 — если процент удален

### paybyterminal - Оплата через интегрированный банковский терминал

 * value - сумма оплаты  
 * value2 - 0  
 * value3 - 0  
 * value_text - JSON строка с данными по терминалу:

| Параметр                | Описание                                                               |
|-------------------------|------------------------------------------------------------------------|
| paymentSystem, paymentSystemName | Название платёжной системы                            |
| merchantId              | Название эквайера торговца                                              |
| rrn                     | Идентификатор транзакции от эквайера                                    |
| terminalId              | Идентификатор платёжного устройства                                     |
| pan                     | Реквизиты карты                                                         |
| authCode                | Код авторизации                                                         |
| date                    | Дата транзакции                                                         |
| time                    | Время транзакции                                                        |
| amount                  | Сумма оплаты                                                            |
