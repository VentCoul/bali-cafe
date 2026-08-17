## Интеграция с фискализацией

Интеграция с фискальным решением позволяет автоматизировать печать и регистрацию фискальных документов: чеков, Z- и X-отчётов, движений средств, а также других операций, предусмотренных законодательством вашей страны.
Фискальным решением может быть как физический фискальный регистратор, так и онлайн-сервис, работающий через API.

Приложение для фискализации в POS Platform получает данные о фискальных событиях и передаёт их во внешнее фискальное решение, отвечающее за регистрацию документов.

Ниже приведён полный перечень шагов для создания рабочей интеграции.

### Основные шаги интеграции

#### 1. Развёртывание и подготовка проекта

Интеграция строится на основе базового шаблона:

1. Клонируем шаблон [POS Platform boilerplate](https://github.com/joinposter/pos-platform-boilerplate).
2. Точка входа — `src/js/app.jsx`, из которого удаляем все примеры и импорты компонентов.
3. Компонент `<App />` будет открываться во всплывающем окне Poster через метод [Poster.interface.popup](/docs/v3/pos/interfaces/interface-popup):

```jsx
ReactDOM.render(<App />, document.getElementById('app-container'));
```

#### 2. Добавление кнопок на кассу и обработка событий интерфейса Poster

Чтобы кассир мог взаимодействовать с ФР или онлайн-ККМ, в кассовый интерфейс добавляются кнопки:

```javascript
window.Poster.interface.showApplicationIconAt({
  functions: 'Настройки',
  receiptsArchive: 'Печать копии ФД'
});
```

Событие [applicationIconClicked](/docs/v3/pos/events/applicationIconClicked) позволяет выполнить нужную логику при нажатии:

```javascript
Poster.on('applicationIconClicked', (data) => {
  if (data.place === 'receiptsArchive' && data.order) {
    printFDByNumberReceiptsArchive(data.order);
  } else {
    Poster.interface.popup({
      width: 400,
      height: 252,
      title: 'Настройки'
    });
  }
});
```

#### 3. Хранение служебных данных

Фискализация может требовать хранения конфигураций:

* IP/URL фискального сервиса,
* API-токенов,
* флагов состояния,
* идентификаторов кассового оборудования,
* прочих параметров.

Для этого можно использовать:

* собственную базу данных;
* Poster extras:

  * `window.Poster.settings.spotTabletExtras`,
  * `window.Poster.settings.spotExtras`;
* `localStorage` (не рекомендуется из-за неконсистентности на разных ОС).

Пример сохранения через extras:

```javascript
const setEntityExtras = (extras) =>
  makeApiRequest('application.setEntityExtras', 'post', {
    entity_type: 'tablet',
    entity_id: window.Poster.settings.spotTabletId,
    extras
  });
```

Это позволяет сохранять параметры приложения между сессиями кассы.

#### 4. Создание и инициализация фискального устройства в Poster

В Poster фискальное решение всегда регистрируется как **фискальное устройство**, независимо от того, является ли оно физическим регистратором или онлайн-ККМ, работающим через API.

Алгоритм:

1. Проверяем, существует ли устройство.
2. Если нет — создаём новое устройство типа `platformOnlineFiscal` (универсальная абстракция Poster).
3. Устанавливаем его как устройство "по умолчанию" и переводим в состояние "онлайн".

```javascript
const initDevice = async () => {
  const devices = await Poster.devices.getAll({ type: 'fiscalPrinter' });
  const defaultFiscalPrinter = devices.find((device) => !device.hidden);

  if (defaultFiscalPrinter) {
    defaultFiscalPrinter.setDefault();
    defaultFiscalPrinter.setOnline();
    return defaultFiscalPrinter;
  }

  const fiscalPrinter = await Poster.devices.create({
    deviceClass: 'platformOnlineFiscal',
    name: 'Фискальный принтер'
  });

  fiscalPrinter.setDefault();
  fiscalPrinter.setOnline();

  return fiscalPrinter;
};
```

> **Важно:**
> Название «Фискальный принтер» в коде не означает обязательное наличие физического устройства — это лишь технический тип для фискального модуля.

#### 5. Подписка на фискальные события

Poster генерирует события при попытке печати чека, Z- и X-отчётов, движений средств и др.
Ваше приложение должно перехватить эти события и отправить данные во внешнее фискальное решение (онлайн-ККМ или ФР).

```javascript
const subscribeToEvents = (fiscalPrinter) => {
  fiscalPrinter.onPrintFiscalReceipt(onPrintFiscalReceipt);
  fiscalPrinter.onPrintCashFlow(onPrintCashFlow);
  fiscalPrinter.onPrintZReport(onPrintZReport);
  fiscalPrinter.onPrintXReport(onPrintXReport);
  fiscalPrinter.onOpenCashDrawer(onOpenCashDrawer);
};
```

Полный список событий доступен в разделе [Фискальный принтер](/docs/v3/device/fiscal/index).

#### 6. Передача фискальных данных в ваш API

Poster предоставляет универсальный способ выполнения HTTP-запросов через метод [Poster.makeRequest](/docs/v3/pos/requests/makeRequest).

Этим способом можно взаимодействовать как с:

* локальным устройством в сети,
* онлайн-ККМ по URL.

Код остаётся одинаковым:

```javascript
const formRequestInit = (data) => ({
  method: 'POST',
  headers: ['Content-Type: application/json'],
  data,
  timeout: 10000,
  localRequest: true
});
```

Пример отправки запроса:

```javascript
const makeRequest = async (url, payload) =>
  new Promise((resolve) =>
    Poster.makeRequest(url, formRequestInit(payload), (response) => {
      resolve(response?.result);
    })
  );
```

```javascript
const printFiscalReceipt = (url) => {
  const data = {
    // данные, необходимые для регистрации фискального чека
  };

  return makeRequest(url, data);
};
```

#### 7. Обработка ответа и возврат результата в Poster

После вызова внешнего API необходимо сообщить Poster, успешно ли прошла фискализация:

```javascript
const handleResponse = (response) =>
  response?.rc === 'SUCCESS'
    ? { data: { errorCode: 0, success: true } }
    : {
        data: {
          errorCode: 1,
          success: false,
          errorText: response?.rc
        }
      };
```

Также кассиру можно показать уведомление:

```javascript
const showNotification = (message, success = true) => {
  Poster.interface.showNotification({
    title: 'Фискальный модуль',
    message,
    icon: success ? 'success' : 'error'
  });
};
```

#### 8. Деплой приложения в production

1.Указываем `applicationId` и `applicationSecret` в `manifest.json`:

```json
{
  "applicationId": "",
  "applicationSecret": ""
}
```

2.Загружаем приложение:

```
node upload.mjs
```

3.Для GitHub можно настроить автоматический деплой:

```yaml
name: Your app name CI

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.x'
      - run: npm ci
      - run: npm deploy
```

> Вы также можете ознакомиться с [примером интеграции Poster с фискальным регистратором на GitHub](https://github.com/OleksandrZhmirko/poster-fiscal-ua/tree/main)
