## devices.get: Получить устройство

> Пример получения устройства по ID:

```javascript
const defaultFiscalPrinter = await Poster.devices.get('id устройства')

console.log(defaultFiscalPrinter);
```

Метод возвращает устройство по указанному ID. Возвращает объект типа [Device](/docs/v3/pos/types/device).

### Аргументы

Аргумент | Описание
-------- | --------
ID | ID устройства 

### Ответ

Функция возвращает `Promise`, который вернет объект [Device](/docs/v3/pos/types/device) с данными о девайсе с указанным ID.
