# Poster API — повна документація (дамп)

> **Дата дампу:** 2026-07-14
> **Джерело:** https://dev.joinposter.com/docs/v3/start/index
> **Файли:** папка `03-Ресурси/Технології/Poster-API-Docs/` — 330 .md-сторінок
> **Використовується у:** [[01-Проекти/Poster-Mobile-Hub-PWA/Огляд|Poster Mobile Hub]] (бібліотека poster-client)
> **Друга копія:** `~/dev/Poster Mobile Hub (PWA)/docs/poster-api/` (у репозиторії проекту)

## Як знято

Сайт dev.joinposter.com працює на Docsify — сторінки лежать як сирі Markdown-файли у відкритому доступі. Список усіх сторінок — у `Poster-API-Docs/_sidebar.md`. Скачано напряму: `https://dev.joinposter.com/docs/v3/<шлях>.md`. Якщо треба оновити дамп — повторити той самий трюк.

## Зміст по групах

| Група | Шлях | Методів | Що це |
|---|---|---|---|
| Старт | `start/` | 5 | авторизація oAuth, формат запитів, FAQ |
| Статистика | `web/dash/` | 14 | чеки, продажі, аналітика, зміни |
| Меню | `web/menu/` | 40 | товари, тех.карти, категорії, інгредієнти, модифікатори |
| Склад | `web/storage/` | 43 | залишки, поставки, списання, переміщення, інвентаризації |
| Транзакції | `web/transactions/` | 14 | створення/зміна чеків |
| Клієнти | `web/clients/` | 31 | клієнти, групи, лояльність |
| Фінанси | `web/finance/` | 27 | каса, категорії, транзакції |
| Замовлення | `web/incomingOrders/` | 12 | онлайн-замовлення, бронювання |
| Налаштування | `web/settings/` | 10 | акаунт, заклади, податки |
| Доступ | `web/access/` | 8 | токени, співробітники |
| Заклади | `web/spots/` | 5 | точки продажу |
| Застосунок | `web/application/` | 5 | інтеграція в маркетплейс |
| Франшиза | `web/franchise/` | 2 | |
| Інше | `web/webhooks.md`, `web/errors.md` | | вебхуки, коди помилок |

## Ключові сторінки

- [[Poster-API-Docs/start/authApi|oAuth авторизація]]
- [[Poster-API-Docs/web/webhooks|Вебхуки]] (verify = md5, формат `{"status":"accept"}`)
- [[Poster-API-Docs/web/errors|Коди помилок]]
- [[Poster-API-Docs/web/storage/createWriteOff|storage.createWriteOff]] — ядро модуля списань
- [[Poster-API-Docs/web/menu/getProducts|menu.getProducts]] / [[Poster-API-Docs/web/menu/getProduct|getProduct]] (рецептури type=2)
- [[Poster-API-Docs/web/storage/getStorageLeftovers|Залишки складу]]

## Відомі граблі (з бойового досвіду, не з доків)

- Ціни/суми часто в **копійках** — ділити на 100 (але `amount_sell_cash`/`amount_sell_card` у getCashShifts вже в грн)
- `amount_end` у зміні = залишок готівки в касі, **НЕ виручка**
- `dash.getAnalytics` = агрегована статистика, **НЕ список товарів**
- `weight_flag='1'` → кількість у грамах/мл, `'0'` → штуки
- `menu.getProduct` (singular) для type=2 повертає `ingredients[]` з рецептурою
- Webhook підписується через поле `verify` у тілі (md5), не через заголовок
