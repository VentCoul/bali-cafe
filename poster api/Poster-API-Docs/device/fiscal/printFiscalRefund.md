## onPrintFiscalReceipt: Возврат фискальнго чека

> Пример обработчика фискализации и возврата чека:

```javascript
defaultFiscalPrinter.onPrintFiscalReceipt(async(info, next) => {
    //Ваша логика фискализации
    const { order } = info;
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

Событие срабатывает, когда на кассе фискализируют чек или проводят фискальный возврат.

В качестве аргумента приходит объект со свойстом `order` — данными заказа, который фискализируется.

Возврат фискального чека также считается фискализацией, поэтому на него срабатывает событие `onPrintFiscalReceipt`. Признаком того, что это возврат, будет параметр `type: "return"`
