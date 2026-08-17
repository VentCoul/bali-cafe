## onPrintPeriodicReport: Печать периодического отчета

> Пример вывода периодического отчета

```javascript

defaultFiscalPrinter.onPrintPeriodicReport(async (info, next) => {

    try {
        // Логика формирования отчета
        const reportData = await generateReport(); // Функция, которая генерирует или запрашивает отчет

        // Если успешно, выводим поп-ап с отчетом
        Poster.interface.popup({
            width: 600,
            height: 500,
            title: "Periodic report",
        });

        next({
            success: true
        });

    } catch (error) {
        // Если возникла ошибка, возвращаем success: false и текст ошибки
        next({
            success: false,
            error_message: Error: ${error.message}
        });
    }
});
```

Событие срабатывает, когда кассир нажимает кнопку **Периодический отчет** на кассе.

Периодический отчет — это отчет по фискальным операциям за указанный пользователем период. Поэтому перед выводом отчета стоит также реализовать окно выбора периода. Для этого подойдет метод [Poster.interface.popup](/docs/v3/pos/interfaces/interface-popup).
