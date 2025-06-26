# Запуск приложения

Сперва получите API Token WB \
Затем зайдите в гугл сервис и создайте API и скачайте credentials в json формате\
Создайте google sheet, лист переименуйте на "stocks_coefs" и скопируйте ID таблицы в url\
Далее эти данные подставляете в .env файле

Теперь приложение готово к запуску!

## Сначала клонируйте этот репозиторий:

1. Скопируйте url
2. Клонируйте себе (ex. VSCode -> Source Control -> Clone Repository)

## Осталось вызвать эти команды поочередно в терминале внутри вашей папки:

1.

```bash
npm install
```

2.

```bash
npm run build
```

3.

```bash
docker compose up -d
```

## Приложение запустилось в контейнере Docker под названием app!

# Шаблон для выполнения тестового задания

## Описание

Шаблон подготовлен для того, чтобы попробовать сократить трудоемкость выполнения тестового задания.

В шаблоне настоены контейнеры для `postgres` и приложения на `nodejs`.  
Для взаимодействия с БД используется `knex.js`.  
В контейнере `app` используется `build` для приложения на `ts`, но можно использовать и `js`.

Шаблон не является обязательным!\
Можно использовать как есть или изменять на свой вкус.

Все настройки можно найти в файлах:

- compose.yaml
- dockerfile
- package.json
- tsconfig.json
- src/config/env/env.ts
- src/config/knex/knexfile.ts

## Команды:

Запуск базы данных:

```bash
docker compose up -d --build postgres
```

Для выполнения миграций и сидов не из контейнера:

```bash
npm run knex:dev migrate latest
```

```bash
npm run knex:dev seed run
```

Также можно использовать и остальные команды (`migrate make <name>`,`migrate up`, `migrate down` и т.д.)

Для запуска приложения в режиме разработки:

```bash
npm run dev
```

Запуск проверки самого приложения:

```bash
docker compose up -d --build app
```

Для финальной проверки рекомендую:

```bash
docker compose down --rmi local --volumes
docker compose up --build
```

PS: С наилучшими пожеланиями!
