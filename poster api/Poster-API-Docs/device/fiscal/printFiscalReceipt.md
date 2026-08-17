## onPrintFiscalReceipt: Печать фискальнго чека

> Пример обработчика фискализации и возврата чека:

```javascript
defaultFiscalPrinter.onPrintFiscalReceipt(async(info, next) => {
    //Ваша логика фискализации
    const { order, sstData } = info;
    let data = {};

    if (order.type === 'sell') {
        const is_error = false;  // Ваша проверка ошибок

        if (is_error) {
            data = {
                errorCode: 5,
                success: false,
                errorText: 'Ошибка фискализации'
            };
        } else {
            const response = {
                numberFD: 123,  
                numberFM: 123   // Пример фискальных данных
            };

            const result = await Poster.orders.setExtras(order.id, 'fiscalResponse', JSON.stringify(response));

            if (result.success) {
                data = {
                    errorCode: 0,
                    success: true,
                    data: response
                };
            } else {
                data = {
                    errorCode: 6,
                    success: false,
                    errorText: 'Ошибка при записи фискальных данных в extras'
                };
            }
        }

    } else if (order.type === 'return') {
        //Ваша логика фискального возврата
        const { numberFD, numberFM } = order.extras.fiscalResponse; //Получаем фискальные данные которые указали в extras

        data = {
            errorCode: 0,
            success: true,
            data: {
                fiscalData: {
                    numberFD: numberFD,
                    numberFM: numberFM
                }
            }
        };
    }

    next(data);
});
```

Событие срабатывает, когда на кассе фискализируют чек или проводят фискальный возврат. Признаком того, что это фискализация чека, будет параметр `type: "sell"`.

В качестве аргумента приходит объект со свойстом `order` — данными заказа, который фискализируется.

При оплате картой на интегрированном с Poster банковском терминале, например KASPI, в объекте аргумента, в параметре `sstData`, содержатся данные ЭПС.  

> Пример `sstData`:

```JSON
{
    "allResponses": {
        "2957": {
            "success": true,
            "adv": "",
            "adv2p": "",
            "amount": "1.00",
            "approvalCode": "969939",
            "bankAcquirer": "ПриватБанк",
            "captureReference": "",
            "cardExpiryDate": "0327",
            "cardHolderName": "",
            "date": "12.03.2025",
            "discount": "0.00",
            "invoiceNumber": "001168",
            "issuerName": "VISA ПРИВАТ",
            "merchant": "S1260S70",
            "pan": "4430XXXXXXXX2397",
            "paymentSystem": "VISA",
            "posConditionCode": "00",
            "posEntryMode": "071",
            "processingCode": "000000",
            "receipt": "",
            "responseCode": "0000",
            "rrn": "094818414608",
            "rrnExt": "507108459259",
            "signVerif": "0",
            "subMerchant": "",
            "terminalId": "S1260S70",
            "time": "10:51:40",
            "track1": "",
            "trnStatus": "1",
            "txnType": "1",
            "merchantId": "ПриватБанк",
            "paymentSystemName": "VISA",
            "authCode": "969939",
            "signVerify": "0",
            "operationType": 1
        }
    },
    "success": true,
    "adv": "",
    "adv2p": "",
    "amount": "1.00",
    "approvalCode": "969939",
    "bankAcquirer": "ПриватБанк",
    "captureReference": "",
    "cardExpiryDate": "0327",
    "cardHolderName": "",
    "date": "12.03.2025",
    "discount": "0.00",
    "invoiceNumber": "001168",
    "issuerName": "VISA ПРИВАТ",
    "merchant": "S1260S70",
    "pan": "4430XXXXXXXX2397",
    "paymentSystem": "VISA",
    "posConditionCode": "00",
    "posEntryMode": "071",
    "processingCode": "000000",
    "receipt": "",
    "responseCode": "0000",
    "rrn": "094818414608",
    "rrnExt": "507108459259",
    "signVerif": "0",
    "subMerchant": "",
    "terminalId": "S1260S70",
    "time": "10:51:40",
    "track1": "",
    "trnStatus": "1",
    "txnType": "1",
    "merchantId": "ПриватБанк",
    "paymentSystemName": "VISA",
    "authCode": "969939",
    "signVerify": "0",
    "operationType": 1,
    "applicationId": 2957,
    "receiptId": 1741769474755,
    "deviceId": "2957_00CT25782403",
    "deviceClass": "platformPayTerminal",
    "fiscal_company_uuid": null,
    "status": 0,
    "fiscal_company_id": null
}
```

Внутри `sstData` содержатся следующие параметры:

| Параметр | Описание |
|-----------------------|-----------------------------------------------------------------------------------------------|
| paymentSystem, paymentSystemName | Наименование платежной системы |
| merchantId | Наименование эквайера торговца |
| rrn | Идентификатор транзакции, предоставляемый эквайером и идентифицирующий транзакцию в платежной системе |
| terminalId | Идентификатор платежного устройства |
| pan | Реквизиты ЭПС |
| authCode | Код авторизации |
| date | Дата транзакции |
| time | Время транзакции |
| amount | Сумма оплаты |
