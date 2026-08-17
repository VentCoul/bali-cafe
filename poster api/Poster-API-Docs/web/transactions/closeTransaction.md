## transactions.closeTransaction: Закрытие чека

> Пример запроса:

```php
<?php
$url = 'https://joinposter.com/api/transactions.closeTransaction'
 . '?token=687409:4164553abf6a031302898da7800b59fb';

$transaction = [
    'spot_id'        => 1,
    'spot_tablet_id' => 1,
    'transaction_id' => 1950,
    'payed_cash'     => 1000,
    "acquirer_payments" => [
        {
            "amount": 1660.11,
            "bank_acquirer": "CREDIT AGRICOLE BANK JSC",
            "payment_system_name": "liqpay",
            "pan": "544535*51",
            "auth_code": "461384",
            "rrn": "461386",
            "terminal_id": "414963",
            "company_code": "34554363",
            "payment_system_method": "cardTransfer"
        }, 
        {
            "amount": 1660.00,
            "bank_acquirer": "Private 24",
            "payment_system_name": "liqpay",
            "pan": "544535*50",
            "auth_code": "461386",
            "rrn": "461386",
            "terminal_id": "414963",
            "company_code": "34554363"
        }
    ]
];

$data = sendRequest($url, 'post', $transaction);
```

> Пример ответа:

```json
{  
  "response":{  
    "err_code":0
  }
}
```

Метод закрывает чек.

### HTTP запрос

`POST https://joinposter.com/api/transactions.closeTransaction`

### POST-параметры запроса transactions.closeTransaction

Параметр | Описание
-------- | --------
spot_id | ID заведения
spot_tablet_id | ID кассы
transaction_id | ID чека
payed_cash | Сумма оплаты наличным расчётом
payed_card | Сумма оплаты безналичным расчётом
payed_cert | Сумма оплаты сертификатом
tip_included | Включить % за обслуживание: 1 - включать, 2 - не включать
tip_sum | Сумма % за обслуживание
reason | Причина закрытия чека без оплаты: 1 — гость ушел, 2 — за счёт заведения, 3 — ошибка официанта. Обязательное поле для закрытия чека без оплаты, сумма всех оплат должна быть равна нулю. По умолчанию не передаётся.
print_fiscal | Печатать фискального чека: 0 — не печатать, 1 — печатать. По умолчанию принимает 0.
time | Время операции в формате microtime, по умолчанию принимает текущее время
payment_method_id | ID кастомного метода оплаты

Внутри параметра `acquirer_payments` (учитывается только если оплата проводится безналичным расчётом `payed_card`) должен быть массив, в каждом элементе которого должны быть следующие параметры:

Параметр | Описание
-------- | --------
amount | Сумма оплаты наличными (обязательно с точностью до сотых)
bank_acquirer | Наименование банка
payment_system_name | Наименование платёжной системы
pan | Реквизиты ЭПС
auth_code | Код авторизации
rrn | Идентификатор транзакции, предоставляемый эквайером и идентифицирующий транзакцию в платёжной системе
terminal_id | Идентификатор платёжного устройства
company_code | Для ФОП это — inn, для ООО это — ЕДРПОУ (поле необязательное — учитывается только если включена опция «Одновременно работать с несколькими РРО в заведении».)
payment_system_method | Опциональный параметр, тип платежной системи: internetAcquiring, cardTransfer, cardPayment


### Параметры ответа transactions.closeTransaction

Параметр | Описание
-------- | --------
response | Объект ответа

Внутри параметра `response` лежит объект, внутри которого есть следующие параметры:

Параметр | Описание
-------- | --------
err_code | 0, если чек успешно закрыт

В ходе выполнения могут произойти общие ошибки, их описание находится в разделе [Коды ошибок](/docs/v3/web/errors).
