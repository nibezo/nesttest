# Тестовое задание; Админпанель на стеке NestJS/NuxtJS

Ссылка на шаблон - [Modernize](https://modernize-vuejs.adminmart.com)

## Установка проекта

`git clone https://github.com/nibezo/nesttest`

### Backend

Из корневой папки:

1. `cd backend`
2. `npm install`
3. `npm run start:debug`

### Frontend

Из корневой папки:

1. `cd frontend`
2. `npm install`
3. `npm run dev`

После установки зайдите на `http://localhost:3000`, логин - `root`, пароль - `LFuHCEx2IQfL`. Пароль и логин можно сменить в .env файле `./backend/.env`, потребуется перезагрузка.

## Описание и эндпойнты

Простая админка с авторизацией (через JWT) и статичными данными. На фронте отрисовывается статистика дат регистраций юзеров и их список.

`api/auth` (POST) - Авторизация
Принимает JSON в формате:

```json
{
  "login": "",
  "password": ""
}
```

Вернет токен JWT, актуальный в течении часа.

`api/users` (GET) - Получение данных о юзере
В headers нужно передавать `Bearer token`.

Вернет массив с юзерами в формате:

```json
{
  "id": 1,
  "username": "jdoe",
  "firstName": "John",
  "lastName": "Doe",
  "telegram": "@johndoe",
  "registrationDate": "2024-11-02",
  "avatar": "/static_uploads/avatars/user1.jpeg"
}
```
