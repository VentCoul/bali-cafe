## revertPayment: Возврат оплаты

> Пример обработки возврата оплаты:

```javascript
device.on('revertPayment', handleRevert); // Подписка на событие возврата

const handleRevert = (data, next) => {
    const { device, sstData } = data; // Получаем данные о возврате

    // Пример ответа терминала при успешном возврате
    const response = {
        "error": false, // Или true, если произошла ошибка
        "errorDescription": "",
        "method": "Refund",
        "params": {
            "amount": "100.00",
            "approvalCode": "111111",
            "bankAcquirer": "ПриватБанк",
            "cardExpiryDate": "0530",
            "date": "16.07.2024",
            "signVerify": 0,
            "invoiceNumber": "000111",
            "issuerName": "MASTER",
            "merchant": "S1KKKK",
            "pan": "XXXXXXXXXXXX1111",
            "paymentSystem": "MasterCard",
            "rrn": "111111111111",
            "terminalId": "S1KKKK",
        }
    };

    // Обработка ошибки
    if (response.error) {
        console.error('Ошибка возврата:', response.errorDescription);
        next({ success: false, error_text: response.errorDescription });
        return;
    }

    // Обработка успешного возврата
    const sstParams = {
        amount: response.params.amount
        merchantId: response.params.merchant,
        paymentSystemName: response.params.paymentSystem,
        authCode: response.params.approvalCode,
        signVerify: response.params.signVerify,
        rrn: response.params.rrn,
        operationType: 2 // 1 - оплата, 2 - возврат
    };

    console.log('Возврат успешно завершен');
    next({ success: true, sstParams }); // Передаем параметры успешного возврата
};
```

Событие срабатывает при нажатии кнопки **Возврат** в **Архиве чеков** для чека, оплаченого картой через ваш терминал.

В качетсве аргумента приходит объект с данными об устройтсве и суммой возврата. 

!> При успешной оплате нужно передать `sstParams`. Эти данные сохранятся и привяжутся к чеку в Poster.

В примере указаны `sstParams` обязательные для Украины. Эти данные будут напечатаны на фискальном чеке ПРРО/РРО.
