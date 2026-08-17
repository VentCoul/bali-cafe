## validateDevice: Поиск устройства в локальной сети

> Пример обработки поиска терминала в локальной сети:

```javascript
const handleDevice = async (device) => {
    await device.setAuth();
    await device.setOnline();

    subscribeHandler(device)
};

const handleValidateDevice = ({ ip }, next) => {
    // Пример получения данных устройства с IP, которое было найдено автоматическим поиском

    const getDeviceInfoByIp = (ip) =>({ serialNumber: 123, vendor: 'Ingenico', model: 'iPP350' });

    const { serialNumber, vendor, model } = getDeviceInfoByIp(ip);
    if (!model) {
        next(false);
        return;
    }

    const deviceObject = {
        ip,
        id: serialNumber,
        name: `${vendor} ${model}`,
        appVersion: '0.1',
        deviceClass: 'platformPayTerminal',
        type: 'payTerminal',
        auth: true,
    };
    next(deviceObject);
};

const handleDeviceCreated = async (createdDevice) => {
    const devices = await Poster.devices.getAll({ type: 'payTerminal' }); //После создания устройства получаем все устройства
    const [device] = devices.filter((device) => device.id === createdDevice.id); //Получаем нужное устройство по ID

    subscribeHandler(device);
}

```

Событие `validateDevice` срабатывает, когда касса Poster находит устройство в локальной сети. 

Чтобы найти ваш банковский терминал в локальной сети, на кассе перейдите во вкладку **Устройства → Другие устройства → Ваша интеграция**. Поиск выполняется в локальной сети по одному порту. Чтобы указать этот порт, обратитесь к нам на почту <a href="mailto:contact@joinposter.com">contact@joinposter.com</a>. Мы укажем порт конкретно для вашей интеграции. Это может быть любой порт кроме 2222 и 2223. 

Для того чтобы автоматический поиск сработал на ваше устройство – оно должно отвечать по HTTP статусом 200 или 404.
