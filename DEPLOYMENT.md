# Інструкція з розгортання Bali Cafe на VPS

Ця інструкція допоможе вам безпечно та правильно розгорнути сайт на вашому VPS з використанням Docker, Nginx та безкоштовного SSL сертифікату від Let's Encrypt.

## 1. Підготовка сервера

Переконайтеся, що на вашому сервері встановлені необхідні програми. Якщо ні, виконайте ці команди (для Ubuntu/Debian):

```bash
# Оновлення системи
sudo apt update && sudo apt upgrade -y

# Встановлення Nginx та Certbot (для SSL)
sudo apt install nginx certbot python3-certbot-nginx -y

# Встановлення Docker та Docker Compose
sudo apt install docker.io docker-compose -y
sudo systemctl enable --now docker
```

## 2. Копіювання коду на сервер

Ви можете перенести код на сервер за допомогою Git (найкращий варіант) або скопіювати напряму через SSH.

**Варіант А: Через Git (рекомендовано)**
```bash
git clone https://github.com/VentCoul/bali-cafe.git
cd bali-cafe
```

**Варіант Б: Скопіювати файли напряму через SSH (з вашого комп'ютера)**
Виконайте цю команду у терміналі на *вашому комп'ютері* (не на сервері), замінивши `user@ваша_ip_адреса` на реальні дані вашого VPS:
```bash
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' ./ user@ваша_ip_адреса:~/bali-cafe/
```
Після успішного копіювання, зайдіть на сервер через SSH і перейдіть у папку:
```bash
cd ~/bali-cafe
```

## 3. Налаштування змінних середовища (.env.local)

Перед запуском додатку потрібно створити файл з ключами від Poster API та паролем для адмінки.

1. Скопіюйте шаблон:
```bash
cp .env.local.example .env.local
```

2. Відкрийте файл для редагування:
```bash
nano .env.local
```

3. Впишіть ваші реальні дані:
- `POSTER_CLIENT_ID` та `POSTER_CLIENT_SECRET` (це ключі самого "додатку", які треба створити на dev.joinposter.com, вони потрібні для того, щоб підключити ваш особистий акаунт)
- `ADMIN_PASSWORD` (придумайте надійний пароль для доступу в `/admin`, логін завжди `admin`)
- `NEXT_PUBLIC_BASE_URL` (замініть `http://localhost:3000` на ваш реальний домен, наприклад `https://balicafe.com.ua` або `https://1-2-3-4.nip.io`)

Збережіть файл (Ctrl+O, Enter, Ctrl+X).

## 4. Запуск додатку через Docker

Тепер, коли код на сервері і ключі налаштовані, запускаємо контейнер:

```bash
sudo docker-compose up -d --build
```
*Ця команда скачає залежності, скомпілює Next.js додаток (це може зайняти пару хвилин) і запустить його у фоні на порту 3000.*

Перевірити, чи працює контейнер, можна командою:
```bash
sudo docker ps
```

## 5. Налаштування Nginx (Reverse Proxy)

Сайт вже працює на порту 3000, але нам потрібно, щоб він відкривався по стандартному порту 80 (HTTP) за вашим доменом.

1. Створіть новий файл конфігурації Nginx:
```bash
sudo nano /etc/nginx/sites-available/balicafe
```

2. Вставте наступну конфігурацію (замініть `your_domain.com` на ваш реальний домен):
```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Для передачі реального IP користувача
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
*Збережіть (Ctrl+O, Enter, Ctrl+X).*

3. Увімкніть сайт та перезапустіть Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/balicafe /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 6. Встановлення SSL сертифікату (HTTPS)

Це **обов'язковий** крок, оскільки Poster API OAuth (авторизація) вимагає, щоб `redirect_uri` починався з `https://`.

Виконайте команду і дотримуйтесь інструкцій на екрані:
```bash
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

Certbot автоматично оновить ваш конфіг Nginx і налаштує перенаправлення з HTTP на HTTPS.

## 7. Фінальна перевірка

1. Відкрийте ваш сайт в браузері (наприклад, `https://your_domain.com`).
2. Перейдіть в адмінку `https://your_domain.com/admin`.
3. Браузер має запросити логін і пароль. Введіть `admin` та пароль, який ви вказали в `.env.local`.
4. Натисніть "Підключити Poster" та пройдіть авторизацію (переконайтеся, що в налаштуваннях додатку на dev.joinposter.com вказано правильний `redirect_uri` з HTTPS).

Готово! Ваш сайт розгорнуто та підключено. 🎉
