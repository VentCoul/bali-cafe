## Создание чека

> Пример запроса:

```php
curl -X POST 'https://joinposter.com/api/orders?token=687409:4164553abf6a031302898da7800b59fb' \
-H 'Content-Type: application/json' \
-d '{
    "spotId": 1,
    "tableId": 1,
    "waiterId": 4,
    "guestsCount": 1,
    "serviceMode": 3,
    "autoAccept": false,
    "client": {
        "id": 1,
        "firstName" : "Test",
        "lastName" : "Test",
        "phone": "+380501111111",
        "email": "test@gmail.com",
        "address": {
            "street": "address1",
            "additionalInfo": "address2",
            "comment": "Some comment",
            "lat": "",
            "lng": ""
        }
    },
    "comment": "Some comment",
    "products": [
        {
            "id": 25,
            "count": 2,
            "price": 33.11,
            "comment": "Some comment"
        },
        {
            "id": 35,
            "count": 0.04
        },
        {
            "id": 18,
            "count": 3,
            "modificatorId": 1,
            "comment": "Some comment #2"
        },
        {
            "id": 39,
            "count": 1,
            "comment": "Some comment #3",
            "modification": [
                {
                    "id": 6,
                    "count": 1
                }
            ]
        }
    ],
    "delivery": {
        "courierId": 1,
        "processingStatus": 40,
        "deliveryPrice": 100.66,
        "time": "2024-07-15 16:30:02",
        "paymentMethodId": 2
    },
    "payments": [
        {
        "sum": 762.86
        }
    ],
    "acquirerPayments": [
        {
            "amount": 1660.11,
            "bankAcquirer": "CREDIT AGRICOLE BANK JSC",
            "paymentSystemName": "liqpay",
            "pan": "544535*51",
            "authCode": "461384",
            "rrn": "461386",
            "terminalId": "414963",
            "companyCode": "34554363",
            "paymentSystemMethod": "cardTransfer"
        }, 
        {
            "amount": 1660.00,
            "bankAcquirer": "Private 24",
            "paymentSystemName": "liqpay",
            "pan": "544535*50",
            "authCode": "461386",
            "rrn": "461386",
            "terminalId": "414963",
            "companyCode": "34554363"
        }
    ]
}'

```

> Пример ответа:

```json
{
  "response": {
    "id": 156,
    "status": 0,
    "payType": 0,
    "sum": 343.72,
    "spotId": 1,
    "tableId": 0,
    "waiterId": 0,
    "guestsCount": 1,
    "serviceMode": 3,
    "client": {
      "id": 1
    },
    "comment": "Some comment",
    "products": [
      {
        "id": 25,
        "count": 2,
        "price": 33.11,
        "comment": "Some comment"
      },
      {
        "id": 35,
        "count": 0.04,
        "price": 600
      },
      {
        "id": 18,
        "count": 3,
        "price": 12,
        "modificatorId": 1,
        "comment": "Some comment #2"
      },
      {
        "id": 39,
        "count": 1,
        "price": 1.5,
        "modification": [
          {
            "id": 6,
            "count": 1
          }
        ],
        "comment": "Some comment #3"
      }
    ],
    "delivery": {
      "courierId": 1,
      "processingStatus": 40,
      "deliveryPrice": 100
    }
  }
}
```

Метод создаёт чек.

### HTTP запрос

`POST https://joinposter.com/api/orders`

### POST-параметры запроса

Параметр | Описание
-------- | --------
spotId | ID заведения в котором нужно создать чек
tableId | ID стола
waiterId | ID сотрудника
guestsCount | Количество гостей за столом
serviceMode | Опциональный параметр, по умолчанию service_mode = 1. Тип заказа: 1 — в заведении, 2 — навынос, 3 — доставка
autoAccept | Опциональный параметр, по умолчанию autoAccept = true. Определяет автоматическое принятие заказа: false - заказ требует ручного подтверждения, true - заказ принимается автоматически

Внутри параметра `client` лежит объект, внутри которого есть следующие параметры:

Параметр | Описание
-------- | --------
id | ID клиента в Poster, если id не указан, то нужно передать параметр phone. Poster попробует найти клиента с таким же номером телефона и привяжет его к заказу. Если это новый клиент, то официант выберет для него группу и Poster создаст нового клиента.
firstName | Имя клиента, по умолчанию не передаётся
lastName | Фамилия клиента, по умолчанию не передаётся
phone | Телефон клиента, обязательный параметр если не указан client ID
email | Эл. почта, по умолчанию не передаётся

Внутри параметра `client` лежит параметр `address`, внутри которого есть следующие параметры:

Параметр | Описание
-------- | --------
street | Улица и номер дома
additionalInfo | Дополнительно: подъезд, этаж, квартира и т. д.
comment | Комментарий к адресу
lat | Координата широты адреса клиента
lng | Координата долготы адреса клиента

Внутри параметра `products` должен быть массив, в каждом элементе которого должны быть следующие параметры:

Параметр | Описание
-------- | --------
id | ID товара
modificatorId | ID модификации товара
count | Обязательный параметр, количество товара
modification | Модификаторы тех. карты, по умолчанию не передаётся
comment | Комментарий к товару

Внутри параметра `modification` должен быть массив, в каждом элементе которого должны быть следующие параметры:

Параметр | Описание
-------- | --------
id | ID модификатора тех. карты
count | Количество модификатора тех. карты

Внутри параметра `delivery` лежит объект, внутри которого есть следующие параметры:

Параметр | Описание
-------- | --------
courierId | ID курьрера
processingStatus | Статус заказа: 10 - открыт, 20 - готовится, 40 - в пути, 50 - доставлен
deliveryPrice | Сумма доставки
time | Время доставки/самовывоза заказа в формате `YYYY-MM-DD hh:mm:ss`, по умолчанию не передается
paymentMethod | ID метода оплаты, по умолчанию не передаётся

Всередині параметра `payments` должен быть массив, в каждом элементе которого должны быть следующие параметры (на данный момент только один элемент массива с полной оплатой):

Параметр | Описание
-------- | --------
sum | полная сумма оплаты в валюте аккаунта

Внутри параметра `acquirerPayments` (учитывается только если заказ был оплачен полностью) должен быть массив, в каждом элементе которого должны быть следующие параметры:

Параметр | Описание
-------- | --------
amount | Сумма оплаты (обязательно с точностью до сотых)
bankAcquirer | Наименование банка
paymentSystemName | Наименование платёжной системы
pan | Реквизиты ЭПС
authCode | Код авторизации
rrn | Идентификатор транзакции, предоставляемый эквайером и идентифицирующий транзакцию в платёжной системе
terminalId | Идентификатор платёжного устройства
companyCode | Для ФОП это — inn, для ООО это — ЕДРПОУ (поле необязательное — учитывается только если включена опция «Одновременно работать с несколькими РРО в заведении».)
paymentSystemMethod | Опциональный параметр, тип платежной системи: internetAcquiring, cardTransfer, cardPayment

В ходе выполнения могут произойти общие ошибки, их описание находится в разделе [Коды ошибок](/docs/v3/web/errors).
