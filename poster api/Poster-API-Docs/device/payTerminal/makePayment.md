## makePayment: Оплата заказа

> Пример обработки оплаты картой:

```javascript

device.on('makePayment', handlePayment); // Подписка на событие оплаты

const handlePayment = (data, next) => {
    const { device, sum } = data; // Получаем данные из события: устройство и сумма оплаты

    // Пример ответа терминала
    const response = {
        "error": false, // Или true, если произошла ошибка
        "errorDescription": "",
        "method": "Purchase",
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
        console.error('Ошибка оплаты:', response.errorDescription);
        next({ success: false, error_text: response.errorDescription });
        return;
    }

    // Обработка успешной оплаты
    const sstParams = {
        amount: response.params.amount,
        merchantId: response.params.merchant,
        paymentSystemName: response.params.paymentSystem,
        authCode: response.params.approvalCode,
        signVerify: response.params.signVerify,
        rrn: response.params.rrn,
        operationType: 1 // 1 - оплата, 2 - возврат
    };

    console.log('Оплата успешно завершена');
    next({ success: true, sstParams }); 
};
```

Событие срабатывает, когда на кассир выбирает оплату картой, и из списа выбирает ваш банковский терминал, если их несколько.

В качетсве аргумента приходит объект с данными об устройтсве и суммой к оплате. 

!> При успешной оплате нужно передать `sstParams`. Эти данные сохранятся и привяжутся к чеку в Poster. При возврате картой через интеграцию именно из sstData вы сможете получить данные для автоматического возврата.

В примере указаны `sstParams` обязательные для Украины. Эти данные будут напечатаны на фискальном чеке ПРРО/РРО.
