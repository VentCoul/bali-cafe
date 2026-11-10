# Bali Cafe

Сайт кафе з онлайн-меню та замовленнями, повністю інтегрований з [Poster POS](https://joinposter.com).
Меню, столи, клієнти й бонуси беруться з Poster, а замовлення з сайту потрапляють у касу як вхідні замовлення.

## Можливості

**Для гостей**
- Меню, що синхронізується з Poster: категорії, страви, ціни.
- Кошик (Zustand) і оформлення замовлення: у закладі (з вибором столу) або з собою.
- Реєстрація та вхід (Auth.js), профіль із номером телефону.
- Програма лояльності: баланс бонусів із Poster у профілі та списання бонусів при замовленні.
- Сповіщення в особистому кабінеті.

**Для адміністратора** (`/admin`)
- Підключення та відключення акаунта Poster через OAuth.
- Налаштування структури меню: власні категорії поверх каталогу Poster, одна страва може бути в кількох категоріях.
- Список зареєстрованих клієнтів.

## Стек

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion ·
Prisma 7 + SQLite (better-sqlite3) · Auth.js (NextAuth v5) · Zustand · Jest + Testing Library · Docker

## Структура

```
src/app/                сторінки (меню, профіль, авторизація, адмінка) і API-маршрути
src/app/api/poster/     OAuth з Poster, меню, столи, клієнти, конфігурація
src/app/api/order/      оформлення замовлення → Poster incomingOrders
src/lib/poster/         клієнт Poster API, синхронізація клієнтів, конфігурація меню
src/lib/validation/     валідація замовлення
src/components/         UI: меню, кошик, шапка/футер, сповіщення
prisma/schema.prisma    користувачі, сесії, сповіщення
__tests__/              тести кошика, валідації та синхронізації з Poster
docs/superpowers/specs/ проєктні специфікації
```

## Запуск локально

1. Створіть застосунок у кабінеті розробника Poster.
2. Скопіюйте `.env.local.example` у `.env.local` і заповніть `POSTER_CLIENT_ID`,
   `POSTER_CLIENT_SECRET`, `NEXT_PUBLIC_BASE_URL`, `ADMIN_PASSWORD`.
3. Встановіть залежності, створіть базу й адміністратора:

```bash
npm install
npx prisma db push
ADMIN_PASSWORD=… npx tsx scripts/seed-admin.ts
```

4. Запустіть:

```bash
npm run dev
```

Тести:

```bash
npm test
```

## Деплой

Покрокова інструкція розгортання на VPS (Docker, Nginx, SSL через Certbot) — у [DEPLOYMENT.md](DEPLOYMENT.md).

## Плани

- Онлайн-оплата через LiqPay (каркас інтеграції — `src/lib/payments/liqpay.ts`).
