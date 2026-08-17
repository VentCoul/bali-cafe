## onPrintZReport: Печать Z-отчета

> Пример вывода Z-отчета в интерфейсе кассы:

```javascript

defaultFiscalPrinter.onPrintZReport(async (info, next) => {

    try {
        // Логика формирования отчета
        const reportData = await generateReport(); // Функция, которая генерирует или запрашивает отчет

        // Если успешно, выводим поп-ап с отчетом
        Poster.interface.popup({
            width: 600,
            height: 500,
            title: "Z-report",
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

Событие срабатывает, когда кассир нажимает кнопку **Z-отчет** на кассе.
