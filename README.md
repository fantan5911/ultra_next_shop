# Интернет-магазин смартфонов

Fullstack проект на Next.js, Express, PostgreSQL.

## Стек
- Frontend: Next.js 15, TypeScript, Tailwind, Zustand
- Backend: Express, Prisma, PostgreSQL, JWT

## Функционал
- JWT-авторизация (AccessToken + RefreshToken)
- ISR подгрузка данных
- Добавление смартфонов
- Просмотри страницы пользователя и смартфона
- Баны пользователей

## Установка проекта и зависимостей

глобально установите пакетный менеджер bun
npm install --global bun

Далее откройте два терминала bash(Linux):

Frontend
cd frontend
bun install
bun dev

Backend
cd backend

Обязательно заполните .env файл в корне папки backend и создайте свою базу данных Postgresql

пример:
DATABASE_URL="ссылка на базу данных Postgresql"
JWT_SECRET_KEY="secret_key123"
API_URL="http://localhost:4000"
CLIENT_URL="http://localhost:80"

bun install
bun prisma migrate dev --name [название миграции] && bun prisma generate

## Запуск
Откройте два терминала:
Frontend
cd frontend
bun dev

Backend
cd backend
bun dev

## 

## Демо
[ссылка на видео-демо]