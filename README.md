# 2022-09_squadhelp_EXAM
# Инструкции для запуска приложения

1. (Один раз). <br>
   Вам понадобится новый терминал. <br>
   Установить приложение для контейнеризации [Docker](https://docs.docker.com/):

   - [Ubultu](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) (выполнить 3 шага)
   - [Windows](https://docs.docker.com/docker-for-windows/install/)
   - [Mac](https://docs.docker.com/docker-for-mac/install/)

   и [Docker Compose](https://docs.docker.com/compose/install/) (выбрать нужную ОС).

1. (Каждый раз). <br>
   Для запуска приложения запустить скрипт:

   - `./start-dev.sh`
- Приложение будет доступно в браузере по адресу [http://localhost:3000](http://localhost:3000).

## Примечания

- Пароль для уже созданных юзеров и модератора: 'qwerty'

- При работе приложения в dev-режиме понадобятся данные тестовых банковских карт:

  - для оплаты работы с карты buyer`а при создании контеста:
    - Card number: 4111111111111111
    - Expires end: 09/23
    - cvc/cvv: 505
  - для вывода средств на карту creator`а:
    - Card number: 4222222222222222
    - Expires end: 09/23
    - cvc/cvv: 500
